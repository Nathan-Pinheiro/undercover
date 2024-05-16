const { GameStates } = require("../utils/gameState");
const { Rewards } = require("../utils/rewards");
const { GameSettings } = require("./gameSettings");
const wordManager = require("../utils/wordManager");

class Room
{
    constructor(host_player)
    {
        this.host = host_player;
        this.players = [];
        this.game_settings = new GameSettings();
        this.round = 0;
        this.game_state = GameStates.WAITING;
        this.turn = 0;
        this.default_word = undefined;
        this.undercover_word = undefined;
        this.rewards = {};
    }

    reset()
    {
        this.game_state = GameStates.WAITING;
        this.rewards = {};
        this.round = 0;
        this.turn = 0;
    }

    is_game_state(state)
    {
        return this.game_state == state
    }

    is_player_already_connected(player_name)
    {
        let player_already_connected = false;

        for (let i = 0; i < this.players.length; i++)
            if (this.players[i].player_name == player_name) player_already_connected = true;

        return player_already_connected;
    }

    is_game_startable()
    {
        return this.players.length >= 3
    }

    player_send_message(word)
    {
        this.players[this.previous_turn()].is_talking = false;
        this.players[this.previous_turn()].just_talked = false;

        this.players[this.turn].words.push(word);
        this.players[this.turn].is_talking = false;
        this.players[this.turn].just_talked = true;

        this.turn = this.next_turn();
    }

    is_able_to_go_to_vote()
    {
        return this.game_state != GameStates.PLAYING && this.game_state != GameStates.FINISHED_PLAYING
    }

    is_voting_time_finished()
    {
        if (this.game_state != GameStates.VOTING)
            throw new Error("This method can only be called during the voting state");

        let is_voting_time_finished = true;

        this.players.forEach(player =>
        {
            if (player.vote == undefined) is_voting_time_finished = false;
        });

        return is_voting_time_finished;
    }

    is_last_round()
    {
        return this.round >= this.game_settings.max_round
    }

    proceed_end_turn()
    {
        let rewards = {};
        for(let i = 0; i < this.players.length; i++)
        {
            let player = this.players[i];
            let player_rewards;

            console.log(player.vote)

            if (!player.is_undercover && this.players[player.vote].is_undercover) player_rewards = Rewards.SMALL_REWARDS;
            else player_rewards = Rewards.NO_REWARDS;

            rewards[i] = player_rewards;
            this.players[i].score = this.players[i].score + player_rewards;

            console.log(`${player.player_name} voted for ${player.vote} and earned ${player_rewards} points`);
            console.log(`${player.player_name} has ${this.players[i].score} points`);
        };

        this.rewards = rewards;
    }

    show_results()
    {
        this.game_state = GameStates.RESULT;
    }

    start_new_round()
    {
        for (var i = 0; i < this.players.length; i++) this.players[i].reset_turn();

        this.undercover_name = undefined;
        this.game_state = GameStates.PLAYING;
        this.round = this.round + 1;

        const starting_player = Math.floor(Math.random() * this.players.length);
        this.turn = starting_player;

        const words = wordManager.generateWords();
        const undercover_index = Math.floor(Math.random() * this.players.length);

        this.undercover_word = words.undercover_word;
        this.default_word = words.innocent_words;

        for (let i = 0; i < this.players.length; i++)
        {
            const player = this.players[i];

            if (i == starting_player) player.is_talking = true;
            else player.is_talking = false;

            const is_undercover = (i == undercover_index);
            player.is_undercover = is_undercover;

            if (is_undercover) player.word = words.undercover_word;
            else player.word = words.innocent_words;
        }
    }

    end_game()
    {
        this.game_state = GameStates.END;
    }

    previous_turn()
    {
        if (this.turn > 0) return this.turn - 1;
        else return this.players.length - 1;
    }

    next_turn()
    {
        if (this.turn < this.players.length - 1) return this.turn + 1;
        else return 0;
    }
}

module.exports = {
    Room,
};