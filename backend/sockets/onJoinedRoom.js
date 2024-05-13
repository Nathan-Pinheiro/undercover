const { initializeOnConfirmVote } = require("./ingame_event/onConfirmVote");
const { initializeOnDisconnect } = require("./ingame_event/onDisconnect");
const { initializeOnGoToVote } = require("./ingame_event/onGoToVote");
const { initializeOnSendWord } = require("./ingame_event/onSendWord");
const { initializeOnStartGame } = require("./ingame_event/onStartGame");
const { initializeOnNextRound } = require("./ingame_event/onNextRound");
const { initializeOnRestartGame } = require("./ingame_event/onRestartGame");
const { initializeOnUpdateGameSettings } = require("./ingame_event/onUpdateGameSettings");
const { GameStates } = require("../utils/gameState");
const { Player } = require("../models/player");

const initializeOnJoinRoom = (io, socket, rooms) =>
{
    socket.on("joinRoom", (room_id, player_name, player_icon) =>
    {
        if (!Object.keys(rooms).includes(room_id))
        {
            console.log(`The room ${room_id} does not exists`);
            return;
        }

        const room = rooms[room_id]

        socket.join(room_id);
        console.log(`User joined room: ${room_id}`);

        let is_player_already_connected = room.is_player_already_connected(player_name);

        if (is_player_already_connected) socket.emit("sendRoomData", room);
        else
        {
            if (!room.is_game_state(GameStates.WAITING))
            {
                console.log(`Player ${player_name} tried to connect to room that is already started`);
                socket.emit("errorMessage", "Game is already started");
                return;
            }

            rooms[room_id].players.push(new Player(player_name, player_icon));

            io.to(room_id).emit("sendMessage", `${player_name} has joined the room`);
            io.to(room_id).emit("sendRoomData", room);
        }

        initializeOnStartGame(io, socket, rooms, room_id);
        initializeOnSendWord(io, socket, rooms, room_id);
        initializeOnGoToVote(io, socket, rooms, room_id);
        initializeOnConfirmVote(io, socket, rooms, room_id);
        initializeOnDisconnect(io, socket, room_id);
        initializeOnNextRound(io, socket, rooms, room_id);
        initializeOnRestartGame(io, socket, rooms, room_id)
        initializeOnUpdateGameSettings(io, socket, rooms, room_id);
    });
}

module.exports = {
    initializeOnJoinRoom,
};
