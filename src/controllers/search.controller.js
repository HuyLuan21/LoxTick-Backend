const { Op } = require('sequelize')
const { Video, User, Hashtag, VideoHashtag } = require('../models')

const search = async (req, res) => {
    try {
        const { q, page = 1 } = req.query
        if (!q) return res.json({ videos: [], users: [], hashtags: [] })

        const limit  = 20
        const offset = (page - 1) * limit
        const tags   = q.match(/#\w+/g)?.map(h => h.slice(1)) || []
        const text   = q.replace(/#\w+/g, '').trim() || q

        let videos = []
        let users  = []
        let hashtags = []

        // Chỉ lấy users + hashtags ở trang đầu
        if (page == 1) {
            users = await User.findAll({
                where: { username: { [Op.like]: `%${text}%` } },
                attributes: ['id', 'username', 'avatar_url', 'bio'],
                limit: 4
            })

            hashtags = await Hashtag.findAll({
                where: { name: { [Op.like]: `%${text}%` } },
                limit: 5
            })
        }

        // Tìm video theo hashtag
        if (tags.length) {
            const hashtagRows = await Hashtag.findAll({ where: { name: { [Op.in]: tags } } })
            const hashtagIds  = hashtagRows.map(h => h.id)

            const videoHashtags = await VideoHashtag.findAll({
                where: { hashtag_id: { [Op.in]: hashtagIds } }
            })
            const videoIds = [...new Set(videoHashtags.map(vh => vh.video_id))]

            const tagVideos = await Video.findAll({
                where: { id: { [Op.in]: videoIds }, status: 'active', visibility: 'public' },
                include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatar_url'] }],
                order: [['created_at', 'DESC']],
                limit, offset
            })
            videos.push(...tagVideos)
        }

        // Tìm video theo caption
        if (text) {
            const captionVideos = await Video.findAll({
                where: { caption: { [Op.like]: `%${text}%` }, status: 'active', visibility: 'public' },
                include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatar_url'] }],
                order: [['created_at', 'DESC']],
                limit, offset
            })
            videos.push(...captionVideos)
        }

        // Bỏ trùng
        const unique = [...new Map(videos.map(v => [v.id, v])).values()]

        res.json({ videos: unique, users, hashtags })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

module.exports = { search }
