var bodyParser = require("body-parser");
var req = require('request');
var path = require('path');
var mongoose = require('mongoose');

exports.init = function (io, db) {
    io.sockets.on('connection', function (socket) {
        socket.on('chat', function (username,birdID, chatText) {
            const chatData = {
                username: username,
                message: chatText,
                birdID: birdID
            };
            socket.join(birdID);
            mongoose.connection.collection('chats').insertOne(chatData, function(err, result) {
                if (err) {
                    console.error('Failed to insert chat data into MongoDB:', err);
                    return;
                }

                console.log('Chat data inserted:', result.ops);
            });
            io.to(birdID).emit('chat', username, chatText);

        });

        socket.on('disconnect', function () {
            console.log('Someone disconnected');
        });
    });
};





