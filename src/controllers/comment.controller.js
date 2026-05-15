const { pickBy } = require("lodash");
const { Comment, User, CommentLike, Video } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/db.js");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

/**
 * Helper: extract user from token without blocking (optional auth)
 */
const getUserFromToken = async (req) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return null;

    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) return null;

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

const getComments = async (req, res) => {
  const { id: video_id } = req.params;
  const { parent_id, cursor, limit = 20 } = req.query;

  const currentUser = await getUserFromToken(req);

  /**
   * if parent_id is undefined => get all comments (from root)
   * else => get comments of that parent_id
   */
  let whereCondition = {
    video_id,
    parent_id: parent_id
      ? Number(parent_id)
      : {
          [Op.is]: null,
        },
  };

  if (cursor) {
    const decodedCursor = Buffer.from(cursor, "base64url").toString("utf-8");

    const { last_id } = JSON.parse(decodedCursor);

    whereCondition = {
      ...whereCondition,
      id: {
        [Op.lt]: Number(last_id),
      },
    };
  }

  try {
    const comments = await Comment.findAll({
      where: whereCondition,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "display_name", "avatar_url"],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`
          (
            SELECT COUNT(1)
            FROM comments
            WHERE comments.parent_id = Comment.id
          )
          `),
            "replies_count",
          ],
          // is_liked: check if current user liked this comment
          [
            sequelize.literal(`
          (
            SELECT COUNT(1)
            FROM comment_likes
            WHERE comment_likes.comment_id = Comment.id
              AND comment_likes.user_id = ${currentUser ? Number(currentUser.id) : 0}
          )
          `),
            "is_liked",
          ],
        ],
      },
      limit: Number(limit) + 1,
      order: [["id", "DESC"]],
    });

    /**
     * Mặc định đang lấy limit = limit + 1 để check có comments tiếp theo hay không,
     *  nếu có => chỉ lấy đúng số lượng comments cần thiết (slice(0, limit))
     */
    const has_more = comments.length > limit;

    /**
     * Decode next cursor (use base64url instead of base64 for safetier url)
     */

    const data = has_more ? comments.slice(0, limit) : comments;

    // Convert is_liked from count to boolean
    const formattedData = data.map((c) => {
      const json = c.toJSON();
      return {
        ...json,
        is_liked: !!Number(json.is_liked),
      };
    });

    const next_cursor = has_more
      ? Buffer.from(
          JSON.stringify({ last_id: data[data.length - 1].id }),
        ).toString("base64url")
      : null;

    res.json({
      comments: formattedData,
      next_cursor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, parent_id } = req.body;
    if (!content)
      return res.status(400).json({ message: "Nội dung không được trống" });

    const comment = await Comment.create({
      video_id: req.params.id,
      user_id: req.user.id,
      parent_id: parent_id || null,
      content,
    });

    const newComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "display_name", "avatar_url"],
        },
      ],
    });

    const commentData = newComment.toJSON();
    commentData.replies_count = 0;
    commentData.is_liked = false;
    commentData.like_count = 0;

    res.status(201).json({ message: "Đã bình luận", comment: commentData });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment)
      return res.status(404).json({ message: "Không tìm thấy comment" });

    let isAllowed = comment.user_id === req.user.id;
    if (!isAllowed) {
      const video = await Video.findByPk(comment.video_id);
      if (video && video.user_id === req.user.id) {
        isAllowed = true;
      }
    }

    if (!isAllowed)
      return res.status(403).json({ message: "Không có quyền xóa" });

    await comment.destroy();
    res.json({ message: "Đã xóa comment" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const toggleCommentLike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const existing = await CommentLike.findOne({
      where: { user_id: userId, comment_id: commentId },
    });

    if (existing) {
      await existing.destroy();
      res.json({ liked: false });
    } else {
      await CommentLike.create({ user_id: userId, comment_id: commentId });
      res.json({ liked: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { getComments, addComment, deleteComment, toggleCommentLike };
