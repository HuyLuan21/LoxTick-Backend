// src/config/redis.js
const redis = require("redis");
const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.error("❌ Lỗi kết nối Redis: Hãy đảm bảo bạn đã bật Redis Server!");
  // Tùy chọn: Có thể dừng server nếu Redis là bắt buộc cho tính năng Blacklist
  // process.exit(1);
});

client.on("connect", () => {
  console.log("✅ Đã kết nối Redis thành công");
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error("❌ Không thể kết nối tới Redis trước khi chạy Server");
  }
})();

module.exports = client;
