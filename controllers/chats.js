var bodyParser = require("body-parser");
var req = require('request');
var Chat = require('../models/chats');
var path = require('path');


exports.create = function (req, res) {

    var userData = req.body;

    var chat = new Chat({
        userName: userData.userName,
        chat: userData.chat,
        birdId: userData.birdId
    });

    chat.save(function (err, results) {
        if (err)
            //res.status(500).send('Invalid data!');
            res.render('error', { error: err });
        //res.setHeader('Content-Type', 'application/json');
        //res.send(JSON.stringify(chat));
    });
};






