const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "public")));

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const socket = require("socket.io");
const serverSocket = socket(server);

serverSocket.on("connection", (socket) => {
  console.log(`Connection from client ${socket.id}`);

  setInterval(() => {
    const time = new Date().toLocaleString();
    socket.emit("time-change", time);
  }, 1000);

  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });

  socket.on("join-room", (room, cb) => {
    console.log(room);
    socket.join(room);
    cb(`Joined ${room}`);
  });
});
