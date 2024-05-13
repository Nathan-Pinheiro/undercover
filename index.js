const express = require("express")
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");
const { generateWords } = require("./backend/utils/wordManager.js");
const { GameStates } = require("./backend/utils/gameState.js");
const { Rewards } = require("./backend/utils/rewards.js");
const { hostname } = require("os");

const PORT = 80

const lang = process.env.LANG.slice(0, 2);

app.get("/", (_, res) => {
    const indexHTML = fs.readFileSync(__dirname + "/html/index.html", "utf-8");
    res.send(indexHTML);
})

app.get("/game", (_, res) => {
    const indexHTML = fs.readFileSync(__dirname + "/html/game.html", "utf-8");
    res.send(indexHTML);
})

app.use("/css", express.static(__dirname + "/css/"));
app.use("/resources", express.static(__dirname + "/resources/"));
app.use("/html", express.static(__dirname + "/html/"));

let rooms = {};

io.on("connection", (socket) => {

    console.log("A user connected to the server");

    socket.on("joinRoom", (room_id, player_name, player_icon) => {
        if (Object.keys(rooms).includes(room_id)) {
            socket.join(room_id);
            console.log(`User joined room: ${room_id}`);

            let playerAlreadyConnected = false;
            for (let i = 0; i < rooms[room_id].players.length; i++)
                if (rooms[room_id].players[i].player_name == player_name)
                    playerAlreadyConnected = true;

            if (playerAlreadyConnected) socket.emit("sendRoomData", rooms[room_id]);
            else if (rooms[room_id].game_state == GameStates.WAITING) {
                rooms[room_id].players.push(
                    {
                        player_name: player_name,
                        player_icon: player_icon,
                        is_undercover: undefined,
                        word: undefined,
                        words: [],
                        score: 0,
                        vote: undefined,
                        is_talking: false,
                        just_talked: false,
                    }
                );
                io.to(room_id).emit("sendMessage", `${player_name} has joined the room`);
                io.to(room_id).emit("sendRoomData", rooms[room_id]);
            }
            else {
                console.log(`Player ${player_name} tried to connect to room that is already started`);
                socket.emit("errorMessage", "Game is already started");
            }

            socket.on("disconnect", () => {
                console.log(`A user disconnected from the game ${room_id}`);
                io.to(room_id).emit("sendMessage", "A user disconnected from the room");
            });

            socket.on("confirmVote", (player_id, target_id) => {

                const room = rooms[room_id];
                const players = room.players;

                if (Number.isInteger(player_id) && Number.isInteger(target_id))
                {
                    if (room.game_state == GameStates.VOTING)
                    {
                        if (players[player_id].vote == undefined)
                        {
                            players[player_id].vote = target_id;
                            socket.emit("sendMessage", `Vote confirmed on ${players[target_id].player_name}`);

                            if (isVotingTimeFinished(players))
                            {
                                proceedEndRound(room, room_id);
                            }
                            socket.emit("sendRoomData", room);
                        }
                        else socket.emit("errorMessage", "You have already voted");
                    }
                    else socket.emit("errorMessage", "You can't vote from this game state");
                }
                else socket.emit("errorMessage", "Error : this method accept only two integers parameters");
            });

            socket.on("goToVote", (player_name) => {
                if (rooms[room_id].host == player_name) {
                    if (rooms[room_id].game_state == GameStates.PLAYING || rooms[room_id].game_state == GameStates.FINISHED_PLAYING) {
                        rooms[room_id].game_state = GameStates.VOTING;
                        io.to(room_id).emit("sendMessage", "Let's vote !");
                        io.to(room_id).emit("sendRoomData", rooms[room_id]);
                    }
                    else socket.emit("errorMessage", "You can't go to voting time from this game state");
                }
                else socket.emit("errorMessage", "Only the host player can decide when going to the voting time");
            });

            socket.on("startGame", () => {
                const room = rooms[room_id];
                if (room.game_state == GameStates.WAITING) {
                    if (room.players.length >= 3) {
                        startNewRound(room);

                        console.log(`Game ${room_id} is starting !`);
                        io.to(room_id).emit("sendMessage", "Game is starting !");
                        io.to(room_id).emit("sendRoomData", rooms[room_id]);
                    }
                    else socket.emit("errorMessage", "Il faut au minimum 3 joueurs pour lancer une partie !");
                }
                else socket.emit("errorMessage", "La partie est déjà lancée");
            });

            socket.on("nextTurn", () => {
                const room = rooms[room_id];
                if (room.game_state == GameStates.RESULT)
                {
                    if (room.max_round < GameStates.RESULT)
                    {
                        startNewRound(room);
                        console.log(`Game ${room_id} is starting !`);
                        io.to(room_id).emit("sendMessage", "Game is starting !");
                        io.to(room_id).emit("sendRoomData", rooms[room_id]);
                    }
                    else
                    {
                        console.log(`Game ${room_id} is finished !`);
                        io.to(room_id).emit("sendMessage", "Game is finished !");
                    }
                }
                else socket.emit("errorMessage", "La partie est déjà lancée");
            });

            socket.on("sendWord", (player_name, word) => {

                const room = rooms[room_id];
                if (room.game_state == GameStates.PLAYING) {
                    if (player_name == room.players[room.turn].player_name) {
                        room.players[previousTurn(room.turn, room.players.length)].is_talking = false;
                        room.players[previousTurn(room.turn, room.players.length)].just_talked = false;

                        room.players[room.turn].words.push(word);
                        room.players[room.turn].is_talking = false;
                        room.players[room.turn].just_talked = true;

                        room.turn = nextTurn(room.turn, room.players.length);

                        console.log("words : " + room.players[room.turn].words.length);
                        console.log("turn : " + room.turn);

                        if (room.players[room.turn].words.length < room.max_words) {
                            room.players[room.turn].is_talking = true;
                            io.to(room_id).emit("sendRoomData", room);
                        }
                        else {
                            room.game_state = GameStates.FINISHED_PLAYING;
                            io.to(room_id).emit("sendRoomData", room);
                            io.to(room_id).emit("sendMessage", "Fin de la manche");
                        }
                    }
                    else socket.emit("errorMessage", `Ce n'est pas à votre tour de jouer ! (Tour de : ${room.players[room.turn].player_name})`);
                }
                else socket.emit("errorMessage", "Il est impossible d'envoyer des mots en dehors des sessions de jeu");
            });
        }
        else {
            console.log(`The room ${room_id} does not exists`);
        }
    });

    socket.on("createNewRoom", (host_player) => {
        let room_id = getNewRoomId()
        rooms[room_id] = {
            game_state: GameStates.WAITING,
            host: host_player,
            players: [],
            rewards: {},
            max_round: 10,
            round: 0,
            max_words: 3,
            turn: 0,
        };
        socket.emit("sendNewRoomCreated", room_id);
    });
});

function startNewRound(room)
{
    room.undercover_name = undefined;
    room.game_state = GameStates.PLAYING;
    room.round = room.round + 1;
    const starting_player = Math.floor(Math.random() * room.players.length);
    room.turn = starting_player;

    const words = generateWords();
    const undercover_index = Math.floor(Math.random() * room.players.length);

    for (let i = 0; i < room.players.length; i++)
    {
        const player = room.players[i];

        if (i == starting_player) player.is_talking = true;
        else player.is_talking = false;

        const is_undercover = (i == undercover_index);
        player.is_undercover = is_undercover;
        if (is_undercover) {
            player.word = words.undercover_word;
            room.undercover_name = player.player_name;
        }
        else player.word = words.innocent_words;
    }
}

function proceedEndRound(room, room_id)
{
    const players = room.players;

    room.game_state = GameStates.RESULT;

    let rewards = {};
    for(let i = 0; i < players.length; i++)
    {
        let player = players[i];
        let player_rewards;

        if (!player.is_undercover && players[player.vote].is_undercover) player_rewards = Rewards.SMALL_REWARDS;
        else player_rewards = Rewards.NO_REWARDS;

        player.score += player_rewards;
        rewards[i] = player_rewards;

        console.log(`${player.player_name} voted for ${player.vote} and earned ${player_rewards} points`);
    };

    room.rewards = rewards;
    io.to(room_id).emit("sendMessage", `Time to see the results !`);
    io.to(room_id).emit("sendRoomData", room);
}

function isVotingTimeFinished(players) {
    let is_voting_time_finished = true;
    players.forEach(player => {
        if (player.vote == undefined) is_voting_time_finished = false;
    });
    return is_voting_time_finished;
}

http.listen(PORT, () => {
    console.log(lang);
    console.log(`Le serveur est lancé sur le port ${PORT} !`);
})

function previousTurn(turn, playersAmount) {
    if (turn > 0) return turn - 1;
    else return playersAmount - 1;
}

function nextTurn(turn, playersAmount) {
    if (turn < playersAmount - 1) return turn + 1;
    else return 0;
}

function getNewRoomId() {
    let roomId;
    do {
        roomId = generateRoomId();
    } while (roomId in rooms)
    return roomId
}

function generateRoomId() {
    return 9999;
    //return Math.floor(Math.random() * 9000) + 1000;
}