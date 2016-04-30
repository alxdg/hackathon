var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'pi',
  password: 'RaspberryPi123',
  database: 'hackathon'
});
connection.connect();

exports.getQueue = function (callback) {
  connection.query('SELECT user, message, timestamp from queue', function (err, rows, fields) {
    if (err)
      throw err;

    callback(rows);
  });
};




