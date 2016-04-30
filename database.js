var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'pi',
   password: 'RaspberryPi123',
   database: 'hackathon'
});
connection.connect();

exports.getQueue = function (callback) {
   connection.query('SELECT user, message, timestamp FROM queue', function (err, rows, fields) {
      if (err)
         throw err;
      callback(rows);
   });
};

exports.updateProcessed = function (data) {
   connection.query('DELETE FROM queue WHERE id="' + data.id + '"', function (err, rows, fields) {
      if (err)
         throw err;
      connection.query('INSERT INTO processed (user) VALUES (' + data.user + ')');
   });
};

process.on('SIGINT', function () {
   console.log('closing database conection');
   connection.end();
   process.exit(1);
});
