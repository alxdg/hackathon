var gpio = require('pi-gpio');

var motorPulsePin = 16;    // header pin 16 = GPIO port 23
var motorEnablePin = 18;   //Header pin 18 GIIO port 24
var intervalTime = 50;
var onTime = 10000;        //THIS CONTROLS HOW LONG THE STEPPER MOTOR ROTATES

exports.rotate = function (callback) {
   var intervalId;
   var durationId;

   //Drive EN pin on the drive low to enable control 
   gpio.open(motorEnablePin, 'output', function () {
      console.log('Enabling the stepper motor');
      gpio.write(motorEnablePin, 0);
   });

   //Generate pulses
   gpio.open(motorPulsePin, "output", function (err) {
      console.log('GPIO pin %d is open. toggling pin every %s mS for 10s', motorPulsePin, intervalTime);
      intervalId = setInterval(function () {
         gpio.write(motorPulsePin, 1, function () { // toggle pin between high (1) and low (0)
            gpio.write(motorPulsePin, 0);
         });
      }, intervalTime);
   });

// Shut down
   durationId = setTimeout(function () {
      clearInterval(intervalId);
      clearTimeout(durationId);

      //Set EN to HI and stop pulsing
      gpio.write(motorEnablePin, 1, function () {
         gpio.close(motorEnablePin);
         gpio.write(motorPulsePin, 0, function () { // turn off pin 16
            gpio.close(motorPulsePin); // then Close pin 16
            callback();
         });
      });
   }, onTime);
};




