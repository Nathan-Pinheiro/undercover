const { GameStates } = require("../../utils/gameState");

function initializeOnNextRound(io, socket, rooms, room_id)
{
    socket.on("nextTurn", () =>
    {
        const room = rooms[room_id];

        if (!room.is_game_state(GameStates.RESULT))
        {
            socket.emit("errorMessage", "La partie devrait être en train de montrer les résultats");
            return;
        }

        room.start_new_round();

        console.log(`New round is starting in room : ${room_id} !`);
        io.to(room_id).emit("sendMessage", "Round is starting !");
        io.to(room_id).emit("sendRoomData", room);
    });
}

module.exports = {
    initializeOnNextRound,
};