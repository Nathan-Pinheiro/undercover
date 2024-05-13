const Papa = require("papaparse");
const words_database_path = "backend/utils/words.csv";
fs = require("fs");

function getWordsBank()
{
    try
    {
        let csv = fs.readFileSync(words_database_path, "utf-8")
        let csv_json = Papa.parse(csv, {encoding: "utf-8"})
        return csv_json.data;
    }
    catch(e)
    {
        console.error(e);
    }
}

function generateWords()
{
    let bank = getWordsBank();

    const line_index = Math.floor(Math.random() * bank.length);

    const innocent_word_index = Math.floor(Math.random() * 3);
    let undercover_word_index = Math.floor(Math.random() * 2);
    if(innocent_word_index == undercover_word_index) undercover_word_index++;

    const innocent_words = bank[line_index][innocent_word_index];
    const undercover_word = bank[line_index][undercover_word_index]

    return {
        innocent_words: innocent_words,
        undercover_word: undercover_word
    };
}

module.exports = { generateWords };
