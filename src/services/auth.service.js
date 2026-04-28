const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User } = require("../models");
const redisClient = require("../config/redis");
const AppError = require("../Errors/errors");
const { sendEmail } = require("../config/mailer");

const registerUser = async (username, email, otp, password) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw AppError.accountExist();
  await verifyOtp("register", email, otp);
  const hash = await bcrypt.hash(password, 10);
  return await User.create({
    username,
    email,
    password_hash: hash,
  });
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw AppError.accountNotFound();

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw AppError.invalidCredentials();

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
    throw AppError.internal();
  }
};

const resetPassword = async (email, otp, password) => {
  await verifyOtp("reset", email, otp);

  const hash = await bcrypt.hash(password, 10);

  await User.update({ password_hash: hash }, { where: { email } });

  return true;
};

const validateEmailDomain = (email) => {
  const allowedDomains = [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();

  if (!domain || !allowedDomains.includes(domain)) {
    throw AppError.badRequest("Domain email không được hỗ trợ");
  }

  return true;
};
const requestRegiterOtp = async (email) => {
  if (validateEmailDomain(email)) {
    const user = await User.findOne({ where: { email } });
    if (user) throw AppError.accountExist();

    const GenericMessage = "Otp xác thực đã được gửi đến email của bạn";
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashsedOTP = crypto.createHash("sha256").update(otp).digest("hex");
    await redisClient.set(`register:${hashsedOTP}`, email, { EX: 300 });
    sendEmail(email, "register", otp);
    return GenericMessage;
  }
};
const requestResetPassword = async (email) => {
  const GenericMessage = "Otp reset đã được gửi đến email của bạn";
  const user = await User.findOne({ where: { email } });
  if (!user) throw AppError.accountNotFound();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashsedOTP = crypto.createHash("sha256").update(otp).digest("hex");
  await redisClient.set(`reset:${hashsedOTP}`, email, { EX: 300 });
  sendEmail(user.email, "reset", otp);
  return GenericMessage;
};
const verifyOtp = async (type, email, otp) => {
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  const savedEmail = await redisClient.get(`${type}:${hashedOTP}`);

  if (!savedEmail || savedEmail !== email) {
    throw AppError.invalidToken();
  }

  await redisClient.del(`${type}:${hashedOTP}`);

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  getMeInfo,
  logoutUser,
  requestResetPassword,
  requestRegiterOtp,
  resetPassword,
  verifyOtp,
};
