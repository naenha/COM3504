var bodyParser = require("body-parser");
var req = require('request');
var path = require('path');
var mongoose = require('mongoose');
var Chat = require('../models/chats');

exports.init = function (io, db) {
    io.sockets.on('connection', function (socket) {

        socket.on('chat', function (username,birdId, chatText) {
            var now = new Date()
            const chatData = {
                createdAt: now,
                username: username,
                message: chatText,
                birdId: birdId
            };

            socket.join(birdId);
            mongoose.connection.collection('chats').insertOne(chatData, function(err, result) {
                if (err) {
                    console.error('Failed to insert chat data into MongoDB:', err);
                    return;
                }

                console.log('Chat data inserted:', result.ops);
            });
            io.to(birdId).emit('chat', username, chatText);

        });

        socket.on('disconnect', function () {
            console.log('Someone disconnected');
        });
    });
};





