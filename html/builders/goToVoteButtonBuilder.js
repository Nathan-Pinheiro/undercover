function goToVoteButtonClicked()
{
    const result = window.confirm("Êtes-vous sûr de vouloir passer aux votes ?");
    if (result)
    {
        socket.emit("goToVote", player_name);
    }
}

function build_go_to_vote_button()
{
    var go_to_vote_button = document.createElement("div");
    go_to_vote_button.id = "go_to_vote_button";
    go_to_vote_button.className = "button bottom_button";
    go_to_vote_button.onclick = goToVoteButtonClicked;
    go_to_vote_button.innerHTML = "<h2>Passer aux votes</h2>";

    return go_to_vote_button;
}

window.build_go_to_vote_button = build_go_to_vote_button;