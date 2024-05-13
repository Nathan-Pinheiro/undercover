let player_id = undefined;

function confirmVoteButtonClicked()
{
    if (getSelectedPlayerId() != undefined && player_id != undefined)
    {
        socket.emit("confirmVote", player_id, getSelectedPlayerId());

        const player_div = getPlayerDiv(player_id);
        const colored_backround = player_div.querySelector(".colored-background");

        colored_backround.onmouseenter = undefined;
        colored_backround.onmouseleave = undefined;
        colored_backround.onclick = undefined;
    }
    else console.log("can't vote for nobody");
}

function build_confirm_button(id)
{
    player_id = id

    var confirm_vote_button = document.createElement("div");
    confirm_vote_button.id = "confirm_vote_button";
    confirm_vote_button.className = "button bottom_button";
    confirm_vote_button.onclick = confirmVoteButtonClicked;
    confirm_vote_button.innerHTML = "<h2>Voter</h2>";

    return confirm_vote_button;
}

window.build_confirm_button = build_confirm_button;