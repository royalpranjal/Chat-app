// make connection to the server
var socket = io.connect('http://localhost:4000'); 

// Retrieving the HTML elements
var output = document.getElementById('output');
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var sendBtn = document.getElementById('send');
var is_typing = document.getElementById('is_typing');

// what happens when we click the send button (also adding a callback here)
sendBtn.addEventListener('click', function(){
	 // emit a message to the server we are connected to 
	 // first parameter is the name of the message & second is the data
	 socket.emit('chat', {
	 	handle: handle.value,
	 	message: message.value
	 });
});

// showing typing as typing when a key is pressed inside input 
message.addEventListener('keypress', function(){
	// emit message to the server
	socket.emit('typing', handle.value);
});

// receive incoming messages
socket.on('chat', function(data){
	// append to whatever is there in the inner HTML of the output div
	output.innerHTML += '<p>' + '<strong>' + data.handle + '</strong>' + ' : ' + data.message + '</p>' + '<hr>';
	// when a message is received, we are assuming that no one is typing
	is_typing.innerHTML = '';
});  


// receiving typing messages
socket.on('typing', function(data){
	is_typing.innerHTML = '<p><em>' + data + ' is typing </em></p>';
});