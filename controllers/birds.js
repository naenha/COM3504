var bodyParser = require("body-parser");
var req = require('request');
var Bird = require('../models/birds');
var path = require('path');


exports.create = function (req, res) {

    var userData = req.body;

    var bird = new Bird({
        userName: userData.userName,
        birdName: userData.birdName,
        observedAt: userData.observedAt,
        description: userData.description,
<<<<<<< HEAD
        img: req.file.path
=======
        img: path.relative('../public',req.file.path)
>>>>>>> f561c74291a9fda967c38ba2d5ab21d31cdfc2be
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







