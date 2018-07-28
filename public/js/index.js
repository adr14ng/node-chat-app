var socket = io();

socket.on(`connect`, function () {
  console.log(`connected to server`);
});

socket.on(`disconnect`, function () {
  console.log(`Disconnected from server`);
});

socket.on(`newMessage`, function (message) {
  console.log("Message:", message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.on(`connectionMessage`, function (message) {
//   console.log("Message:", message);
// });
//
// socket.on(`userConnectionMessage`, function (message) {
//   console.log("Message:", message);
// });
// 
// socket.emit('createMessage', {from: 'Frank', text: 'Hi!'}, function(data) {
//   console.log('Got it!', data);
// });

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
