const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`New user connected`);


  socket.emit('connectionMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  socket.broadcast.emit('userConnectionMessage', generateMessage('Admin', 'New User joined!'));


  socket.on(`createMessage`, (message) => {
    console.log(`Message: ${message}`);
    io.emit('newMessage', generateMessage(message.from, message.text));

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
