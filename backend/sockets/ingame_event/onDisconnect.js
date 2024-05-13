function initializeOnDisconnect(io, socket, room_id)
{
    socket.on("disconnect", () =>
    {
        console.log(`A user disconnected from the game ${room_id}`);
        io.to(room_id).emit("sendMessage", "A user disconnected from the room");
    });
}

module.exports = {
    initializeOnDisconnect,
};