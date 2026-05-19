const jwt = require("jsonwebtoken");

const socketAuthMiddleware = (socket, next) => {
  // Client gửi token qua socket.handshake.auth
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Thiếu token xác thực"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gắn user data vào socket để dùng sau
    socket.data.userId = decoded.id;
    socket.data.username = decoded.username;
    socket.data.role = decoded.role;
    next();
  } catch (err) {
    next(new Error("Token không hợp lệ hoặc đã hết hạn"));
  }
};

module.exports = socketAuthMiddleware;
