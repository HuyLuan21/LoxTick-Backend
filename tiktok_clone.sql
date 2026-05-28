/*
 Navicat Premium Dump SQL

 Source Server         : MSqlSever
 Source Server Type    : MySQL
 Source Server Version : 80045 (8.0.45)
 Source Host           : localhost:3306
 Source Schema         : tiktok_clone

 Target Server Type    : MySQL
 Target Server Version : 80045 (8.0.45)
 File Encoding         : 65001

 Date: 13/05/2026 23:17:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment_likes
-- ----------------------------
DROP TABLE IF EXISTS `comment_likes`;
CREATE TABLE `comment_likes`  (
  `user_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `comment_id`) USING BTREE,
  INDEX `comment_id`(`comment_id` ASC) USING BTREE,
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_id` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `parent_id` int NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `like_count` int NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `parent_id`(`parent_id` ASC) USING BTREE,
  INDEX `idx_comments_video`(`video_id` ASC) USING BTREE,
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for conversation_members
-- ----------------------------
DROP TABLE IF EXISTS `conversation_members`;
CREATE TABLE `conversation_members`  (
  `conversation_id` int NOT NULL,
  `user_id` int NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`conversation_id`, `user_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `conversation_members_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `conversation_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for conversations
-- ----------------------------
DROP TABLE IF EXISTS `conversations`;
CREATE TABLE `conversations`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for follows
-- ----------------------------
DROP TABLE IF EXISTS `follows`;
CREATE TABLE `follows`  (
  `follower_id` int NOT NULL,
  `following_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follower_id`, `following_id`) USING BTREE,
  INDEX `idx_follows_following`(`following_id` ASC) USING BTREE,
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for friendships
-- ----------------------------
DROP TABLE IF EXISTS `friendships`;
CREATE TABLE `friendships`  (
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `user_nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `friend_nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `friend_id`) USING BTREE,
  INDEX `idx_friendships_friend`(`friend_id` ASC) USING BTREE,
  CONSTRAINT `friendships_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `friendships_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `chk_user_order` CHECK (`user_id` < `friend_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for hashtags
-- ----------------------------
DROP TABLE IF EXISTS `hashtags`;
CREATE TABLE `hashtags`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `video_count` int NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE,
  INDEX `idx_hashtags_video_count`(`video_count` DESC) USING BTREE,
  INDEX `idx_hashtags_name`(`name` ASC) USING BTREE,
  FULLTEXT INDEX `ft_hashtag_name`(`name`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` int NULL DEFAULT NULL,
  `sender_id` int NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `message_type` enum('text','video','image') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'text',
  `ref_video_id` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sender_id`(`sender_id` ASC) USING BTREE,
  INDEX `ref_video_id`(`ref_video_id` ASC) USING BTREE,
  INDEX `idx_messages_conversation`(`conversation_id` ASC, `created_at` ASC) USING BTREE,
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`ref_video_id`) REFERENCES `videos` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for notifications
-- ----------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `actor_id` int NULL DEFAULT NULL,
  `video_id` int NULL DEFAULT NULL,
  `type` enum('like','comment','follow','mention','reply','save','friend','repost') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_read` tinyint(1) NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `actor_id`(`actor_id` ASC) USING BTREE,
  INDEX `video_id`(`video_id` ASC) USING BTREE,
  INDEX `idx_notifications_user`(`user_id` ASC, `is_read` ASC) USING BTREE,
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for reports
-- ----------------------------
DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `reporter_id` int NULL DEFAULT NULL,
  `target_type` enum('video','comment','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `target_id` int NOT NULL,
  `reason` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` enum('pending','reviewed','dismissed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `reporter_id`(`reporter_id` ASC) USING BTREE,
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `display_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `followers_count` int NULL DEFAULT 0,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'user',
  `show_liked_videos` tinyint(1) NULL DEFAULT 1,
  `show_saved_videos` tinyint(1) NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username_updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  INDEX `idx_users_username`(`username` ASC) USING BTREE,
  INDEX `idx_users_followers`(`followers_count` DESC) USING BTREE,
  FULLTEXT INDEX `ft_username`(`username`, `bio`)
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for video_hashtags
-- ----------------------------
DROP TABLE IF EXISTS `video_hashtags`;
CREATE TABLE `video_hashtags`  (
  `video_id` int NOT NULL,
  `hashtag_id` int NOT NULL,
  PRIMARY KEY (`video_id`, `hashtag_id`) USING BTREE,
  INDEX `idx_video_hashtags_tag`(`hashtag_id` ASC) USING BTREE,
  CONSTRAINT `video_hashtags_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `video_hashtags_ibfk_2` FOREIGN KEY (`hashtag_id`) REFERENCES `hashtags` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for video_likes
-- ----------------------------
DROP TABLE IF EXISTS `video_likes`;
CREATE TABLE `video_likes`  (
  `user_id` int NOT NULL,
  `video_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `video_id`) USING BTREE,
  INDEX `video_id`(`video_id` ASC) USING BTREE,
  CONSTRAINT `video_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `video_likes_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for video_reposts
-- ----------------------------
DROP TABLE IF EXISTS `video_reposts`;
CREATE TABLE `video_reposts`  (
  `user_id` int NOT NULL,
  `video_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `video_id`) USING BTREE,
  INDEX `video_id`(`video_id` ASC) USING BTREE,
  INDEX `idx_video_reposts_user`(`user_id` ASC, `created_at` ASC) USING BTREE,
  CONSTRAINT `video_reposts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `video_reposts_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for video_saves
-- ----------------------------
DROP TABLE IF EXISTS `video_saves`;
CREATE TABLE `video_saves`  (
  `user_id` int NOT NULL,
  `video_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `video_id`) USING BTREE,
  INDEX `video_id`(`video_id` ASC) USING BTREE,
  CONSTRAINT `video_saves_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `video_saves_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for video_views
-- ----------------------------
DROP TABLE IF EXISTS `video_views`;
CREATE TABLE `video_views`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `video_id` int NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  `watch_time` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `video_id`(`video_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `video_views_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `video_views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for videos
-- ----------------------------
DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `video_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `thumbnail_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `caption` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `duration` int NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `view_count` int NULL DEFAULT 0,
  `like_count` int NULL DEFAULT 0,
  `comment_count` int NULL DEFAULT 0,
  `save_count` int NULL DEFAULT 0,
  `repost_count` int NULL DEFAULT 0,
  `status` enum('processing','active','banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'processing',
  `visibility` enum('public','private','followers_only') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'public',
  `resolution_x` int NOT NULL COMMENT 'Độ phân giải video (ví dụ: 1080p, 720p)',
  `resolution_y` int NOT NULL COMMENT 'Độ phân giải video (ví dụ: 1080p, 720p)',
  `published_at` datetime NULL DEFAULT NULL COMMENT 'Thời gian video được công khai',
  `allow_repost` tinyint(1) NULL DEFAULT 1 COMMENT 'Cho phép video được repost',
  `allow_comment` tinyint(1) NULL DEFAULT 1 COMMENT 'Cho phép video được comment',
  `public_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `idx_video_created`(`created_at` ASC) USING BTREE,
  INDEX `idx_video_views`(`view_count` ASC) USING BTREE,
  INDEX `idx_video_likes`(`like_count` ASC) USING BTREE,
  INDEX `idx_video_status`(`status` ASC, `visibility` ASC) USING BTREE,
  FULLTEXT INDEX `ft_video_caption`(`caption`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- View structure for video_recommendation
-- ----------------------------
DROP VIEW IF EXISTS `video_recommendation`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `video_recommendation` AS select `v`.`id` AS `id`,`v`.`user_id` AS `user_id`,`v`.`video_url` AS `video_url`,`v`.`thumbnail_url` AS `thumbnail_url`,`v`.`caption` AS `caption`,`v`.`view_count` AS `view_count`,`v`.`like_count` AS `like_count`,`v`.`comment_count` AS `comment_count`,`v`.`save_count` AS `save_count`,`v`.`repost_count` AS `repost_count`,`v`.`created_at` AS `created_at`,((((((`v`.`view_count` * 1) + (`v`.`like_count` * 3)) + (`v`.`comment_count` * 4)) + (`v`.`save_count` * 5)) + (`v`.`repost_count` * 4)) - (timestampdiff(HOUR,`v`.`created_at`,now()) * 0.1)) AS `score` from `videos` `v` where ((`v`.`status` = 'active') and (`v`.`visibility` = 'public')) order by ((((((`v`.`view_count` * 1) + (`v`.`like_count` * 3)) + (`v`.`comment_count` * 4)) + (`v`.`save_count` * 5)) + (`v`.`repost_count` * 4)) - (timestampdiff(HOUR,`v`.`created_at`,now()) * 0.1)) desc;

-- ----------------------------
-- Triggers structure for table comment_likes
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_comment_like_insert`;
delimiter ;;
CREATE TRIGGER `trg_comment_like_insert` AFTER INSERT ON `comment_likes` FOR EACH ROW BEGIN
    UPDATE comments SET like_count = like_count + 1 WHERE id = NEW.comment_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table comment_likes
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_comment_like_delete`;
delimiter ;;
CREATE TRIGGER `trg_comment_like_delete` AFTER DELETE ON `comment_likes` FOR EACH ROW BEGIN
    UPDATE comments SET like_count = like_count - 1 WHERE id = OLD.comment_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table comments
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_comment_insert`;
delimiter ;;
CREATE TRIGGER `trg_comment_insert` AFTER INSERT ON `comments` FOR EACH ROW BEGIN
    UPDATE videos SET comment_count = comment_count + 1 WHERE id = NEW.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table comments
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_comment_delete`;
delimiter ;;
CREATE TRIGGER `trg_comment_delete` AFTER DELETE ON `comments` FOR EACH ROW BEGIN
    UPDATE videos SET comment_count = comment_count - 1 WHERE id = OLD.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table follows
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_follow_insert`;
delimiter ;;
CREATE TRIGGER `trg_follow_insert` AFTER INSERT ON `follows` FOR EACH ROW BEGIN
    UPDATE users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;

    IF EXISTS (
        SELECT 1 FROM follows
        WHERE follower_id  = NEW.following_id
          AND following_id = NEW.follower_id
    ) THEN
        INSERT IGNORE INTO friendships (user_id, friend_id)
        VALUES (
            LEAST(NEW.follower_id, NEW.following_id),
            GREATEST(NEW.follower_id, NEW.following_id)
        );
    END IF;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table follows
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_follow_delete`;
delimiter ;;
CREATE TRIGGER `trg_follow_delete` AFTER DELETE ON `follows` FOR EACH ROW BEGIN
    UPDATE users SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
    -- Friendship KHÔNG tự xóa khi unfollow (đúng behavior TikTok)
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_hashtags
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_video_hashtag_insert`;
delimiter ;;
CREATE TRIGGER `trg_video_hashtag_insert` AFTER INSERT ON `video_hashtags` FOR EACH ROW BEGIN
    UPDATE hashtags SET video_count = video_count + 1 WHERE id = NEW.hashtag_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_hashtags
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_video_hashtag_delete`;
delimiter ;;
CREATE TRIGGER `trg_video_hashtag_delete` AFTER DELETE ON `video_hashtags` FOR EACH ROW BEGIN
    UPDATE hashtags SET video_count = video_count - 1 WHERE id = OLD.hashtag_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_likes
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_like_insert`;
delimiter ;;
CREATE TRIGGER `trg_like_insert` AFTER INSERT ON `video_likes` FOR EACH ROW BEGIN
    UPDATE videos SET like_count = like_count + 1 WHERE id = NEW.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_likes
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_like_delete`;
delimiter ;;
CREATE TRIGGER `trg_like_delete` AFTER DELETE ON `video_likes` FOR EACH ROW BEGIN
    UPDATE videos SET like_count = like_count - 1 WHERE id = OLD.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_reposts
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_repost_insert`;
delimiter ;;
CREATE TRIGGER `trg_repost_insert` AFTER INSERT ON `video_reposts` FOR EACH ROW BEGIN
    UPDATE videos SET repost_count = repost_count + 1 WHERE id = NEW.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_reposts
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_repost_delete`;
delimiter ;;
CREATE TRIGGER `trg_repost_delete` AFTER DELETE ON `video_reposts` FOR EACH ROW BEGIN
    UPDATE videos SET repost_count = repost_count - 1 WHERE id = OLD.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_saves
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_save_insert`;
delimiter ;;
CREATE TRIGGER `trg_save_insert` AFTER INSERT ON `video_saves` FOR EACH ROW BEGIN
    UPDATE videos SET save_count = save_count + 1 WHERE id = NEW.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_saves
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_save_delete`;
delimiter ;;
CREATE TRIGGER `trg_save_delete` AFTER DELETE ON `video_saves` FOR EACH ROW BEGIN
    UPDATE videos SET save_count = save_count - 1 WHERE id = OLD.video_id;
END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table video_views
-- ----------------------------
DROP TRIGGER IF EXISTS `trg_view_insert`;
delimiter ;;
CREATE TRIGGER `trg_view_insert` AFTER INSERT ON `video_views` FOR EACH ROW BEGIN
    UPDATE videos SET view_count = view_count + 1 WHERE id = NEW.video_id;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
