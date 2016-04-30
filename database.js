var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'pi',
   password: 'RaspberryPi123',
   database: 'hackathon'
});
connection.connect();

exports.getQueue = function (callback) {
   connection.query('SELECT id, user, message, timestamp FROM queue', function (err, rows, fields) {
      if (err)
         throw err;
      callback(rows);
   });
};

exports.updateProcessed = function (data, callback) {
   console.log('Deleting from queue %d', data.id);
   connection.query('DELETE FROM queue WHERE id="' + data.id + '"', function (err, rows, fields) {
      if (err)
         throw err;
      console.log('Inserting %d into processed tweets', data.id);
      connection.query('INSERT INTO processed (user) VALUES (' + data.user + ')', function () {
         callback();
      });
   });
};

exports.deleteAllData = function () {
   connection.query('TRUNCATE TABLE queue', function () {
      connection.query('TRUNCATE TABLE processing', function () {

      });
   });
};

process.on('SIGINT', function () {
   console.log('closing database conection');
   connection.end();
   process.exit(1);
});
