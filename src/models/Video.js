const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Video = sequelize.define('Video', {
    id:            { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id:       { type: DataTypes.INTEGER, allowNull: false },
    video_url:     { type: DataTypes.STRING(255), allowNull: false },
    thumbnail_url: { type: DataTypes.STRING(255) },
    caption:       { type: DataTypes.TEXT },
    duration:      { type: DataTypes.INTEGER },
    view_count:    { type: DataTypes.INTEGER, defaultValue: 0 },
    like_count:    { type: DataTypes.INTEGER, defaultValue: 0 },
    comment_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    save_count:    { type: DataTypes.INTEGER, defaultValue: 0 },
    status:        { type: DataTypes.ENUM('processing', 'active', 'banned'), defaultValue: 'processing' },
    visibility:    { type: DataTypes.ENUM('public', 'private', 'followers_only'), defaultValue: 'public' },
}, {
    tableName: 'videos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
})

module.exports = Video
