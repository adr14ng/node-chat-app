var socket = io();

socket.on(`connect`, function () {
  console.log(`connected to server`);
});

socket.on(`disconnect`, function () {
  console.log(`Disconnected from server`);
});

socket.on(`newMessage`, function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on(`newLocationMessage`, function(locationMessage) {
  var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: locationMessage.url,
    from: locationMessage.from,
    createdAt: formattedTime
  });

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${locationMessage.from} ${formattedTime}: `);
  // a.attr('href', locationMessage.url);
  // li.append(a);
  jQuery('#messages').append(html);
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
