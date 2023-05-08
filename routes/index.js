var express = require('express');
var router = express.Router();
const birdsController = require('../controllers/birds');

/* GET home page. */

router.get('/upload', function (req, res, next) {
  res.render('upload');
})

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
  res.render('index', { birdList: birdList });
});







const multer = require('multer');
const { uploadBird } = require('../controllers/birds');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('birdPhoto'), uploadBird);








module.exports = router;
