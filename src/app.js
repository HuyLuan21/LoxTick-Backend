require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const createError = require("http-errors");

// Import cấu hình và routes
const sequelize = require("./config/db");
require("./models"); // Đảm bảo các quan hệ (associations) được thiết lập
const routes = require("./routes");
const errorHandler = require("./Errors/errorHandler"); // Sử dụng file xử lý lỗi riêng của bạn

const app = express();

// 1. Middlewares hệ thống
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Import Redis (đã được cấu hình để tự connect)
require("./config/redis");

// 3. API Routes
app.use("/api", routes);

// 4. Xử lý lỗi 404 (Khi không tìm thấy Route nào khớp)
app.use((req, res, next) => {
  next(createError(404, `Không tìm thấy đường dẫn: ${req.method} ${req.url}`));
});

// 5. Global Error Handler (Phải đặt cuối cùng)
app.use(errorHandler);

// 6. Kết nối Database và Khởi chạy Server
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Kết nối Database thành công (Sequelize)");
    // Chỉ sync khi cần thiết, hoặc dùng Migrations
    // return sequelize.sync({ alter: true });
    app.listen(PORT, () =>
      console.log(`🚀 Server TikTok đang chạy tại http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("❌ Kết nối Database thất bại:", err.message);
    process.exit(1);
  });
