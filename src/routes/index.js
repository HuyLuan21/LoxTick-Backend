const express = require("express");
const cloudinaryRoutes = require("./cloudinary");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");

const authCtrl = require("../controllers/auth.controller");
const videoCtrl = require("../controllers/video.controller");
const commentCtrl = require("../controllers/comment.controller");
const userCtrl = require("../controllers/user.controller");
const searchCtrl = require("../controllers/search.controller");

// AUTH
// đăng ký tài khoản
router.post("/auth/register", authCtrl.register);
// gửi mã otp để xác nhận đăng ký tài khoản
router.post("/auth/request-register-otp", authCtrl.requestRegisterOtp);
// đăng nhập tài khoản
router.post("/auth/login", authCtrl.login);
// lấy ra thông tin của tôi
router.get("/auth/me", verifyToken, authCtrl.getMe);
// đăng xuất tài khoản
router.post("/auth/logout", verifyToken, authCtrl.logout);
// yeu cau dat lai mat khau
router.post("/auth/forgot-password", authCtrl.forgotPassword);
// đặt lại mật khẩu
router.post("/auth/reset-password", authCtrl.ResetPassword);
// xác nhận mã otp
router.post("/auth/verify-otp", authCtrl.verifyOtp);

// VIDEOS
router.get("/feed", videoCtrl.getFeed);
router.get("/feed/following", verifyToken, videoCtrl.getFollowingFeed);
router.post("/videos", verifyToken, videoCtrl.uploadVideo);
router.get("/users/me/videos", verifyToken, videoCtrl.getMyVideos);
router.get("/videos/:id", videoCtrl.getVideo);
router.delete("/videos/:id", verifyToken, videoCtrl.deleteVideo);
router.post("/videos/:id/like", verifyToken, videoCtrl.toggleLike);
router.post("/videos/:id/save", verifyToken, videoCtrl.toggleSave);

// COMMENTS
router.get("/videos/:id/comments", commentCtrl.getComments);
router.post("/videos/:id/comments", verifyToken, commentCtrl.addComment);
router.delete("/comments/:commentId", verifyToken, commentCtrl.deleteComment);
router.post(
  "/comments/:commentId/like",
  verifyToken,
  commentCtrl.toggleCommentLike,
);

// USERS
//Lấy ra thông tin người dùng
router.get("/users/:username", userCtrl.getProfile);
//Lấy ra video của người dùng
router.get("/users/:username/videos", userCtrl.getUserVideos);
// cập nhật thông tin cá nhân của tôi
router.put("/users/me", verifyToken, userCtrl.handleUpdateProfile);
// Follow người dùng, đã có tích hợp hủy follow
router.post("/users/:username/follow", verifyToken, userCtrl.toggleFollow);
// lấy ra danh sách người mình đang follow
router.get("/users/:userId/following", verifyToken, userCtrl.getFollowingList);
// lấy ra danh sách người follow mình
router.get("/users/:userId/followers", verifyToken, userCtrl.getFollowersList);

// SEARCH
router.get("/search", searchCtrl.search);

//cloudinary
router.use("/cloudinary", cloudinaryRoutes);

module.exports = router;
