function click_next_turn_button(socket)
{
    console.log("clicked next turn")
    socket.emit("nextTurn");
}

function build_host_reward_panel(socket, rewards, players_data) {

    const rewards_div = build_reward_panel(rewards, players_data);

    var next_turn_button = document.createElement("div");
    next_turn_button.id = "next_turn_button";
    next_turn_button.className = "button bottom_button";
    next_turn_button.onclick = function() { click_next_turn_button(socket); };
    next_turn_button.innerHTML = "<h2>Next turn</h2>";

    rewards_div.appendChild(next_turn_button)

    return rewards_div;
}

function build_reward_panel(rewards, players_data) {

    var rewards_div = document.createElement("div");
    rewards_div.id = "reward_panel";
    rewards_div.className = "row d-flex align-items-center justify-content-center m-0 p-0";

    var rewards_title = document.createElement("h2");
    rewards_title.textContent = "Résultats";

    rewards_div.appendChild(rewards_title)

    const rewards_players = {};

    for (const [player, reward] of Object.entries(rewards))
    {
        if (rewards_players[reward] == undefined) rewards_players[reward] = [player];
        else rewards_players[reward].push(player);
    }

    var keys_sorted = Object.keys(rewards_players);
    keys_sorted.sort().reverse();

    console.log(keys_sorted)

    for (var i = 0; i < keys_sorted.length; i++)
    {
        var reward = keys_sorted[i];
        var player_ids = rewards_players[reward];

        console.log(player_ids)
        console.log(reward)

        var reward_h4 = document.createElement("h4");
        reward_h4.textContent = " + " + reward;

        rewards_div.appendChild(reward_h4);

        for (var j = 0; j < player_ids.length; j++)
        {
            console.log(player_ids[j])
            const player = players_data[player_ids[j]];
            console.log(player)

            var player_h2 = document.createElement("h4");
            player_h2.textContent = player.player_name + " : " + player.score;

            rewards_div.appendChild(player_h2);
        }
    }

    return rewards_div;
}

window.build_reward_panel = build_reward_panel;
window.build_host_reward_panel = build_host_reward_panel;