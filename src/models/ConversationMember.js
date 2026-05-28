const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ConversationMember = sequelize.define(
  "ConversationMember",
  {
    conversation_id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "conversation_members",
    timestamps: false,
  },
);

module.exports = ConversationMember;
