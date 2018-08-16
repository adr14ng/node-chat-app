var socket = io();

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log("No error");
    }
  });
});

socket.on('disconnect', function () {
  console.log(`Disconnected from server`);
});

socket.on('updateUserList', function (users) {
  console.log('userList:', users);
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(locationMessage) {
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
  scrollToBottom();
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
