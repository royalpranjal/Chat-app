// to run, type "node index.js" in the terminal

var express = require('express');
var socket = require('socket.io');
// express app setup
var app = express();

// setting up the server to listen to port number 4000 & also introducing a callback function
var server = app.listen(4000, function(){
	console.log("Server setup & listening on port 4000");
}); 


// static files (part of express) -- specifying what folder to serve to browser
app.use(express.static('public'));

// specifying what server we want to listen to (setting up the socket on the server)
var io = socket(server);

// waiting for "connection"
io.on('connection', function(socket){
	console.log("Web socket connection ", socket.id);

	// what happens when the server receives a chat message
	socket.on('chat', function(data){
		// emit a message to all the sockets with name as chat & message as date
		io.sockets.emit('chat', data);
	});

	// what happens when we receive a typing feedback
	socket.on('typing', function(data){
		// broadcasting to every client except us
		socket.broadcast.emit('typing', data)
	});
});
 