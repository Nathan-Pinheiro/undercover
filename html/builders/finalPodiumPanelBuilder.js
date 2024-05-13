function click_next_turn_button(socket) {
    console.log("Launch a new game")
    socket.emit("restartGame");
}

function build_host_winners_panel(socket, winners)
{
    const rewards_div = build_winners_panel(winners);

    var next_turn_button = document.createElement("div");
    next_turn_button.id = "next_turn_button";
    next_turn_button.className = "button bottom_button";
    next_turn_button.onclick = function () { click_next_turn_button(socket); };
    next_turn_button.innerHTML = "<h1>Rejouer</h1>";

    rewards_div.appendChild(next_turn_button);

    return rewards_div;
}

function build_winners_panel(winners)
{

    if(winners.length < 3) throw new Error("The winners must be at least 3");

    const winners_div = document.createElement("div");
    winners_div.id = "winners_panel";
    winners_div.className = "panel";

    const winners_title = document.createElement("h2");
    winners_title.textContent = "Winners";
    winners_title.className = "winner_title";
    winners_div.appendChild(winners_title);

    const medal_images = ["./resources/1st.png", "./resources/2nd.png", "./resources/3rd.png"];

    for (let i = 0; i < winners.length && i < 3; i++)
    {
        const winner = winners[i];
        const place = i + 1;

        const winner_div = document.createElement("div");
        winner_div.className = `winner-item winner-${place}`;

        const player_icon_container = document.createElement("div");
        player_icon_container.className = "player-icon-container";

        const player_icon_img = new Image();
        player_icon_img.src = winner.player_icon;
        player_icon_img.alt = `Player Icon - ${winner.player_name}`;
        player_icon_img.className = "podium-player-icon";
        player_icon_container.appendChild(player_icon_img);

        const medal_img = new Image();
        medal_img.src = medal_images[i];
        medal_img.alt = `${place}nd Place`;
        medal_img.className = "podium-medail";
        player_icon_container.appendChild(medal_img);

        winner_div.appendChild(player_icon_container);

        const name_h2 = document.createElement("h2");
        name_h2.textContent = winner.player_name;
        name_h2.className = "podium-player-name";
        winner_div.appendChild(name_h2);

        const score_h4 = document.createElement("h4");
        score_h4.textContent = `${winner.score} pts`;
        score_h4.className = "podium-player-score";
        winner_div.appendChild(score_h4);

        winners_div.appendChild(winner_div);
    }

    return winners_div;
}

window.build_winners_panel = build_winners_panel;
window.build_host_winners_panel = build_host_winners_panel;
