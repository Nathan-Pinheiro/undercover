const { GameStates } = require("../../utils/gameState");
const rw = require("../../utils/rewards");

function initializeOnConfirmVote(io, socket, rooms, room_id)
{
    socket.on("confirmVote", (player_id, target_id) =>
    {
        const room = rooms[room_id];
        const players = room.players;

        if (!Number.isInteger(player_id) || !Number.isInteger(target_id))
        {
            socket.emit("errorMessage", "Error : this method accept only two integers parameters");
            return;
        }

        if (!room.is_game_state(GameStates.VOTING))
        {
            socket.emit("errorMessage", "You can't vote from this game state");
            return;
        }

        if (players[player_id].vote != undefined)
        {
            socket.emit("errorMessage", "You have already voted");
            return;
        }

        players[player_id].vote = target_id;
        socket.emit("sendMessage", `Vote confirmed on ${players[target_id].player_name}`);

        if (room.is_voting_time_finished(players))
        {
            room.proceed_end_turn()

            if(room.is_last_round())
            {
                room.end_game();
                io.to(room_id).emit("sendMessage", `Game is finished, let's see who won !`);
            }
            else
            {
                room.show_results();
                io.to(room_id).emit("sendMessage", `Time to see the results !`);
            }
            io.to(room_id).emit("sendRoomData", room);
        }

        socket.emit("sendRoomData", room);
    });
}

module.exports = {
    initializeOnConfirmVote,
};
