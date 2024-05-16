function click_next_turn_button(socket)
{
    socket.emit("nextTurn");
}

function build_next_turn_button(socket)
{
    var next_turn_button = document.createElement("div");
    next_turn_button.id = "next_turn_button";
    next_turn_button.className = "button bottom_button";
    next_turn_button.onclick = function() { click_next_turn_button(socket); };
    next_turn_button.innerHTML = "<h2>Next turn</h2>";

    return next_turn_button
}

window.build_next_turn_button = build_next_turn_button;