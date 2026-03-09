const { isHttpError } = require('http-errors')
const logger = require('../config/logger')

const errorHandler = (err, req, res, next) => {
    let statusCode = 500
    let message = 'Internal Server Error'

    if (isHttpError(err)) {
        statusCode = err.statusCode
        message = err.message
    }

    // Chỉ log lỗi 500 trở lên
    if (statusCode >= 500) {
        logger.error({
            message: err.message,
            statusCode,
            method: req.method,
            url: req.url,
            stack: err.stack
        })
    }

    res.status(statusCode).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
}

module.exports = errorHandler

