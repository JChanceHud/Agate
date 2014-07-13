var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');

app.listen(8080);

function handler(req, res) {
    // Handler for a connection that serves the HTML document for the client and initializes a counter
    var clientFileName = '/webserve_client.html'
    fs.readFile(__dirname + clientFileName, // Get the client html file
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on('connection', function (socket) {
    console.log(socket.id);
    socket.counter = 1;
    socket.emit('news', {news: 'world'}); // Sends initial message to the client
    socket.on('echo', function(data) {
        // Perform some arbitrary tasks
        if (socket.counter <= 50) {
            data.back = socket.counter;
            socket.counter++;
            setTimeout(function() {socket.emit('news', {news: data.back})}, 2000);
        }
    });
    socket.on('disconnect', function() {console.log(socket.id + ' out.');});
});
