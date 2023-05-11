var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var bird = require('../controllers/birds');
var multer = require('multer');

// storage defines the storage options to be used for file upload with multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
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
  res.render('details');
})

router.get('/', function(req, res, next) {
  const birdList = [
    { time: '2022-03-01 09:00', type: 'Arctic tern', publisher: 'user1' },
    { time: '2022-03-01 10:30', type: 'Avocet', publisher: 'user2' },
    { time: '2022-03-01 11:45', type: 'owl', publisher: 'user3' },
    { time: '2022-03-01 13:15', type: 'bearded tit', publisher: 'user4' },
    { time: '2022-03-01 16:45', type: 'owl', publisher: 'user5' },
  ];

// Sort by newest added
  birdList.sort(function(a, b) {
    const timeA = new Date(a.time);
    const timeB = new Date(b.time);
    return timeB - timeA;
  });
  res.render('index', { birdList: birdList, title: 'Bird Watching List'  });
});


module.exports = router;
