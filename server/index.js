const express = require("express");
const app = express();
const path = require("path");
const socket = require("socket.io");

const { socketFunc } = require("./socket");
const morgan = require("morgan");

app.use(express.static(path.join(__dirname, "..", "public")));

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
// app.use("/auth", require("./auth"));
// app.use("/api", require("./api"));

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const serverSocket = socket(server);
socketFunc(serverSocket);

module.exports = { app, server };
