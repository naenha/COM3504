var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var bird = require('../controllers/birds');
var multer = require('multer');
var Bird = require('../models/birds');
var Chat = require('../models/chat');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');

  },
  filename: function (req, file, cb) {
    var original = file.originalname;
    var file_extension = original.split(".");
    // Make the file name the date + the file extension
    filename =  Date.now() + '.' + file_extension[file_extension.length-1];
    cb(null, filename);
  }
});
var upload = multer({ storage: storage });


//retrieving sotred chatting for each sighting
function getChat(req, res, next){
  var id =req.query.id;
  console.log("chat id : " + id);
  Chat.find({birdID: id}, function(err, chat){
    if (err)
    {
        res.send(err);
    }
    res.locals.savedChats = chat;
    console.log("getChat");
    
    next()
  })
};


// getiing bird sighting information
function getBird(req, res, next){
  var id =req.query.id;
  console.log("bird id : " + id);
  Bird.findById(id, function(err, bird) {
    if (err)
      res.render('error', { error: err });
    else
      res.locals.bird = bird;
      console.log("getBird");
      next();
  });

};

function renderData(req, res){

  // if user uploaded photo with url
  if(bird.imgUrl){
    res.render('details2');
  }

  // if user uploaded img file
  else
    res.render('details');
  }




router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add a new Character to the DB' });
});

// upload sighting
router.post('/add', upload.single('myImg'), function(req, res) {
  console.log(req);
  bird.create(req,res);
});


router.get('/details', getBird, getChat, renderData );


// updating bird name 
router.post('/details/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  console.log(req.body);
    bird.update(req,res,id);
});


router.get('/', function(req, res, next) {
  bird.list(function(err, birds){
    if (err)
      res.render('error', { error: err });
    else
      res.render('index', { birdList: birds, title: 'Bird Watching List'  });
  });

});


module.exports = router;