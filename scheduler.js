var database = require('./database');
var pauseBeforeNextRotation = 5000;
var pollingInterval = 1000;
var rotating = false;

function markAsProcessed(row, callback) {
   database.updateProcessed(row, callback);
}

function rotateMotor(row) {
   rotating = true;
   console.log('Rotating motor');
   require('./sounds').playSound();
   require('./motor').rotate(function () {
      markAsProcessed(row, function () {
         setTimeout(function () {
            rotating = false;
         }, pauseBeforeNextRotation);
      });
   });
}

exports.startPolling = function () {
   setInterval(function () {
      if (!rotating) {
         database.getQueue(function (rows) {
            if (rows.length === 0) {
               console.log('The queue is empty, nothing to process');
               return;
            } else {
               rotateMotor(rows[0]);
            }
         });
      } else {
         console.log('Not polling database motor is rotating');
      }
   }, pollingInterval);
};
