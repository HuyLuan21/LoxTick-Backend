const { User } = require("../models");
const AppError = require("../Errors/errors");

const updateProfile = async (userId, updateData) => {
  // 1. Tìm user hiện tại
  const user = await User.findByPk(userId);
  if (!user) {
    throw AppError.accountNotFound();
  }

  const updates = {};
  const { username, display_name, bio, avatar_url } = updateData;

  // 2. Logic kiểm tra USERNAME (Chặn đổi trong 30 ngày)
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

    // DÒNG QUAN TRỌNG NHẤT: Phải nhét cả 2 cái này vào object updates
    updates.username = username.trim();
    updates.username_updated_at = now;

    console.log("==> Đã thêm username_updated_at vào hàng chờ update");
  }

  // 3. Gom các trường khác (Chỉ lấy những gì có gửi lên)
  if (bio !== undefined) updates.bio = bio;
  if (display_name !== undefined) updates.display_name = display_name;
  if (avatar_url !== undefined) updates.avatar_url = avatar_url;

  // 4. Kiểm tra xem cuối cùng có cái gì để update không
  if (Object.keys(updates).length === 0) {
    throw AppError.badRequest("Không có thông tin nào thay đổi");
  }

  // 5. Thực thi cập nhật
  console.log("Dữ liệu THỰC SỰ gửi vào DB:", updates);

  await User.update(updates, {
    where: { id: userId },
    logging: console.log,
  });

  // 6. Trả về dữ liệu mới nhất (Dùng reload hoặc findByPk)
  const updatedUser = await User.findByPk(userId, {
    attributes: { exclude: ["password_hash"] },
  });

  console.log(
    "Giá trị cột username_updated_at SAU KHI LƯU:",
    updatedUser.username_updated_at,
  );

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
