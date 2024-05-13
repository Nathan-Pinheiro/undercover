const { GameStates } = require("../../utils/gameState");

function initializeOnSendWord(io, socket, rooms, room_id)
{
    socket.on("sendWord", (player_name, word) =>
    {
        const room = rooms[room_id];

        if (!room.is_game_state(GameStates.PLAYING))
        {
            socket.emit("errorMessage", "Il est impossible d'envoyer des mots en dehors des sessions de jeu");
            return;
        }

        if (player_name != room.players[room.turn].player_name)
        {
            socket.emit("errorMessage", `Ce n'est pas à votre tour de jouer ! (Tour de : ${room.players[room.turn].player_name})`);
            return;
        }

        room.player_send_message(word)

        console.log("words : " + room.players[room.turn].words.length);
        console.log("turn : " + room.turn);

        if (room.players[room.turn].words.length >= room.game_settings.max_words)
        {
            room.game_state = GameStates.FINISHED_PLAYING;
            io.to(room_id).emit("sendRoomData", room);
            io.to(room_id).emit("sendMessage", "Fin de la manche");
        }
        else
        {
            room.players[room.turn].is_talking = true;
            io.to(room_id).emit("sendRoomData", room);
        }
    });
}

module.exports = {
    initializeOnSendWord,
};

