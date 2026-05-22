const SocketCommentService = require("../services/socket/commentSocketService")

class commentListener {
    socket;
    io;

    constructor(socket, io) {
        this.socket = socket
        this.io = io

        const socketCommentService = new SocketCommentService(socket, io)

        this.socket.on('JOIN_COMMENT_ROOM', socketCommentService.JOIN_COMMENT_ROOM)
        this.socket.on('LEAVE_COMMENT_ROOM', socketCommentService.LEAVE_COMMENT_ROOM)
    }
}

module.exports = commentListener
