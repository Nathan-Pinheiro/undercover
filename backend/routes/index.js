const express = require("express");
const fs = require("fs");

function initializeRoutes(app)
{
    const router = express.Router();

    router.get("/", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/index.html", "utf-8");
        res.send(indexHTML);
    });

    router.get("/create_game", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/create_game.html", "utf-8");
        res.send(indexHTML);
    });

    router.get("/join_game", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/join_game.html", "utf-8");
        res.send(indexHTML);
    });

    router.get("/game", (_, res) => {
        const indexHTML = fs.readFileSync(__dirname + "/../../html/game.html", "utf-8");
        res.send(indexHTML);
    });

    app.use("/css", express.static(__dirname + "/../../css/"));
    app.use("/resources", express.static(__dirname + "/../../resources/"));
    app.use("/html", express.static(__dirname + "/../../html/"));

    app.use(router);
}

module.exports = {
    initializeRoutes,
};