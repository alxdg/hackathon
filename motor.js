var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'pi',
  password: 'RaspberryPi123',
  database: 'hackathon'
});
connection.connect();

function rotateMotor() {

}

setInterval(function () {
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

  });
});


