var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/queue', function (req, res, next) {
  var queue = [];
  database.getQueue(function (rows) {
    if (rows.length === 0) {
      return;
    } else {
      for (var i = 0; i < rows.length; ++i) {
        queue.push({
          User: rows[i].user,
          Message: rows[i].message,
          TimeStamp: rows[i].timestamp
        });
      }
    }
    res.json(queue);
  });
});

module.exports = router;
