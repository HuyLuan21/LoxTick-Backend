// src/Errors/globalError.js
const logger = require("../config/logger");
const { sequelize } = require("../models"); // ← đóng DB
const redisClient = require("../config/redis"); // ← đóng Redis

const gracefulShutdown = async (signal) => {
  logger.info(`${signal} nhận được - đang tắt app...`);
  try {
    await sequelize.close();
    logger.info("Đã đóng kết nối Database");

    await redisClient.quit();
    logger.info("Đã đóng kết nối Redis");
  } catch (err) {
    logger.error("Lỗi khi tắt app:", err);
  } finally {
    process.exit(0);
  }
};

const globalError = () => {
  // Lỗi đồng bộ không được try/catch
  process.on("uncaughtException", (err) => {
    logger.error({
      type: "UNCAUGHT_EXCEPTION",
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  });

  // Promise bị reject mà không có .catch() hay try/catch
  process.on("unhandledRejection", (reason, promise) => {
    logger.error({
      type: "UNHANDLED_REJECTION",
      message: reason?.message || String(reason),
      stack: reason?.stack,
    });
    process.exit(1);
  });

  // Tắt app gracefully
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};

module.exports = globalError;
