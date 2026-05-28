const jwt = require("jsonwebtoken");
const commentListener = require("./comment");

const onConnection = async (
    socketInstance,
    ioInstance
) => {
    console.log('\x1b[33m===>>>Socket connected', socketInstance.id, '\x1b[0m')

    const token = socketInstance.handshake.auth?.token;

    if (token) {
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded) {
                socketInstance.join(`user:${decoded.id}`)

                socketInstance.data.decoded = decoded
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Listen event
    new commentListener(socketInstance, ioInstance)

    socketInstance.on('disconnect', async () => {
        console.log('\x1b[31m===>>>Socket disconnected', socketInstance.id, '\x1b[0m')
    })
}

module.exports = {
    onConnection
}
