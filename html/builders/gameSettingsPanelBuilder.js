function click_validate(socket, player_name, game_settings)
{
    console.log("Upgated game settings")
    socket.emit("updateGameSettings", player_name, game_settings);
    document.getElementById("game_settings_panel").remove();
}

function click_change_roles()
{
    console.log("change roles");
}

function go_back_arrow_clicked()
{
    if(document.getElementById("game_settings_panel")) document.getElementById("game_settings_panel").remove();
}

function build_game_settings_panel(game_settings)
{
    var new_game_settings = game_settings;

    const game_settings_div = document.createElement("div");
    game_settings_div.id = "game_settings_panel";
    game_settings_div.className = "panel";

    const title_bar = document.createElement('span');
    title_bar.className = "go_back_title";

    const back_arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    back_arrow.setAttribute('id', 'back_arrow');
    back_arrow.setAttribute('viewBox', '0 0 24 24');
    back_arrow.setAttribute('width', '24');
    back_arrow.setAttribute('height', '24');
    back_arrow.onclick = go_back_arrow_clicked;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z');

    back_arrow.appendChild(path);

    const title = document.createElement('h3');
    title.setAttribute('id', 'title');
    title.textContent = 'Paramètres';

    title_bar.appendChild(back_arrow);
    title_bar.appendChild(title);

    game_settings_div.appendChild(title_bar);

    const rounds_slider = createSlider("Tours :", 3, 15, new_game_settings.max_round,
        function (event)
        {
            new_game_settings.max_round = event.target.value;
            event.target.previousElementSibling.textContent = event.target.value
        }
    );
    rounds_slider.id = 'rounds_slider'
    rounds_slider.className = 'slider'
    game_settings_div.appendChild(rounds_slider);

    const words_slider = createSlider("Mots :", 1, 5, new_game_settings.max_words,
        function (event)
        {
            new_game_settings.max_words = event.target.value;
            event.target.previousElementSibling.textContent = event.target.value
        }
    );
    words_slider.id = 'words_slider'
    words_slider.className = 'slider'
    game_settings_div.appendChild(words_slider);

    const change_roles_button = document.createElement("div");
    change_roles_button.id = "change_roles_button";
    change_roles_button.className = "button bottom_button";
    change_roles_button.onclick = function () { click_change_roles(); };
    change_roles_button.innerHTML = "<h2>Roles</h2>";

    game_settings_div.appendChild(change_roles_button);

    const validate_button = document.createElement("div");
    validate_button.id = "validate_game_settings_button";
    validate_button.className = "button bottom_button";
    validate_button.onclick = function () { click_validate(socket, player_name, new_game_settings); };
    validate_button.innerHTML = "<h2>Valider</h2>";

    game_settings_div.appendChild(validate_button);

    return game_settings_div;
}

function createSlider(label, min, max, defaultValue, oninput)
{
    const sliderDiv = document.createElement("div");

    const labelElement = document.createElement("h2");
    labelElement.textContent = label;

    const sliderElement = document.createElement("input");
    sliderElement.type = "range";
    sliderElement.min = min;
    sliderElement.max = max;
    sliderElement.value = defaultValue;
    sliderElement.oninput = oninput;

    const valueElement = document.createElement("span");
    valueElement.textContent = defaultValue;

    sliderDiv.appendChild(labelElement);
    sliderDiv.appendChild(valueElement);
    sliderDiv.appendChild(sliderElement);

    return sliderDiv;
}

window.build_game_settings_panel = build_game_settings_panel;
