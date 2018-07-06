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


  io.emit('connectionMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('userConnectionMessage', {
      from: 'Admin',
      text: 'New user joined!',
      createdAt: new Date().getTime()
  });


  socket.on(`createMessage`, (message) => {
    console.log(`Message: ${message}`);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });

  });

  socket.on(`disconnect`, () => {
    console.log(`Disconnected from client`);
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server starting on port: ${port}`);
});
