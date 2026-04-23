const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Video = sequelize.define(
  "Video",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    video_url: { type: DataTypes.STRING(255), allowNull: false },
    public_id: { type: DataTypes.STRING(255), allowNull: true },
    thumbnail_url: { type: DataTypes.STRING(255), allowNull: true },
    caption: { type: DataTypes.TEXT, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: true },
    view_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    like_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    comment_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    save_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    repost_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: {
      type: DataTypes.ENUM("processing", "active", "banned"),
      defaultValue: "processing",
      allowNull: true,
    },
    visibility: {
      type: DataTypes.ENUM("public", "private", "followers_only"),
      defaultValue: "public",
      allowNull: true,
    },
    resolution_x: { type: DataTypes.INTEGER, allowNull: false },
    resolution_y: { type: DataTypes.INTEGER, allowNull: false },
    published_at: { type: DataTypes.DATE, allowNull: true },
    allow_repost: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    allow_comment: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    tableName: "videos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = Video;
