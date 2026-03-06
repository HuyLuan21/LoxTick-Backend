const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('User', {
    id:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username:      { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email:         { type: DataTypes.STRING(100), unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    avatar_url:    { type: DataTypes.STRING(255) },
    bio:           { type: DataTypes.TEXT },
    role:          { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
})

module.exports = User
