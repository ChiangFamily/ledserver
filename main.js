"use strict";


// Web server (to configure the web server open "webServer.js")
var ip   = undefined;
var port = 8081;
var server = require('./webServer').start(ip, port);

// Web sockets (to configure the webSocket server open "socketServer.js")
var io = require('./socketServer').start(server);

// Firmata
var serialPort = 'com8';
var board = require('./firmataConnector').start(serialPort);


// Arduino is connected
board.on('connection', function () {
    
    // Set pin 13 to output
    board.pinMode(13, board.OUTPUT);
    
    // WebSocket connection handler
    io.sockets.on('connection', function (socket) {
        
        console.log('client connected: '+ socket.id);
        board.digitalWrite(13, board.HIGH);
        
        socket.on('disconnect', function () {
            
            console.log('client disconnected: '+ socket.id);
            board.digitalWrite(13, board.LOW);
        });
    });
});
                     