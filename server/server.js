var io = require('socket.io').listen(8080);
io.set('log level', 1);

var clicks = 0;

io.sockets.on('connection', function (socket){
	//called when there is a new connection
    socket.emit('connected', {id:socket.id});
    socket.on('click', function(arg){
		clicks++;
		sendUpdate();
    });
    socket.on('disconnect', function(arg) {
        console.log('disconnect');
        setTimeout(function(){sendUpdate();},500);
    });
	sendUpdate();
});

function sendUpdate(){
    //use count modifier to account for disconnects and connects
    //before the server updates the connected array
    var c = io.sockets.clients();
    var count = c.length-((typeof disconnect === "undefined")?0:1);
    io.sockets.emit('update', {clientCount:count,clickCount:clicks});
}
