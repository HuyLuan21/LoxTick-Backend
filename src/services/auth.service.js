const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const redisClient = require("../config/redis");
const registerUser = async (username, email, password) => {
  const hash = await bcrypt.hash(password, 10);
  return await User.create({ username, email, password_hash: hash });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("Không tìm thấy tài khoản");
    error.statusCode = 404;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    const error = new Error("Sai mật khẩu");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
      role: user.role,
    },
  };
};

const getMeInfo = async (userId) => {
  return await User.findByPk(userId, {
    attributes: { exclude: ["password_hash"] },
  });
};
const logoutUser = async (token) => {
  try {
    // 1. Giải mã token để lấy thời gian hết hạn (exp)
    const decoded = jwt.decode(token);

    // 2. Tính toán thời gian còn lại (đơn vị: giây)
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - now;

    if (timeLeft > 0) {
      // 3. Lưu vào Redis với tiền tố "blacklist:"
      // EX: timeLeft giúp token tự biến mất khỏi Redis khi nó hết hạn tự nhiên
      await redisClient.set(`blacklist:${token}`, "true", { EX: timeLeft });
    }

    return true;
  } catch (error) {
    console.error("Lỗi Logout Service:", error);
    throw error;
  }
};

module.exports = { registerUser, loginUser, getMeInfo, logoutUser };
