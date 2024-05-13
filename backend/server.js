const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");

const PORT = 8080;

const { initializeRoutes } = require("./routes");
const { initializeSockets } = require("./sockets");

initializeRoutes(app);
initializeSockets(io);

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});