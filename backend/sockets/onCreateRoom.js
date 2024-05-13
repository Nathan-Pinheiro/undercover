const { getNewRoomId } = require("../utils/roomIdGenerator");
const { Room }= require("../models/room");

function initializeOnCreateRoom(socket, rooms)
{
    socket.on("createNewRoom", (host_player) =>
    {
        let room_id = getNewRoomId(rooms)
        rooms[room_id] = new Room(host_player);
        socket.emit("sendNewRoomCreated", room_id);
    });
}

module.exports = {
    initializeOnCreateRoom,
};