var database = require('./database');
var motor = require('./motor');
var pauseBeforeNextRotation = 5000;
var pollingInterval = 1000;
var rotating = false;
var i = 0;

function markAsProcessed(row, callback) {
   database.updateProcessed(row, callback);
}

function rotateMotor(row) {
   var motorId = i++ % 2;
   rotating = true;
   require('./sounds').playSound();
   console.log('ROTATING MOTOR ' + motorId);
   if (motorId === 0) {
      motor.rotateMotorOne(function () {
         markAsProcessed(row, function () {
            setTimeout(function () {
               rotating = false;
            }, pauseBeforeNextRotation);
         });
      });
   } else {
      motor.rotateMotorTwo(function () {
         markAsProcessed(row, function () {
            setTimeout(function () {
               rotating = false;
            }, pauseBeforeNextRotation);
         });
      });
   }
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
