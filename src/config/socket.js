const { Server } = require("socket.io");

let io;

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: process.env.CLIENT_URL || "*", // Lấy từ .env, nếu không có thì mặc định là *
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io chưa được khởi tạo!");
    }
    return io;
  },
};
