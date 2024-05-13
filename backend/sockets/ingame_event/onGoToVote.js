const { GameStates } = require("../../utils/gameState");

function initializeOnGoToVote(io, socket, rooms, room_id)
{
    socket.on("goToVote", (player_name) =>
    {
        const room = rooms[room_id];

        if (room.host != player_name)
        {
            socket.emit("errorMessage", "Only the host player can decide when going to the voting time");
            return;
        }

        if (!room.is_game_state(GameStates.PLAYING) && !room.is_game_state(GameStates.FINISHED_PLAYING))
        {
            socket.emit("errorMessage", "You can't go to voting time from this game state");
            return;
        }

        room.game_state = GameStates.VOTING;
        io.to(room_id).emit("sendMessage", "Let's vote !");
        io.to(room_id).emit("sendRoomData", room);

    });
}

module.exports = {
    initializeOnGoToVote,
};