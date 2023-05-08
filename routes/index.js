var express = require('express');
const res = require("express/lib/response");
var router = express.Router();

/* GET home page. */

router.get('/upload', function (req, res, next) {
  res.render('upload');
})

router.get('/details', function (req, res, next) {
  res.render('details');
})

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Bird Watching List' });
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
  if (!res.headersSent) {
    res.setHeader('Content-Type', 'application/json');
  }
});

module.exports = router;

