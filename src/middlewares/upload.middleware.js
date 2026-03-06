const multer = require('multer')
const path   = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename:    (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, unique + path.extname(file.originalname))
    }
})

const videoFilter = (req, file, cb) => {
    const allowed = ['video/mp4', 'video/webm', 'video/quicktime']
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Chỉ chấp nhận file video'), false)
}

const imageFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Chỉ chấp nhận file ảnh'), false)
}

const uploadVideo = multer({ storage, fileFilter: videoFilter, limits: { fileSize: 100 * 1024 * 1024 } })
const uploadImage = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } })

module.exports = { uploadVideo, uploadImage }
