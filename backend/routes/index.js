const express = require("express");
const fs = require("fs");

function initializeRoutes(app)
{
    app.get("/", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/index.html", "utf-8");
        res.send(indexHTML);
    });

    app.get("/create_game", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/create_game.html", "utf-8");
        res.send(indexHTML);
    });

    app.get("/join_game", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/join_game.html", "utf-8");
        res.send(indexHTML);
    });

    app.get("/game", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/game.html", "utf-8");
        res.send(indexHTML);
    });

    app.use("/css", express.static(__dirname + "/../../css/"));
    app.use("/resources", express.static(__dirname + "/../../resources/"));
    app.use("/html", express.static(__dirname + "/../../html/"));
}

module.exports = {
    initializeRoutes,
};