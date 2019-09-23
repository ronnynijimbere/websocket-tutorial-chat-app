const express = require('express');
const socket = require('socket.io');

//App Setup

const app = express();
const server = app.listen(5000, function(){
	console.log('listening to request on port 5000');
});

//Static files

app.use(express.static('public'));

//Socket Setup

const io = socket(server);

io.on('connection', function(socket){
	console.log('socket connection made', socket.id);

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});
});
