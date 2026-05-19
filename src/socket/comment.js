const socketAuthMiddleware = require("./middlewares/auth");

class CommentSocketHandler {
  constructor(io) {
    this.io = io;

    // Comment namespace
    const commentNS = this.io.of("/comment");

    commentNS.use(socketAuthMiddleware);
    this.commentHandler(commentNS);
  }

  commentHandler(commentNS) {
    commentNS.on("connection", (socket) => {
      console.log("🟢 Client connected:", socket.id);

      // JOIN ROOM
      socket.on("JOIN_COMMENT_ROOM", ({ videoId }) => {
        socket.join(`video:${videoId}`);

        console.log(
          `🟢 User ${socket.data.username} joined comment room ${videoId}`,
        );
      });

      // LEAVE ROOM
      socket.on("LEAVE_COMMENT_ROOM", ({ videoId }) => {
        socket.leave(`video:${videoId}`);

        console.log(
          `🔴 User ${socket.data.username} left comment room ${videoId}`,
        );
      });

      socket.on("NEW_COMMENT", async ({ videoId, content, parentId }) => {
        try {
          // const comment = await createComment({
          //   videoId,
          //   content,
          //   parentId,
          //   userId: socket.data.userId,
          // });

          commentNS.to(`video:${videoId}`).emit("COMMENT_ADDED", comment);
        } catch (error) {
          console.error("Error creating comment:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("🔴 Client disconnected:", socket.id);
      });
    });
  }
}

module.exports = CommentSocketHandler;
