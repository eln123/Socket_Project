import socket from "socket.io-client";

const clientSocket = socket(window.location.origin);
//
const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");
////////////

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;
  displayMessage(message);
  clientSocket.emit("send-message", message, room);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  clientSocket.emit("join-room", room, displayMessage);
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}

/////////////
clientSocket.on("connect", () => {
  console.log("Connected to server");
  const div = document.getElementById("id");
  div.textContent = `The id for this client is: ${clientSocket.id}`;

  const timeHeader = document.getElementById("time");

  clientSocket.on("time-change", (time) => {
    timeHeader.innerText = time;
  });
  clientSocket.on("receive-message", (message, room) => {
    displayMessage(message);
    // this callback function can also
    // be used to show when the message is sent
  });
});
