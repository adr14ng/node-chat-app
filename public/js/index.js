var socket = io();

socket.on(`connect`, function () {
  console.log(`connected to server`);
});

socket.on(`disconnect`, function () {
  console.log(`Disconnected from server`);
});

socket.on(`newMessage`, function (message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on(`newLocationMessage`, function(locationMessage) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${locationMessage.from}: `);
  a.attr('href', locationMessage.url);
  li.append(a);
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

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Gelocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(e) {
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send location');
  });
});
