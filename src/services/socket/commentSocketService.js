const { getIO } = require("../../config/socket");

class SocketCommentService {
  socket;
  currentUserId;
  io;

  constructor(socket, io, currentUserId) {
    this.socket = socket;
    this.currentUserId = currentUserId || socket?.data?.decoded?.id;
    this.io = io
  }

  JOIN_COMMENT_ROOM = async ({videoId}) => {
    this.socket.join(`video_comment:${videoId}`);

    if (process.env.NODE_ENV === "development") {
      console.log(
        `User ${this.currentUserId} joined comment room: video_comment:${videoId}`,
      );
    }
  };

  LEAVE_COMMENT_ROOM = async ({videoId}) => {
    this.socket.leave(`video_comment:${videoId}`);

    if (process.env.NODE_ENV === "development") {
      console.log(
        `User ${this.currentUserId} left comment room: comment:${videoId}`,
      );
    }
  };
}

module.exports = SocketCommentService;
