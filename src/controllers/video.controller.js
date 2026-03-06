const { Op } = require("sequelize");
const {
  Video,
  User,
  VideoLike,
  VideoSave,
  Follow,
  Hashtag,
  VideoHashtag,
} = require("../models");

// Feed đề xuất
const getFeed = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;

    const videos = await Video.findAll({
      where: { status: "active", visibility: "public" },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "avatar_url"],
        },
      ],
      order: [
        // score = view*1 + like*3 + comment*4 + save*5 - time_decay
        [
          Video.sequelize.literal(
            "'`Video`.`view_count`*1 + `Video`.`like_count`*3 + `Video`.`comment_count`*4 + `Video`.`save_count`*5 - TIMESTAMPDIFF(HOUR, `Video`.`created_at`, NOW())*0.1'",
          ),
          "DESC",
        ],
      ],
      limit,
      offset,
    });

    res.json({ videos });
  } catch (error) {
    console.error("Lỗi getFeed:", error);
    res.status(500).json({ message: "Lỗi server" });
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
const uploadVideo = async (req, res) => {
  try {
    const { caption, duration } = req.body;
    const video_url = req.files?.video?.[0]?.filename;
    const thumbnail_url = req.files?.thumbnail?.[0]?.filename;

    if (!video_url)
      return res.status(400).json({ message: "Thiếu file video" });

    const video = await Video.create({
      user_id: req.user.id,
      video_url,
      thumbnail_url,
      caption,
      duration,
      status: "active",
    });

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

    res.status(201).json({ message: "Upload thành công", video_id: video.id });
  } catch {
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
};
