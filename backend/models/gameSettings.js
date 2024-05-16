class GameSettings
{
    constructor(max_round = 3, max_words = 3, undercover_amount = 1, ignorant_amount = 0, show_undercover_icon = true)
    {
        this.max_round = max_round;
        this.max_words = max_words;
        this.undercover_amount = undercover_amount;
        this.ignorant_amount = ignorant_amount;
        this.show_undercover_icon = show_undercover_icon;
    }

    copy()
    {
        return new GameSettings(this.max_round, this.max_words, this.undercover_amount, this.ignorant_amount, this.show_undercover_icon);
    }
}

module.exports = {
    GameSettings,
};