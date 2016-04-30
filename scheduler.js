var database = require('../database');

var pollingInterval = 1000;
var currentId;

function markAsProcessed(parameters) {
   database.updateProcessed(currentId)
}

function rotateMotor(row) {
   console.log('Rotating motor');
   //requrie('../motor').rotate(markAsProcessed);
   setTimeout(function () {
      markAsProcessed(row);
   }, 1000);
}

exports.startPolling = function () {
   setInterval(function () {
      database.getQueue(function (rows) {
         if (rows.length === 0) {
            console.log('Nothing to process');
            return;
         } else {
            rotateMotor(rows[0]);
         }
      });
   }, pollingInterval);
};
