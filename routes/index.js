var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var bird = require('../controllers/birds');
var multer = require('multer');
var Bird = require('../models/birds');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');]
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


/* GET home page. */

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'My Form' });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add a new Character to the DB' });
});

router.post('/add', upload.single('myImg'), function(req, res) {
  console.log(req);
  bird.create(req,res);
});

router.get('/details', function (req, res, next) {
  var id =req.query.id;
  console.log(bird.img)
  Bird.findById(id, function(err, bird) {
    if (err)
      res.render('error', { error: err });
    else
      res.render('details', { bird: bird, title: "details"+bird.id});
  });
})

router.get('/', function(req, res, next) {
  bird.list(function(err, birds){
    if (err)
      res.render('error', { error: err });
    else
      res.render('index', { birdList: birds, title: 'Bird Watching List'  });
  });

});




module.exports = router;
