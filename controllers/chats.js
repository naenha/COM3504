var bodyParser = require("body-parser");
var req = require('request');
var Bird = require('../models/chats');
var path = require('path');


exports.create = function (req, res) {

    var userData = req.body;

    var bird = new Bird({
        userName: userData.userName,
        observedAt: userData.observedAt,
        description: userData.description,
        img: req.file.path
    });

    bird.save(function (err, results) {
        if (err)
            //res.status(500).send('Invalid data!');
            res.render('error', { error: err });
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(bird));
    });
};






