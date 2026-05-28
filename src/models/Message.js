const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Message = sequelize.define(
  "Message",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    conversation_id: { type: DataTypes.INTEGER, allowNull: true },
    sender_id: { type: DataTypes.INTEGER, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    message_type: {
      type: DataTypes.ENUM("text", "video", "image"),
      defaultValue: "text",
    },
    ref_video_id: { type: DataTypes.INTEGER, allowNull: true },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    tableName: "messages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = Message;
