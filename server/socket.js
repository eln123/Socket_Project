function socketFunc(serverSocket) {
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
}

module.exports = { socketFunc };
