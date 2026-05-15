const { Op } = require("sequelize");
const sequelize = require("../config/db");
const videoService = require("../services/video.service");
const {
  Video,
  User,
  VideoLike,
  VideoSave,
  Follow,
  Hashtag,
  VideoHashtag,
} = require("../models");
const jwt = require("jsonwebtoken");
const { pickBy } = require("lodash");

// Feed đề xuất
const getFeed = async (req, res, next) => {
  try {
    const limit = 8;
    const { cursor } = req.query; // cursor = "score_lastVideo_id"

    let currentUserId = 0;
    const token = req.headers.authorization?.slice(7);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      currentUserId = decoded.id;
    }

    const scoreExpr = `
      (
        (\`Video\`.\`like_count\`    / NULLIF(\`Video\`.\`view_count\`, 0)) * 10 +
        (\`Video\`.\`comment_count\` / NULLIF(\`Video\`.\`view_count\`, 0)) * 20 +
        (\`Video\`.\`repost_count\`  / NULLIF(\`Video\`.\`view_count\`, 0)) * 30 +
        (\`Video\`.\`save_count\`    / NULLIF(\`Video\`.\`view_count\`, 0)) * 25
      )
      *
      CASE
        WHEN TIMESTAMPDIFF(HOUR, \`Video\`.\`created_at\`, NOW()) < 24  THEN 2.0
        WHEN TIMESTAMPDIFF(HOUR, \`Video\`.\`created_at\`, NOW()) < 72  THEN 1.5
        WHEN TIMESTAMPDIFF(HOUR, \`Video\`.\`created_at\`, NOW()) < 168 THEN 1.2
        ELSE 1.0
      END
    `;

    // Decode cursor
    let cursorWhere = "";
    if (cursor) {
      const [lastScore, lastId] = cursor.split("_");
      // Lấy video có score < lastScore, hoặc score = lastScore nhưng id < lastId
      cursorWhere = `(${scoreExpr}) < ${lastScore} OR ((${scoreExpr}) = ${lastScore} AND \`Video\`.\`id\` < ${lastId})`;
    }

    const videos = await Video.findAll({
      where: {
        status: "active",
        visibility: "public",
        user_id: { [Op.ne]: currentUserId },
        ...(cursorWhere && { [Op.and]: sequelize.literal(cursorWhere) }),
      },
      attributes: {
        include: [
          [sequelize.literal(scoreExpr), "score"],
          [
            sequelize.literal(`(
              SELECT COUNT(*) > 0 FROM video_likes
              WHERE video_likes.user_id = ${currentUserId}
                AND video_likes.video_id = \`Video\`.\`id\`
            )`),
            "is_liked",
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*) > 0 FROM video_saves
              WHERE video_saves.user_id = ${currentUserId}
                AND video_saves.video_id = \`Video\`.\`id\`
            )`),
            "is_saved",
          ],
        ],
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: [
            "id",
            "username",
            "display_name",
            "avatar_url",
            [
              sequelize.literal(`(
                SELECT 1 FROM follows
                WHERE follower_id = ${currentUserId}
                  AND following_id = author.id
              )`),
              "is_following",
            ],
          ],
        },
      ],
      order: [
        [sequelize.literal(scoreExpr), "DESC"],
        ["id", "DESC"],
      ],
      limit,
    });

    // Tạo cursor từ video cuối
    const lastVideo = videos[videos.length - 1];
    const nextCursor = lastVideo
      ? `${lastVideo.dataValues.score}_${lastVideo.id}`
      : null;

    res.json({
      videos,
      nextCursor,
      hasMore: videos.length === limit,
    });
  } catch (error) {
    next(error);
  }
};

// Feed following
const getFollowingFeed = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;

    // Lấy danh sách đang follow
    const follows = await Follow.findAll({
      where: { follower_id: req.user.id },
    });
    const followingIds = follows.map((f) => f.following_id);

    if (!followingIds.length) return res.json({ videos: [] });

    const videos = await Video.findAll({
      where: {
        user_id: { [Op.in]: followingIds },
        status: "active",
        visibility: "public",
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar_url"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    });

    res.json({ videos });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Upload video
const uploadVideo = async (req, res, next) => {
  try {
    const { video_url, caption } = req.body;
    if (!video_url) return res.status(400).json({ message: "Thiếu URL video" });

    const video = await videoService.uploadVideo(req.user.id, req.body);

    // Xử lý hashtags
    if (caption) {
      const tags = caption.match(/#\w+/g)?.map((t) => t.slice(1)) || [];
      for (const tag of tags) {
        const [hashtag] = await Hashtag.findOrCreate({ where: { name: tag } });
        await VideoHashtag.findOrCreate({
          where: { video_id: video.id, hashtag_id: hashtag.id },
        });
      }
    }

    res.status(201).json({ message: "Đăng video thành công", video });
  } catch (err) {
    next(err);
  }
};
//Lấy ra toàn bộ video người dùng
const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar_url"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy 1 video
const getVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar_url"],
        },
      ],
    });
    if (!video)
      return res.status(404).json({ message: "Không tìm thấy video" });

    res.json(video);
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa video
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video)
      return res.status(404).json({ message: "Không tìm thấy video" });
    if (video.user_id !== req.user.id)
      return res.status(403).json({ message: "Không có quyền xóa" });

    await video.destroy();
    res.json({ message: "Đã xóa video" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Like / Unlike
const toggleLike = async (req, res) => {
  try {
    const video_id = req.params.id;
    const user_id = req.user.id;

    const existing = await VideoLike.findOne({ where: { user_id, video_id } });

    if (existing) {
      await existing.destroy();
      return res.json({ liked: false });
    }

    await VideoLike.create({ user_id, video_id });
    res.json({ liked: true });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Save / Unsave
const toggleSave = async (req, res) => {
  try {
    const video_id = req.params.id;
    const user_id = req.user.id;

    const existing = await VideoSave.findOne({ where: { user_id, video_id } });

    if (existing) {
      await existing.destroy();
      return res.json({ saved: false });
    }

    await VideoSave.create({ user_id, video_id });
    res.json({ saved: true });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  getFeed,
  getFollowingFeed,
  uploadVideo,
  getVideo,
  deleteVideo,
  toggleLike,
  toggleSave,
  getMyVideos,
};
