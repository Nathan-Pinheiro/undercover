let selected_player_id = undefined;

function onMouseOverPlayer(colored_backround)
{
    colored_backround.classList.add("hovered");
}

function onMouseExitedPlayer(colored_backround)
{
    colored_backround.classList.remove("hovered");
}

function onClickPlayer(player_id, players_length)
{
    if (selected_player_id != player_id) selected_player_id = player_id;
    else selected_player_id = undefined;

    for (let i = 0; i < players_length; i++)
    {
        const player_div = getPlayerDiv(i);
        const colored_background = player_div.querySelector(".colored-background");
        colored_background.classList.remove("selected");
        if (i == selected_player_id) colored_background.classList.add("selected");
    }
}

function getSelectedPlayerId() {
    return selected_player_id;
}

window.onMouseOverPlayer = onMouseOverPlayer;
window.onMouseExitedPlayer = onMouseExitedPlayer;
window.onClickPlayer = onClickPlayer;
window.getSelectedPlayerId = getSelectedPlayerId;