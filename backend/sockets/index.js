const onCreateRoom = require("./onCreateRoom");
const onJoinRoom = require("./onJoinedRoom");

function initializeSockets(io) {

    const rooms = {};

    io.on("connection", (socket) =>
    {
        console.log("A user connected to the server");

        socket.on("connect_error", (err) => {
            console.log(err.message);
            console.log(err.description);
            console.log(err.context);
        });

        onCreateRoom.initializeOnCreateRoom(socket, rooms);
        onJoinRoom.initializeOnJoinRoom(io, socket, rooms);
    });

    io.engine.on("connection_error", (err) => {
        console.log(err.req);
        console.log(err.code);
        console.log(err.message);
        console.log(err.context);
    });

}

module.exports = {
    initializeSockets,
};