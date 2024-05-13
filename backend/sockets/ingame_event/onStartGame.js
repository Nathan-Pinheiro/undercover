const { GameStates } = require("../../utils/gameState");

function initializeOnStartGame(io, socket, rooms, room_id)
{
    socket.on("startGame", () =>
    {
        const room = rooms[room_id];

        if (!room.is_game_state(GameStates.WAITING))
        {
            socket.emit("errorMessage", "La partie est déjà lancée");
            return;
        }

        if (!room.is_game_startable())
        {
            socket.emit("errorMessage", "Il faut au minimum 3 joueurs pour lancer une partie !");
            return;
        }

        room.start_new_round();

        console.log(`Game ${room_id} is starting !`);
        io.to(room_id).emit("sendMessage", "Game is starting !");
        io.to(room_id).emit("sendRoomData", rooms[room_id]);

    });
}

module.exports = {
    initializeOnStartGame,
};