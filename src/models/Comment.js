const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Comment = sequelize.define('Comment', {
    id:        { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    video_id:  { type: DataTypes.INTEGER },
    user_id:   { type: DataTypes.INTEGER },
    parent_id: { type: DataTypes.INTEGER, allowNull: true },
    content:   { type: DataTypes.TEXT },
    like_count:{ type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
})

module.exports = Comment
