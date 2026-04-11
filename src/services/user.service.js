const { User } = require("../models");
const AppError = require("../Errors/errors");

const updateProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw AppError.accountNotFound();
  }

  const updates = {};
  const { username, display_name, bio, avatar_url } = updateData;

  if (username && username.trim() !== user.username) {
    const now = new Date();

    const lastUpdate = new Date(user.username_updated_at ?? 0);

    const diffTime = Math.abs(now - lastUpdate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Nếu đã từng đổi và chưa đủ 30 ngày thì chặn
    if (diffDays < 30) {
      throw AppError.badRequest(
        `Chưa đủ 30 ngày để đổi username. Cần đợi thêm ${30 - diffDays} ngày.`,
      );
    }

    updates.username = username.trim();
    updates.username_updated_at = now;
  }

  if (bio !== undefined) updates.bio = bio;
  if (display_name !== undefined) updates.display_name = display_name;
  if (avatar_url !== undefined) updates.avatar_url = avatar_url;

  if (Object.keys(updates).length === 0) {
    throw AppError.badRequest("Không có thông tin nào thay đổi");
  }

  await User.update(updates, {
    where: { id: userId },
  });

  const updatedUser = await User.findByPk(userId, {
    attributes: { exclude: ["password_hash"] },
  });

  return updatedUser;
};
const getProfile = async (username) => {
  const user = await User.findOne({
    where: { username },
    attributes: { exclude: ["password_hash"] },
  });
  if (!user) {
    throw AppError.accountNotFound();
  }
  return user;
};

module.exports = { updateProfile, getProfile };
