const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin" });

    await authService.registerUser(username, email, password);
    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError")
      return res
        .status(409)
        .json({ message: "Username hoặc email đã tồn tại" });
    next(err); // Đẩy lỗi cho errorHandler.js xử lý
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

const handleResetPassword = async (req, res, next) => {
  try {
    // Lấy token từ URL (query), lấy password từ Body
    const token = req.query.token; 
    const { password } = req.body; 

    if (!token) return res.status(400).json({ message: "Token không tồn tại trong URL" });

    await authService.resetPassword(token, password);
    res.json({ message: "Đặt lại mật khẩu thành công" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  handleResetPassword,
};
