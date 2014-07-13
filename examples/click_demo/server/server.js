// Server.js
// This file is loaded into memory when the server is started
// and continues running until the server is turned off
// it continuously listens for connections and maintains any
// instance variables
//

var io = require('socket.io').listen(8080);
io.set('log level', 1);

//variable that tracks the total number of clicks receive from clients
var clicks = 0;

//this is a function that is called whenever a new connection is received
//it's only called when the client isn't already connected
io.sockets.on('connection', function (socket){
	//the emit function sends a message to a given client (here referenced
	//with the socket variable). the arguments specify the name of the message
	//and then a data object
    socket.emit('connected', {id:socket.id});
	
	//the on function allows you to add a listener to a specific client that
	//will execute code when it receives a specific message, here the message
	//is "click" and the function increments the total number of clicks and
	//then calls a function to update the click count for all the clients
    socket.on('click', function(arg){
		clicks++;
		sendUpdate();
    });

	//again adding a listener for when a client disconnects
    socket.on('disconnect', function(arg) {
        console.log('disconnect');
    });
	sendUpdate();
});

//update function that sends out the total number of clicks to all the clients
function sendUpdate(){
	//get the total number of clients
    var count = io.sockets.clients().length;

	//io is the name of the socket.io object and sockets is an array
	//of all connected clients, when you call io.sockets.emit it sends
	//a message to all connected clients. here it sends the update message
	//and includes an object that has two variable, clientCount and clickCount
    io.sockets.emit('update', {clientCount:count,clickCount:clicks});
}

