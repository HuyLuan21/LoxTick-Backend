const sequelize = require("../config/db");
const User = require("./User");
const Video = require("./Video");
const Comment = require("./Comment");
const Conversation = require("./Conversation");
const ConversationMember = require("./ConversationMember");
const Message = require("./Message");
const { DataTypes } = require("sequelize");

// =====================================
// JUNCTION MODELS (bảng trung gian)
// =====================================
const VideoLike = sequelize.define(
  "VideoLike",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    video_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "video_likes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

const VideoSave = sequelize.define(
  "VideoSave",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    video_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "video_saves",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

const CommentLike = sequelize.define(
  "CommentLike",
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    comment_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "comment_likes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

const Follow = sequelize.define(
  "Follow",
  {
    follower_id: { type: DataTypes.INTEGER, primaryKey: true },
    following_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: "follows",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

const Hashtag = sequelize.define(
  "Hashtag",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), unique: true },
  },
  { tableName: "hashtags", timestamps: false },
);

const VideoHashtag = sequelize.define(
  "VideoHashtag",
  {
    video_id: { type: DataTypes.INTEGER, primaryKey: true },
    hashtag_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  { tableName: "video_hashtags", timestamps: false },
);

const Notification = sequelize.define(
  "Notification",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    actor_id: { type: DataTypes.INTEGER },
    video_id: { type: DataTypes.INTEGER, allowNull: true },
    type: {
      type: DataTypes.ENUM(
        "like",
        "comment",
        "follow",
        "mention",
        "reply",
        "save",
      ),
      allowNull: false,
    },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "notifications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

// =====================================
// ASSOCIATIONS
// =====================================

// User - Video
User.hasMany(Video, { foreignKey: "user_id", as: "videos" });
Video.belongsTo(User, { foreignKey: "user_id", as: "author" });

// User - Comment
User.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
Comment.belongsTo(User, { foreignKey: "user_id", as: "author" });

// Video - Comment
Video.hasMany(Comment, { foreignKey: "video_id", as: "comments" });
Comment.belongsTo(Video, { foreignKey: "video_id" });

// Comment tự tham chiếu (reply)
Comment.hasMany(Comment, { foreignKey: "parent_id", as: "replies" });
Comment.belongsTo(Comment, { foreignKey: "parent_id", as: "parent" });

// Comment Like
User.belongsToMany(Comment, {
  through: CommentLike,
  foreignKey: "user_id",
  as: "likedComments",
});
Comment.belongsToMany(User, {
  through: CommentLike,
  foreignKey: "comment_id",
  as: "commentLikers",
});

// Like
User.belongsToMany(Video, {
  through: VideoLike,
  foreignKey: "user_id",
  as: "likedVideos",
});
Video.belongsToMany(User, {
  through: VideoLike,
  foreignKey: "video_id",
  as: "likers",
});

// Save
User.belongsToMany(Video, {
  through: VideoSave,
  foreignKey: "user_id",
  as: "savedVideos",
});
Video.belongsToMany(User, {
  through: VideoSave,
  foreignKey: "video_id",
  as: "savers",
});

// Follow
User.belongsToMany(User, {
  through: Follow,
  foreignKey: "follower_id",
  as: "following",
});
User.belongsToMany(User, {
  through: Follow,
  foreignKey: "following_id",
  as: "followers",
});

// Hashtag
Video.belongsToMany(Hashtag, {
  through: VideoHashtag,
  foreignKey: "video_id",
  as: "hashtags",
});
Hashtag.belongsToMany(Video, {
  through: VideoHashtag,
  foreignKey: "hashtag_id",
  as: "videos",
});

// Notification
User.hasMany(Notification, { foreignKey: "user_id", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "actor_id", as: "actor" });
Notification.belongsTo(Video, { foreignKey: "video_id", as: "video" });

// Conversation (many-to-many qua conversation_members)
User.belongsToMany(Conversation, {
  through: ConversationMember,
  foreignKey: "user_id",
  otherKey: "conversation_id",
  as: "conversations",
});
Conversation.belongsToMany(User, {
  through: ConversationMember,
  foreignKey: "conversation_id",
  otherKey: "user_id",
  as: "members",
});

// ConversationMember direct associations
ConversationMember.belongsTo(User, { foreignKey: "user_id", as: "user" });
ConversationMember.belongsTo(Conversation, { foreignKey: "conversation_id" });

// Message
Conversation.hasMany(Message, { foreignKey: "conversation_id", as: "messages" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });
User.hasMany(Message, { foreignKey: "sender_id", as: "sentMessages" });
Message.belongsTo(User, { foreignKey: "sender_id", as: "sender" });
Message.belongsTo(Video, { foreignKey: "ref_video_id", as: "refVideo" });

module.exports = {
  sequelize,
  User,
  Video,
  Comment,
  VideoLike,
  VideoSave,
  CommentLike,
  Follow,
  Hashtag,
  VideoHashtag,
  Notification,
  Conversation,
  ConversationMember,
  Message,
};
