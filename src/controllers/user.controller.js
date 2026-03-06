const { User, Video, Follow } = require('../models')

const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.params.username },
            attributes: { exclude: ['password_hash'] }
        })
        if (!user) return res.status(404).json({ message: 'Không tìm thấy user' })

        const followers = await Follow.count({ where: { following_id: user.id } })
        const following = await Follow.count({ where: { follower_id:  user.id } })

        res.json({ ...user.toJSON(), followers, following })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const getUserVideos = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } })
        if (!user) return res.status(404).json({ message: 'Không tìm thấy user' })

        const videos = await Video.findAll({
            where: { user_id: user.id, status: 'active', visibility: 'public' },
            order: [['created_at', 'DESC']]
        })

        res.json({ videos })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { bio } = req.body
        const avatar_url = req.file?.filename

        const updates = {}
        if (bio !== undefined) updates.bio = bio
        if (avatar_url)        updates.avatar_url = avatar_url

        if (!Object.keys(updates).length)
            return res.status(400).json({ message: 'Không có gì để cập nhật' })

        await User.update(updates, { where: { id: req.user.id } })
        res.json({ message: 'Cập nhật thành công' })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const toggleFollow = async (req, res) => {
    try {
        const target = await User.findOne({ where: { username: req.params.username } })
        if (!target) return res.status(404).json({ message: 'Không tìm thấy user' })
        if (target.id === req.user.id)
            return res.status(400).json({ message: 'Không thể tự follow mình' })

        const existing = await Follow.findOne({
            where: { follower_id: req.user.id, following_id: target.id }
        })

        if (existing) {
            await existing.destroy()
            return res.json({ followed: false })
        }

        await Follow.create({ follower_id: req.user.id, following_id: target.id })
        res.json({ followed: true })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

module.exports = { getProfile, getUserVideos, updateProfile, toggleFollow }
