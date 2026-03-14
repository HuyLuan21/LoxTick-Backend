const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User } = require("../models");
const redisClient = require("../config/redis");
const AppError = require("../Errors/errors"); // ✅ chỉ cần cái này
const { sendResetEmail } = require("../config/mailer");

const registerUser = async (username, email, password) => {
  const hash = await bcrypt.hash(password, 10);
  return await User.create({ username, email, password_hash: hash });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw AppError.accountNotFound(); // ✅

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw AppError.invalidCredentials(); // ✅

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
      display_name: user.display_name,
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
    const decoded = jwt.decode(token);
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - now;

    if (timeLeft > 0) {
      await redisClient.set(`blacklist:${token}`, "true", { EX: timeLeft });
    }
    return true;
  } catch (error) {
    throw AppError.internal(); // ✅ thay console.error + throw error
  }
};

const requestResetPassword = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw AppError.accountNotFound(); // ✅

  const resetToken = crypto.randomBytes(32).toString("hex");
  await redisClient.set(`reset:${resetToken}`, user.id, { EX: 900 });
  const resetUrl = `http://localhost:3000/api/auth/reset-password?token=${resetToken}`;
  sendResetEmail(user.email, resetUrl);
  return { message: "Link reset đã được tạo", resetUrl };
};

const resetPassword = async (token, password) => {
  const userId = await redisClient.get(`reset:${token}`);
  if (!userId) throw AppError.invalidToken();

  const hash = await bcrypt.hash(password, 10);
  await User.update({ password_hash: hash }, { where: { id: userId } });
  await redisClient.del(`reset:${token}`);
  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getMeInfo,
  logoutUser,
  requestResetPassword,
  resetPassword,
};
