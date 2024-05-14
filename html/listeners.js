let selected_player_id = undefined;

function onMouseOverPlayer(player_div)
{
    player_div.classList.add("hovered");
}

function onMouseExitedPlayer(player_div)
{
    player_div.classList.remove("hovered");
}

function onClickPlayer(player_id, players_length)
{
    if (selected_player_id != player_id) selected_player_id = player_id;
    else selected_player_id = undefined;

    for (let i = 0; i < players_length; i++)
    {
        const player_div = getPlayerDiv(i);
        player_div.classList.remove("selected");
        if (i == selected_player_id) player_div.classList.add("selected");
    }
}

function getSelectedPlayerId()
{
    return selected_player_id;
}

window.onMouseOverPlayer = onMouseOverPlayer;
window.onMouseExitedPlayer = onMouseExitedPlayer;
window.onClickPlayer = onClickPlayer;
window.getSelectedPlayerId = getSelectedPlayerId;