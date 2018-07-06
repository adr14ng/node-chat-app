var socket = io();

socket.on(`connect`, function () {
  console.log(`connected to server`);
});

socket.on(`disconnect`, function () {
  console.log(`Disconnected from server`);
});

socket.on(`newMessage`, function (message) {
  console.log("Message:", message);
});

socket.on(`connectionMessage`, function (message) {
  console.log("Message:", message);
});

socket.on(`userConnectionMessage`, function (message) {
  console.log("Message:", message);
});
