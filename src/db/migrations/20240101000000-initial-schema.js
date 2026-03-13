"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ── USERS ───────────────────────────────
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      display_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      avatar_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      followers_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      role: {
        type: Sequelize.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
      show_liked_videos: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      show_saved_videos: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
      username_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("users", ["username"], {
      name: "idx_users_username",
    });
    await queryInterface.addIndex("users", ["email"], {
      name: "idx_users_email",
      unique: true,
    });
    await queryInterface.addIndex("users", ["followers_count"], {
      name: "idx_users_followers",
    });
    await queryInterface.addIndex("users", ["username", "bio"], {
      type: "FULLTEXT",
      name: "ft_username",
    });

    // ── VIDEOS ─────────────────────────────────────────────────────────
    await queryInterface.createTable("videos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      video_url: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      thumbnail_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      view_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      like_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      comment_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      save_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      repost_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.ENUM("processing", "active", "banned"),
        allowNull: false,
        defaultValue: "processing",
      },
      visibility: {
        type: Sequelize.ENUM("public", "private", "followers_only"),
        allowNull: false,
        defaultValue: "public",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("videos", ["created_at"], {
      name: "idx_video_created",
    });
    await queryInterface.addIndex("videos", ["view_count"], {
      name: "idx_video_views",
    });
    await queryInterface.addIndex("videos", ["like_count"], {
      name: "idx_video_likes",
    });
    await queryInterface.addIndex("videos", ["status", "visibility"], {
      name: "idx_video_status",
    });
    await queryInterface.addIndex("videos", ["caption"], {
      type: "FULLTEXT",
      name: "ft_video_caption",
    });

    // ── VIDEO LIKES ────────────────────────────────────────────────────
    await queryInterface.createTable("video_likes", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "videos", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ── VIDEO SAVES ────────────────────────────────────────────────────
    await queryInterface.createTable("video_saves", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "videos", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ── VIDEO REPOSTS ──────────────────────────────────────────────────
    await queryInterface.createTable("video_reposts", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "videos", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("video_reposts", ["user_id", "created_at"], {
      name: "idx_video_reposts_user",
    });

    // ── COMMENTS ───────────────────────────────────────────────────────
    await queryInterface.createTable("comments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "videos", key: "id" },
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "comments", key: "id" },
        onDelete: "SET NULL",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      like_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("comments", ["video_id"], {
      name: "idx_comments_video",
    });

    // ── COMMENT LIKES ──────────────────────────────────────────────────
    await queryInterface.createTable("comment_likes", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "comments", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ── FOLLOWS ────────────────────────────────────────────────────────
    await queryInterface.createTable("follows", {
      follower_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      following_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("follows", ["following_id"], {
      name: "idx_follows_following",
    });

    // ── FRIENDSHIPS ────────────────────────────────────────────────────
    await queryInterface.createTable("friendships", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      friend_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      user_nickname: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      friend_nickname: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("friendships", ["friend_id"], {
      name: "idx_friendships_friend",
    });
    // CHECK constraint (user_id < friend_id) — thêm thủ công vì Sequelize không hỗ trợ
    await queryInterface.sequelize.query(`
            ALTER TABLE friendships
            ADD CONSTRAINT chk_user_order CHECK (user_id < friend_id)
        `);

    // ── VIDEO VIEWS ────────────────────────────────────────────────────
    await queryInterface.createTable("video_views", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "videos", key: "id" },
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
      },
      watch_time: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ── HASHTAGS ───────────────────────────────────────────────────────
    await queryInterface.createTable("hashtags", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      video_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("hashtags", ["video_count"], {
      name: "idx_hashtags_video_count",
    });
    await queryInterface.addIndex("hashtags", ["name"], {
      name: "idx_hashtags_name",
    });
    await queryInterface.addIndex("hashtags", ["name"], {
      type: "FULLTEXT",
      name: "ft_hashtag_name",
    });

    // ── VIDEO HASHTAGS ─────────────────────────────────────────────────
    await queryInterface.createTable("video_hashtags", {
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "videos", key: "id" },
        onDelete: "CASCADE",
      },
      hashtag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "hashtags", key: "id" },
        onDelete: "CASCADE",
      },
    });
    await queryInterface.addIndex("video_hashtags", ["hashtag_id"], {
      name: "idx_video_hashtags_tag",
    });

    // ── CONVERSATIONS ──────────────────────────────────────────────────
    await queryInterface.createTable("conversations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ── CONVERSATION MEMBERS ───────────────────────────────────────────
    await queryInterface.createTable("conversation_members", {
      conversation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "conversations", key: "id" },
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      joined_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ── MESSAGES ───────────────────────────────────────────────────────
    await queryInterface.createTable("messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      conversation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "conversations", key: "id" },
        onDelete: "CASCADE",
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      message_type: {
        type: Sequelize.ENUM("text", "video", "image"),
        allowNull: false,
        defaultValue: "text",
      },
      ref_video_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "videos", key: "id" },
        onDelete: "SET NULL",
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex(
      "messages",
      ["conversation_id", "created_at"],
      { name: "idx_messages_conversation" },
    );

    // ── NOTIFICATIONS ──────────────────────────────────────────────────
    await queryInterface.createTable("notifications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      actor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      video_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "videos", key: "id" },
        onDelete: "SET NULL",
      },
      type: {
        type: Sequelize.ENUM(
          "like",
          "comment",
          "follow",
          "mention",
          "reply",
          "save",
          "friend",
          "repost",
        ),
        allowNull: false,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("notifications", ["user_id", "is_read"], {
      name: "idx_notifications_user",
    });

    // ── REPORTS ────────────────────────────────────────────────────────
    await queryInterface.createTable("reports", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      reporter_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      target_type: {
        type: Sequelize.ENUM("video", "comment", "user"),
        allowNull: false,
      },
      target_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reason: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "reviewed", "dismissed"),
        allowNull: false,
        defaultValue: "pending",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // ── TRIGGERS ───────────────────────────────────────────────────────
    const triggers = [
      // Like video
      [
        `trg_like_insert`,
        `AFTER INSERT ON video_likes FOR EACH ROW BEGIN UPDATE videos SET like_count = like_count + 1 WHERE id = NEW.video_id; END`,
      ],
      [
        `trg_like_delete`,
        `AFTER DELETE ON video_likes FOR EACH ROW BEGIN UPDATE videos SET like_count = like_count - 1 WHERE id = OLD.video_id; END`,
      ],
      // Like comment
      [
        `trg_comment_like_insert`,
        `AFTER INSERT ON comment_likes FOR EACH ROW BEGIN UPDATE comments SET like_count = like_count + 1 WHERE id = NEW.comment_id; END`,
      ],
      [
        `trg_comment_like_delete`,
        `AFTER DELETE ON comment_likes FOR EACH ROW BEGIN UPDATE comments SET like_count = like_count - 1 WHERE id = OLD.comment_id; END`,
      ],
      // Save
      [
        `trg_save_insert`,
        `AFTER INSERT ON video_saves FOR EACH ROW BEGIN UPDATE videos SET save_count = save_count + 1 WHERE id = NEW.video_id; END`,
      ],
      [
        `trg_save_delete`,
        `AFTER DELETE ON video_saves FOR EACH ROW BEGIN UPDATE videos SET save_count = save_count - 1 WHERE id = OLD.video_id; END`,
      ],
      // Repost
      [
        `trg_repost_insert`,
        `AFTER INSERT ON video_reposts FOR EACH ROW BEGIN UPDATE videos SET repost_count = repost_count + 1 WHERE id = NEW.video_id; END`,
      ],
      [
        `trg_repost_delete`,
        `AFTER DELETE ON video_reposts FOR EACH ROW BEGIN UPDATE videos SET repost_count = repost_count - 1 WHERE id = OLD.video_id; END`,
      ],
      // Comment count
      [
        `trg_comment_insert`,
        `AFTER INSERT ON comments FOR EACH ROW BEGIN UPDATE videos SET comment_count = comment_count + 1 WHERE id = NEW.video_id; END`,
      ],
      [
        `trg_comment_delete`,
        `AFTER DELETE ON comments FOR EACH ROW BEGIN UPDATE videos SET comment_count = comment_count - 1 WHERE id = OLD.video_id; END`,
      ],
      // View count
      [
        `trg_view_insert`,
        `AFTER INSERT ON video_views FOR EACH ROW BEGIN UPDATE videos SET view_count = view_count + 1 WHERE id = NEW.video_id; END`,
      ],
      // Hashtag count
      [
        `trg_video_hashtag_insert`,
        `AFTER INSERT ON video_hashtags FOR EACH ROW BEGIN UPDATE hashtags SET video_count = video_count + 1 WHERE id = NEW.hashtag_id; END`,
      ],
      [
        `trg_video_hashtag_delete`,
        `AFTER DELETE ON video_hashtags FOR EACH ROW BEGIN UPDATE hashtags SET video_count = video_count - 1 WHERE id = OLD.hashtag_id; END`,
      ],
      // Follow + auto friendship
      [
        `trg_follow_insert`,
        `
                AFTER INSERT ON follows FOR EACH ROW BEGIN
                    UPDATE users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
                    IF EXISTS (
                        SELECT 1 FROM follows WHERE follower_id = NEW.following_id AND following_id = NEW.follower_id
                    ) THEN
                        INSERT IGNORE INTO friendships (user_id, friend_id)
                        VALUES (LEAST(NEW.follower_id, NEW.following_id), GREATEST(NEW.follower_id, NEW.following_id));
                    END IF;
                END
            `,
      ],
      [
        `trg_follow_delete`,
        `AFTER DELETE ON follows FOR EACH ROW BEGIN UPDATE users SET followers_count = followers_count - 1 WHERE id = OLD.following_id; END`,
      ],
    ];
    for (const [name, body] of triggers) {
      await queryInterface.sequelize.query(
        `DROP TRIGGER IF EXISTS \`${name}\``,
      );
      await queryInterface.sequelize.query(
        `CREATE TRIGGER \`${name}\` ${body}`,
      );
    }

    // ── VIEW ───────────────────────────────────────────────────────────
    await queryInterface.sequelize.query(
      `DROP VIEW IF EXISTS video_recommendation`,
    );
    await queryInterface.sequelize.query(`
            CREATE VIEW video_recommendation AS
            SELECT
                v.id, v.user_id, v.video_url, v.thumbnail_url, v.caption,
                v.view_count, v.like_count, v.comment_count, v.save_count, v.repost_count,
                v.created_at,
                (
                    v.view_count    * 1 +
                    v.like_count    * 3 +
                    v.comment_count * 4 +
                    v.save_count    * 5 +
                    v.repost_count  * 4 -
                    TIMESTAMPDIFF(HOUR, v.created_at, NOW()) * 0.1
                ) AS score
            FROM videos v
            WHERE v.status = 'active' AND v.visibility = 'public'
            ORDER BY score DESC
        `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP VIEW IF EXISTS video_recommendation`,
    );

    const triggers = [
      "trg_follow_delete",
      "trg_follow_insert",
      "trg_video_hashtag_delete",
      "trg_video_hashtag_insert",
      "trg_view_insert",
      "trg_comment_delete",
      "trg_comment_insert",
      "trg_repost_delete",
      "trg_repost_insert",
      "trg_save_delete",
      "trg_save_insert",
      "trg_comment_like_delete",
      "trg_comment_like_insert",
      "trg_like_delete",
      "trg_like_insert",
    ];
    for (const t of triggers) {
      await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS \`${t}\``);
    }

    // Drop theo thứ tự ngược FK
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    const tables = [
      "reports",
      "notifications",
      "messages",
      "conversation_members",
      "conversations",
      "video_hashtags",
      "hashtags",
      "video_views",
      "friendships",
      "follows",
      "comment_likes",
      "comments",
      "video_reposts",
      "video_saves",
      "video_likes",
      "videos",
      "users",
    ];
    for (const t of tables) await queryInterface.dropTable(t);
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};
