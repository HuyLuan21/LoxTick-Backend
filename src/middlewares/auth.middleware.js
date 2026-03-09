const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis"); // Nhớ import redisClient vào đây

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });
    }

    // --- BƯỚC QUAN TRỌNG: Kiểm tra Token trong Blacklist ---
    const isBlacklisted = await redisClient.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({
        message:
          "Token đã hết hạn hoặc bạn đã đăng xuất. Vui lòng đăng nhập lại.",
      });
    }
    // ------------------------------------------------------

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

module.exports = { verifyToken };
