const { Server } = require("socket.io");

let io;

const allowedOrigins = ["http://localhost:5173", "https://loxtik.naul.click"];

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: function (origin, callback) {
          if (!origin) return callback(null, true);
          if (allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("CORS not allowed by server"));
          }
        },
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
