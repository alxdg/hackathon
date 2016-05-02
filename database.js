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
      connection.query('INSERT INTO processed (user) VALUES ("' + data.user + '")', function () {
         callback();
      });
   });
};

exports.isUserQueuedOrProcessed = function (user, callback) {
   connection.query('SELECT * FROM queue WHERE user="' + user + '"', function (err, rows) {
      if (err) {
         throw err;
      }

      if (rows.length === 0) {
         connection.query('SELECT * FROM processed WHERE user="' + user + '"', function (err, rows) {
            if (err) {
               throw err;
            }
            callback(rows.length > 0);
         });
      } else {
         callback(true);
      }
   });
};

exports.updateQueue = function (user, message, callback) {
   connection.query('INSERT INTO queue (user, message) VALUES ("' + user + '", "' + message + '")', function (err, rows) {
      if (err) {
         throw err;
      }
      callback(rows);
   });
};

exports.deleteAllData = function () {
   connection.query('TRUNCATE TABLE queue', function () {
      connection.query('TRUNCATE TABLE processing', function () {

      });
   });
};

exports.closeConnections = function () {
   console.log('closing database conection');
   connection.end();
};
