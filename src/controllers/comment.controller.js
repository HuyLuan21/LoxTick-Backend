const { pickBy } = require("lodash");
const { Comment, User } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../config/db.js");

const getComments = async (req, res) => {
  const { id: video_id } = req.params;
  const { parent_id, cursor, limit = 20 } = req.query;

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
          attributes: ["id", "username", "avatar_url"],
        },
      ],
      attributes: {
        include: [[sequelize.literal(`
          (
            SELECT COUNT(1)
            FROM comments
            WHERE comments.parent_id = Comment.id
          )
          `), "replies_count"]],
      },
      limit: Number(limit) + 1,
      order: [["id", "DESC"]],
      logging: console.log,
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

    const next_cursor = has_more
      ? Buffer.from(
          JSON.stringify({ last_id: data[data.length - 1].id }),
        ).toString("base64url")
      : null;

    res.json({
      comments: has_more ? data : comments,
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

    res.status(201).json({ message: "Đã bình luận", comment_id: comment.id });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (!comment)
      return res.status(404).json({ message: "Không tìm thấy comment" });
    if (comment.user_id !== req.user.id)
      return res.status(403).json({ message: "Không có quyền xóa" });

    await comment.destroy();
    res.json({ message: "Đã xóa comment" });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { getComments, addComment, deleteComment };
