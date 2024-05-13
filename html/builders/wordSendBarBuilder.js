function send_word_button_clicked()
{
    const word = document.getElementById("send_word_input").value;
    if(word.trim() !== "") send_word(word);
}

function send_word(word)
{
    socket.emit("sendWord", player_name, word);
}

function build_word_send_bar()
{
    const send_word_bar = document.createElement("div");
    send_word_bar.id = "send_word_bar";

    const send_word_input = document.createElement("input");
    send_word_input.className = "text_area";
    send_word_input.id = "send_word_input";

    const send_word_button = document.createElement("div");
    send_word_button.id = "send_word_button";
    send_word_button.className = "button";
    send_word_button.onclick = send_word_button_clicked;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "viewBox", "0 0 100 100");
    svg.setAttributeNS(null, "width", "20");
    svg.setAttributeNS(null, "height", "20");

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttributeNS(null, "points", "0,0 100,50 0,100");
    polygon.setAttributeNS(null, "style", "fill:currentColor;");

    svg.appendChild(polygon);
    send_word_button.appendChild(svg);

    send_word_bar.appendChild(send_word_input);
    send_word_bar.appendChild(send_word_button);

    return send_word_bar;
}

window.build_word_send_bar = build_word_send_bar;