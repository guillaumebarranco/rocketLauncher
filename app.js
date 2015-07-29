var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    res.render('../template/home.ejs', {});
});

app.use(function(req, res, next) {
    res.status('Content-Type', 'text/plain').send(404, 'Page introuvable !');
});

// Démarrage du serveur

var server = app.listen(1818);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

	socket.on('buttonColor', function (color) {
	    socket.broadcast.emit('showColor', color);
	});
});