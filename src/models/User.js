const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    display_name: { type: DataTypes.STRING(100), allowNull: true },
    email: { type: DataTypes.STRING(100), unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    avatar_url: { type: DataTypes.STRING(255) },
    bio: { type: DataTypes.TEXT },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    username_updated_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = User;
