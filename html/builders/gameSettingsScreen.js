function click_validate(socket, player_name, game_settings) {
    console.log("Upgated game settings")
    socket.emit("updateGameSettings", player_name, game_settings);
    document.getElementById("game_settings_panel").remove();
}

function click_plus_imposter(room, game_settings) {
    if(game_settings.undercover_amount < 2 && room.players.length >= 5) game_settings.ignorant_amount++;
}

function click_minus_imposter(game_settings) {
    if(game_settings.undercover_amount > 1) game_settings.ignorant_amount++;
}

function click_plus_ignorant(room, game_settings) {
    if(game_settings.ignorant_amount < 1 && room.players.length >= 3) game_settings.ignorant_amount++;
}

function click_minus_ignorant(game_settings) {
    if(game_settings.ignorant_amount > 0 && room.players.length >= 3) game_settings.ignorant_amount--;
}

function build_game_settings_panel(player_name, game_settings)
{
    var new_game_settings = game_settings;

    const game_settings_div = document.createElement("div");
    game_settings_div.id = "game_settings_panel";
    game_settings_div.className = "panel";

    const validate_button = document.createElement("div");
    validate_button.id = "validate_game_settings_button";
    validate_button.className = "btn btn-sm btn-light m-2 p-2";
    validate_button.onclick = function () { click_validate(socket, player_name, new_game_settings); };
    validate_button.innerHTML = "<h6>Valider</h6>";

    const imposter = new Image();
    imposter.id = "imposter_settings_image"
    imposter.src = "./resources/imposter.png";
    validate_button.onclick = function () { click_validate(socket, player_name, new_game_settings); };
    game_settings_div.appendChild(imposter);

    const imposter_counter = document.createElement("h2");;
    imposter_counter.id = "imposter_counter"
    imposter_counter.textContent = 0;
    validate_button.onclick = function () { click_validate(socket, player_name, new_game_settings); };
    game_settings_div.appendChild(imposter_counter);

    const imposter_plus_button = new Image();
    imposter_plus_button.id = "imposter_plus_button"
    imposter_plus_button.src = "./resources/signe_plus.png";
    game_settings_div.appendChild(imposter_plus_button);

    const imposter_minus_button = new Image();
    imposter_minus_button.id = "imposter_minus_button"
    imposter_minus_button.src = "./resources/signe_moins.png";
    game_settings_div.appendChild(imposter_minus_button);

    const ignorant = new Image();
    ignorant.id = "ignorant_settings_image"
    ignorant.src = "./resources/ignorant.png";
    game_settings_div.appendChild(ignorant);

    const ignorant_counter = document.createElement("h2");;
    ignorant_counter.id = "ignorant_counter"
    ignorant_counter.textContent = 0;
    game_settings_div.appendChild(ignorant_counter);

    const ignorant_plus_button = new Image();
    ignorant_plus_button.id = "ignorant_plus_button"
    ignorant_plus_button.src = "./resources/signe_plus.png";
    game_settings_div.appendChild(ignorant_plus_button);

    const ignorant_minus_button = new Image();
    ignorant_minus_button.id = "ignorant_minus_button"
    ignorant_minus_button.src = "./resources/signe_moins.png";
    game_settings_div.appendChild(ignorant_minus_button);

    game_settings_div.appendChild(validate_button);

    return game_settings_div;
}

window.build_game_settings_panel = build_game_settings_panel;
