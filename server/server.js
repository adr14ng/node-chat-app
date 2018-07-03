const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`New user connected`);

  socket.emit(`newEmail`, {
    from: 'adrian@go.com',
    text: 'Cornholio',
    createdAt: 123
  });

  socket.emit(`newMessage`, {
    from: 'Adrian',
    text: 'wya?',
    createdAt: 123
  });

  socket.on(`createEmail`, (newEmail) => {
    console.log(`createEmail`, newEmail);
  });

  socket.on(`disconnect`, () => {
    console.log(`Disconnected from client`);
  });

  socket.on(`createMessage`, (message) => {
    console.log(`From: ${message.from}`);
    console.log(`text: ${message.text}`);
  })
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server starting on port: ${port}`);
});
