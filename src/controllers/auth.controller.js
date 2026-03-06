const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const { User } = require('../models')

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password)
            return res.status(400).json({ message: 'Thiếu thông tin' })

        const hash = await bcrypt.hash(password, 10)
        await User.create({ username, email, password_hash: hash })

        res.status(201).json({ message: 'Đăng ký thành công' })
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError')
            return res.status(409).json({ message: 'Username hoặc email đã tồn tại' })
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản' })

        const valid = await bcrypt.compare(password, user.password_hash)
        if (!valid) return res.status(401).json({ message: 'Sai mật khẩu' })

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar_url: user.avatar_url,
                role: user.role
            }
        })
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password_hash'] }
        })
        res.json(user)
    } catch {
        res.status(500).json({ message: 'Lỗi server' })
    }
}

module.exports = { register, login, getMe }
