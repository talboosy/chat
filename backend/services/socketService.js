const { Server } = require("socket.io");
const ENUMS = require('../utils/constants').ENUMS;

let io;

const init = (server) => {
    io = new Server(server, {cors: {origin: '*'}});
    io.on(ENUMS.CONNECT, (socket) => {
        console.log('a user connected');
        socket.on(ENUMS.DISCONNECT, () => {
            console.log('user disconnected');
        });
        socket.on(ENUMS.CHAT_MESSAGE, (message) => {
            io.emit(ENUMS.CHAT_MESSAGE, message)
            console.log('message: ' + message)
        })
    });
}

module.exports = {
    init
};