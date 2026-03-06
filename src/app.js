require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

const sequelize = require('./config/db')
require('./models') // load tất cả models + associations

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/api', routes)

app.use((req, res) => res.status(404).json({ message: 'Route không tồn tại' }))
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500).json({ message: err.message || 'Lỗi server' })
})

const PORT = process.env.PORT || 3000

// Kết nối DB rồi mới start server
sequelize.authenticate()
    .then(() => {
        console.log('✅ Kết nối DB thành công')
        app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`))
    })
    .catch(err => {
        console.error('❌ Kết nối DB thất bại:', err.message)
        process.exit(1)
    })
