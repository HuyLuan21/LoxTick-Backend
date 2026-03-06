const { Comment, User } = require('../models')

const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { video_id: req.params.id, parent_id: null },
            include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatar_url'] }],
            order: [['created_at', 'DESC']]
        })
        res.json({ comments })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const getReplies = async (req, res) => {
    try {
        const replies = await Comment.findAll({
            where: { parent_id: req.params.commentId },
            include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatar_url'] }],
            order: [['created_at', 'ASC']]
        })
        res.json({ replies })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const addComment = async (req, res) => {
    try {
        const { content, parent_id } = req.body
        if (!content) return res.status(400).json({ message: 'Nội dung không được trống' })

        const comment = await Comment.create({
            video_id: req.params.id,
            user_id: req.user.id,
            parent_id: parent_id || null,
            content
        })

        res.status(201).json({ message: 'Đã bình luận', comment_id: comment.id })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId)
        if (!comment) return res.status(404).json({ message: 'Không tìm thấy comment' })
        if (comment.user_id !== req.user.id)
            return res.status(403).json({ message: 'Không có quyền xóa' })

        await comment.destroy()
        res.json({ message: 'Đã xóa comment' })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

module.exports = { getComments, getReplies, addComment, deleteComment }
