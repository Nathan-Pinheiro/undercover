class Player
{
    constructor(player_name, player_icon)
    {
        this.player_name = player_name;
        this.player_icon = player_icon;
        this.is_undercover = undefined;
        this.word = undefined;
        this.words = [];
        this.score = 0;
        this.vote = undefined;
        this.is_talking = false;
        this.just_talked = false;
    }

    reset_turn()
    {
        this.word = undefined;
        this.words = [];
        this.vote = undefined;
        this.is_talking = false;
        this.just_talked = false;
    }
}

module.exports = {
    Player,
};