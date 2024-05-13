class GameSettings
{
    constructor(max_round = 1, max_words = 3, undercover_amount = 1, ignorant_amount = 0)
    {
        this.max_round = max_round;
        this.max_words = max_words;
        this.undercover_amount = undercover_amount;
        this.ignorant_amount = ignorant_amount;
    }
}

module.exports = {
    GameSettings,
};