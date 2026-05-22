const { onConnection } = require("../socket")

let ioInstance
let socket

const socketIO = (io) => {
    ioInstance = io

    ioInstance.on("connection", (socketInstance) => {
        onConnection(socketInstance, ioInstance)

        socket = socketInstance

        socketInstance.on("disconnect", async () => {
            console.log("\x1b[33m===>>>Socket disconnected!!!", "\x1b[0m")
        })
    })
}

const getIO = () => ioInstance
const getSocket = () => socket

module.exports = {
    socketIO,
    getIO,
    getSocket
}