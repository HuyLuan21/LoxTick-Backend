const CommentSocketHandler = require("./comment");

const setupSocketConnections = (io) => {
  new CommentSocketHandler(io);
};

module.exports = setupSocketConnections;
