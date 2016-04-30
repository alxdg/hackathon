var gpio = require("pi-gpio");
var motor = require('./motor');
var pushButtonPin = 22;
var intervalId;

exports.startPolling = function () {
   gpio.open(pushButtonPin, "in", function (err) {
      if (err) {
         console.log('Push button pin already opened');
      }
      var mem = null;
      intervalId = setInterval(function () {
         gpio.read(pushButtonPin, function (err, value) { // toggle pin between high (1) and low (0)
            if (mem !== value) {
               if (value === 0) {
                  console.log('Push button pressed!!');
                  motor.enable();
               } else {
                  motor.disable();
               }
            }
            if (value === 0) {
               motor.rotateOneTick();
            }
            mem = value;
         });
      }, 50);
   });
};

exports.closePort = function () {
   console.log('Closing push button port');
   clearInterval(intervalId);
   gpio.close(pushButtonPin);
};
