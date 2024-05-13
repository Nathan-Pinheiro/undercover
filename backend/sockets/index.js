const onCreateRoom = require("./onCreateRoom");
const onJoinRoom = require("./onJoinedRoom");

function initializeSockets(io) {

    const rooms = {};

    io.on("connection", (socket) =>
    {
        console.log("A user connected to the server");
        onCreateRoom.initializeOnCreateRoom(socket, rooms);
        onJoinRoom.initializeOnJoinRoom(io, socket, rooms);
    });
}

module.exports = {
    initializeSockets,
};