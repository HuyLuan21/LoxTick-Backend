const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { username, email, otp, password } = req.body;
    await authService.registerUser(username, email, otp, password);
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    next(err); // Đẩy lỗi cho errorHandler.js xử lý
  }
};
const requestRegisterOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.requestRegiterOtp(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMeInfo(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await authService.logoutUser(token);
    res.json({ message: "Đăng xuất thành công" });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.requestResetPassword(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const ResetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    await authService.resetPassword(email, otp, password);
    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { type, email, otp } = req.body;
    await authService.verifyOtp(type, email, otp);
    res.json({ message: "Xác thực OTP thành công" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  requestRegisterOtp,
  login,
  getMe,
  logout,
  forgotPassword,
  ResetPassword,
  verifyOtp,
};
