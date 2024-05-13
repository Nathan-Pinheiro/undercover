const express = require("express");
const app = express();
const http = require("http").Server(app);
const server = app.listen(8810);
const io = require('socket.io').listen(server);

const port = process.env.PORT || 8080;

const fs = require("fs");

const { initializeRoutes } = require("./routes");
const { initializeSockets } = require("./sockets");

initializeRoutes(app);
initializeSockets(io);

http.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});