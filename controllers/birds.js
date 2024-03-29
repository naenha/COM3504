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
        img: req.file.path,
        latDisplay: userData.latDisplay,
        lngDisplay: userData.lngDisplay,
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


exports.update = function(req, res,id) {
    var newname = req.body.birdName;
    Bird.findByIdAndUpdate(id, { birdName: newname },
        function (err, newname) {
            if (err){
                  console.log(err)
                }
            else{
                console.log("Updated User : ", newname);
                res.setHeader('Content-Type', 'application/json');
                res.redirect('/');
            }
        });
};






