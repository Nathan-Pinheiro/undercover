function click_validate(game_settings, new_game_settings)
{
    game_settings = new_game_settings;
    document.getElementById("game_settings_roles_panel").remove();
}

function go_back_arrow_clicked()
{
    document.getElementById("game_settings_roles_panel").remove();
}

function build_roles_panel(game_settings)
{
    const new_game_settings = { ...game_settings}

    const roles_div = document.createElement("div");
    roles_div.id = "game_settings_roles_panel";
    roles_div.className = "panel";

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
    title.textContent = 'Roles';

    title_bar.appendChild(back_arrow);
    title_bar.appendChild(title);

    roles_div.appendChild(title_bar);

    const undercover_info = "Au début du tour, il possède un mot différents des autres joueurs. A lui de le comprendre et de le cacher.";
    const ignorant_info = "Le joueur commence son tour sans mots, son objectif est de ne pas se faire repérer.";

    const undercover_picker = create_role_picker("undercover_picker", "../../resources/undercover.png", undercover_info);
    const ignorant_picker = create_role_picker("ignorant_picker", "../../resources/ignorant.png", ignorant_info);

    roles_div.appendChild(undercover_picker);
    roles_div.appendChild(ignorant_picker);

    const validate_button = document.createElement("div");
    validate_button.id = "validate_game_settings_button";
    validate_button.className = "button bottom_button";
    validate_button.onclick = function () { click_validate(game_settings, new_game_settings); };
    validate_button.innerHTML = "<h2>Valider</h2>";

    roles_div.appendChild(validate_button);

    return roles_div;
}

function on_enter_ignorant_info(ignorant_info_div)
{
    ignorant_info_div.classList.add("hidden");
}

function on_exit_ignorant_info(ignorant_info_div)
{
    ignorant_info_div.classList.remove("hidden");
}

function create_role_picker(id, image_path, role_info)
{
    const undercover_picker = document.createElement('div');
    undercover_picker.id = id;
    undercover_picker.className = "rect role_picker";

    const undercover_left_arrow = document.createElement('div');
    undercover_left_arrow.id = "undercover_left_arrow";
    undercover_left_arrow.className = "rect role_picker_arrow role_picker_left_arrow";

    const left_arrow_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    left_arrow_svg.setAttributeNS(null, "viewBox", "0 0 100 100");
    left_arrow_svg.setAttributeNS(null, "width", "20");
    left_arrow_svg.setAttributeNS(null, "height", "20");

    const left_arrow_polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    left_arrow_polygon.setAttributeNS(null, "points", "0,0 100,50 0,100");
    left_arrow_polygon.setAttributeNS(null, "style", "fill:currentColor;");

    left_arrow_svg.appendChild(left_arrow_polygon);
    undercover_left_arrow.appendChild(left_arrow_svg);

    undercover_picker.appendChild(undercover_left_arrow)

    const undercover_right_arrow = document.createElement('div');
    undercover_right_arrow.id = "undercover_right_arrow";
    undercover_right_arrow.className = "rect role_picker_arrow role_picker_right_arrow";

    const right_arrow_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    right_arrow_svg.setAttributeNS(null, "viewBox", "0 0 100 100");
    right_arrow_svg.setAttributeNS(null, "width", "20");
    right_arrow_svg.setAttributeNS(null, "height", "20");

    const right_arrow_polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    right_arrow_polygon.setAttributeNS(null, "points", "0,0 100,50 0,100");
    right_arrow_polygon.setAttributeNS(null, "style", "fill:currentColor;");

    right_arrow_svg.appendChild(right_arrow_polygon);
    undercover_right_arrow.appendChild(right_arrow_svg);

    undercover_picker.appendChild(undercover_right_arrow)

    const undercover_info_div = document.createElement('div');
    undercover_info_div.className = "rect role_picker_info_div hidden";

    undercover_picker.appendChild(undercover_info_div)

    const undercover_info_text = document.createElement('h3');
    undercover_info_text.textContent = role_info;
    undercover_info_text.className = "role_picker_info_text";

    undercover_info_div.appendChild(undercover_info_text)

    const undercover_info = document.createElement("div");
    undercover_info.id = "undercover_info";
    undercover_info.className = "rect role_picker_info";
    undercover_info.onmouseenter = function () { undercover_info_div.classList.remove("hidden"); }
    undercover_info.onmouseleave = function () { undercover_info_div.classList.add("hidden"); }

    const undercover_info_label = document.createElement("h2");
    undercover_info_label.id = "undercover_info_label";
    undercover_info_label.textContent = "i";

    undercover_info.appendChild(undercover_info_label)

    undercover_picker.appendChild(undercover_info)

    const undercover_image = new Image();
    undercover_image.id = "undercover_image";
    undercover_image.src = image_path;
    undercover_image.alt = `undercover image`;

    undercover_picker.appendChild(undercover_image)

    const undercover_amount = document.createElement('h2');
    undercover_amount.id = "undercover_amount";

    return undercover_picker
}

/*
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
*/

window.build_roles_panel = build_roles_panel;
