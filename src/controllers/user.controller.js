const { User, Video, Follow } = require("../models");
const userService = require("../services/user.service");

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: { exclude: ["password_hash"] },
    });
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    const followers = await Follow.count({ where: { following_id: user.id } });
    const following = await Follow.count({ where: { follower_id: user.id } });

    res.json({ ...user.toJSON(), followers, following });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const getUserVideos = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });

    const videos = await Video.findAll({
      where: { user_id: user.id, status: "active", visibility: "public" },
      order: [["created_at", "DESC"]],
    });

    res.json({ videos });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const handleUpdateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const updatedUser = await userService.updateProfile(userId, req.body);

    res.json({
      message: "Cập nhật thành công",
      user: updatedUser,
    });
  } catch (err) {
    // Bắt lỗi trùng username từ Sequelize
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Username này đã tồn tại" });
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    next(err); // Đẩy lỗi hệ thống cho Global Error Handler
  }
};

const toggleFollow = async (req, res) => {
  try {
    const target = await User.findOne({
      where: { username: req.params.username },
    });
    if (!target)
      return res.status(404).json({ message: "Không tìm thấy user" });
    if (target.id === req.user.id)
      return res.status(400).json({ message: "Không thể tự follow mình" });

    const existing = await Follow.findOne({
      where: { follower_id: req.user.id, following_id: target.id },
    });

    if (existing) {
      await existing.destroy();
      return res.json({ followed: false });
    }

    await Follow.create({ follower_id: req.user.id, following_id: target.id });
    res.json({ followed: true });
  } catch {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  getProfile,
  getUserVideos,
  handleUpdateProfile,
  toggleFollow,
};
