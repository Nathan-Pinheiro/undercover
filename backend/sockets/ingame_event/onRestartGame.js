const { GameStates } = require("../../utils/gameState");
const rw = require("../../utils/rewards");

function initializeOnRestartGame(io, socket, rooms, room_id)
{
    socket.on("restartGame", () =>
    {
        const room = rooms[room_id];

        if (!room.is_game_state(GameStates.END))
        {
            socket.emit("errorMessage", "You can't restart the game from this game state");
            return;
        }

        room.reset()
        io.to(room_id).emit("sendMessage", "Launching another game !");
        io.to(room_id).emit("sendRoomData", room);
    });
}

module.exports = {
    initializeOnRestartGame,
};
