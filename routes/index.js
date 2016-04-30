var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'pi',
  password: 'RaspberryPi123',
  database: 'hackathon'
});
connection.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/queue', function (req, res, next) {
  var queue = [];
  connection.query('SELECT user, message, timestamp from queue', function (err, rows, fields) {
    if (err)
      throw err;
    if (rows.length === 0) {
      return;
    } else {
      for (var i = 0; i < rows.length; ++i) {
        console.log(rows[i]);
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

process.on('SIGINT', function () {
  console.log('closing database conection');
  connection.end();
  process.exit(1);
});

module.exports = router;
