function click_start_button(socket)
{
    socket.emit("startGame");
}

function click_game_settings_button(game_settings)
{
    document.body.append(build_game_settings_panel(game_settings))
}

function build_host_bar(socket, game_settings)
{
    var host_bar_div = document.createElement("div");
    host_bar_div.id = "host_bar";

    var start_button_div = document.createElement("div");
    start_button_div.id = "start_button";
    start_button_div.className = "button";
    start_button_div.onclick = function() { click_start_button(socket); };
    start_button_div.innerHTML = "<h1>Start</h1>";

    var config_button_div = document.createElement("div");
    config_button_div.id = "config_button";
    config_button_div.className = "button m-0 p-0";
    config_button_div.onclick = function() { click_game_settings_button(game_settings); };

    var img_element = document.createElement("img");
    img_element.src = "../resources/option.png";
    img_element.alt = "Options";
    img_element.id = "option";

    config_button_div.appendChild(img_element);

    host_bar_div.appendChild(start_button_div);
    host_bar_div.appendChild(config_button_div);

    return host_bar_div;
}

window.build_host_bar = build_host_bar;