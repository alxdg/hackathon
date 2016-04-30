var database = require('./database');

var pollingInterval = 1000;
var rotating = false;

function markAsProcessed(row, callback) {
   database.updateProcessed(row, callback);
}

function rotateMotor(row) {
   rotating = true;
   console.log('Rotating motor');
   //requrie('../motor').rotate(markAsProcessed);
   setTimeout(function () {
      markAsProcessed(row, function () {
         rotating = false;
      });
   }, 6000);
}

exports.startPolling = function () {
   setInterval(function () {
      if (!rotating) {
         database.getQueue(function (rows) {
            if (rows.length === 0) {
               console.log('Nothing to process');
               return;
            } else {
               console.log(rows[0]);
               rotateMotor(rows[0]);
            }
         });
      } else {
         console.log('Not polling database motor is rotating');
      }
   }, pollingInterval);
};
