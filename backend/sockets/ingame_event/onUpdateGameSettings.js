const { GameStates } = require("../../utils/gameState");

function initializeOnUpdateGameSettings(io, socket, rooms, room_id)
{
    socket.on("sendWord", (player_name, game_settings) =>
    {
        const room = rooms[room_id];

        if (!room.is_game_state(GameStates.WAITING))
        {
            socket.emit("errorMessage", "Il est impossible de changer les paramètres en cours de partie");
            return;
        }

        if (player_name != room.host)
        {
            socket.emit("errorMessage", `Seul l'host peut changer les paramètres de partie`);
            return;
        }

        room.game_settings = game_settings;
    });
}

module.exports = {
    initializeOnUpdateGameSettings,
};

