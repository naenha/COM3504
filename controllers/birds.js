var bodyParser = require("body-parser");
var req = require('request');
var Bird = require('../models/birds');
var path = require('path');

function isEmpty(str){
		
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
}


exports.create = function (req, res) {

    var userData = req.body;
    var url = userData.imgUrl;

    if ( isEmpty(url)) {
        var bird = new Bird({
            userName: userData.userName,
            birdName: userData.birdName,
            observedAt: userData.observedAt,
            description: userData.description,
            //imgUrl: userData.imgUrl,
            img: req.file.path,
            latDisplay: userData.latDisplay,
            lngDisplay: userData.lngDisplay,
        });

    } else {
        var bird = new Bird({
            userName: userData.userName,
            birdName: userData.birdName,
            observedAt: userData.observedAt,
            description: userData.description,
            imgUrl: userData.imgUrl,
            //img: req.file.path,
            latDisplay: userData.latDisplay,
            lngDisplay: userData.lngDisplay,
        });

    }

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






