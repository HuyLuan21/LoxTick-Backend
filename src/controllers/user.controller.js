const { User, Video, Follow } = require("../models");
const userService = require("../services/user.service");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.params.username);

    const [followers, following] = await Promise.all([
      Follow.count({ where: { following_id: user.id } }),
      Follow.count({ where: { follower_id: user.id } }),
    ]);

    res.json({ ...user.toJSON(), followers, following });
  } catch (err) {
    next(err);
  }
};

const getUserVideos = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (!user) {
      const error = new Error("Không tìm thấy user");
      error.statusCode = 404;
      throw error;
    }

    const videos = await Video.findAll({
      where: { user_id: user.id, status: "active", visibility: "public" },
      order: [["created_at", "DESC"]],
    });

    res.json({ videos });
  } catch (err) {
    next(err);
  }
};

const handleUpdateProfile = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateProfile(req.user.id, req.body);
    res.json({ message: "Cập nhật thành công", user: updatedUser });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Username này đã tồn tại" });
    }
    next(err);
  }
};

const toggleFollow = async (req, res, next) => {
  try {
    const target = await User.findOne({
      where: { username: req.params.username },
    });
    if (!target) {
      const error = new Error("Không tìm thấy user");
      error.statusCode = 404;
      throw error;
    }
    if (target.id === req.user.id) {
      const error = new Error("Không thể tự follow mình");
      error.statusCode = 400;
      throw error;
    }

    const existing = await Follow.findOne({
      where: { follower_id: req.user.id, following_id: target.id },
    });

    if (existing) {
      await existing.destroy();
      return res.json({ followed: false });
    }

    await Follow.create({ follower_id: req.user.id, following_id: target.id });
    res.json({ followed: true });
  } catch (err) {
    next(err);
  }
};

const getFollowingList = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const after = req.query.after || null;
    const result = await userService.getFollowingList({
      userId: req.params.userId,
      limit,
      after,
    });
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const getFollowersList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await userService.getFollowersList(
      req.params.userId,
      page,
      limit,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getProfile,
  getUserVideos,
  handleUpdateProfile,
  toggleFollow,
  getFollowingList,
  getFollowersList,
};
