const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");

const authCtrl = require("../controllers/auth.controller");
const videoCtrl = require("../controllers/video.controller");
const commentCtrl = require("../controllers/comment.controller");
const userCtrl = require("../controllers/user.controller");
const searchCtrl = require("../controllers/search.controller");

// AUTH
router.post("/auth/register", authCtrl.register);
router.post("/auth/login", authCtrl.login);
router.get("/auth/me", verifyToken, authCtrl.getMe);
router.post("/auth/logout", verifyToken, authCtrl.logout);
router.post("/auth/forgot-password", authCtrl.forgotPassword);
router.post("/auth/reset-password", authCtrl.handleResetPassword);

// VIDEOS
router.get("/feed", videoCtrl.getFeed);
router.get("/feed/following", verifyToken, videoCtrl.getFollowingFeed);
router.post("/videos", verifyToken, videoCtrl.uploadVideo);
router.get("/videos/:id", videoCtrl.getVideo);
router.delete("/videos/:id", verifyToken, videoCtrl.deleteVideo);
router.post("/videos/:id/like", verifyToken, videoCtrl.toggleLike);
router.post("/videos/:id/save", verifyToken, videoCtrl.toggleSave);

// COMMENTS
router.get("/videos/:id/comments", commentCtrl.getComments);
router.post("/videos/:id/comments", verifyToken, commentCtrl.addComment);
router.get("/comments/:commentId/replies", commentCtrl.getReplies);
router.delete("/comments/:commentId", verifyToken, commentCtrl.deleteComment);

// USERS
router.get("/users/:username", userCtrl.getProfile);
router.get("/users/:username/videos", userCtrl.getUserVideos);
// cập nhật thông tin cá nhân của tôi
router.put("/users/me", verifyToken, userCtrl.handleUpdateProfile);
router.post("/users/:username/follow", verifyToken, userCtrl.toggleFollow);

// SEARCH
router.get("/search", searchCtrl.search);

module.exports = router;
