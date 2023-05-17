var bodyParser = require("body-parser");
var req = require('request');
var Bird = require('../models/birds');
var path = require('path');
const mongoose = require('mongoose');


exports.init = function (io, db) {
    io.sockets.on('connection', function (socket) {
        socket.on('chat', function (userName,birdID, chatText) {
            const chatData = {
                username: userName,
                message: chatText
            };
            socket.join(birdID);
            mongoose.connection.collection('chat').insertOne(chatData, function(err, result) {
                if (err) {
                    console.error('Failed to insert chat data into MongoDB:', err);
                    return;
                }

                console.log('Chat data inserted:', result.ops);
            });
            io.to(birdID).emit('chat', userName, chatText);

        });

        socket.on('disconnect', function () {
            console.log('Someone disconnected');
        });
    });
};


exports.create = function (req, res) {

    var userData = req.body;

    var bird = new Bird({
        userName: userData.userName,
        birdName: userData.birdName,
        observedAt: userData.observedAt,
        description: userData.description,
        img:req.file.path
        //img: path.relative('../public',req.file.path)
    });

    bird.save(function (err, results) {
        if (err) {
            res.render('error', { error: err });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        }
    });

};

exports.list = function(callback) {
    Bird.find({}).sort('-createdAt').exec(function(err, birds) {
        if (err)
            callback(err, null);
        callback(null, birds);
    });
};







