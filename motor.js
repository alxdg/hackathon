var gpio = require('pi-gpio');

var motorOnePulsePin = 16;    // header pin 16 = GPIO port 23
var motorTwoPulsePin = 37;    // header pin 16 = GPIO port 26
var motorEnablePin = 18;   //Header pin 18 GIIO port 24
var intervalTime = 50;
var onTime = 10000;        //THIS CONTROLS HOW LONG THE STEPPER MOTOR ROTATES

//Open port to enable motors
gpio.open(motorEnablePin, 'output', function (err) {
   if (err) {
      console.log('Enable pin already opened');
   }
});

//Open port for motor 1
gpio.open(motorOnePulsePin, 'output', function (err) {
   if (err) {
      console.log('Pulse pin already opened');
   }
});

//Open port for motor 2
gpio.open(motorTwoPulsePin, 'output', function (err) {
   if (err) {
      console.log('Pulse pin already opened');
   }
});

exports.enable = function () {
   console.log('Enabling the stepper motor');
   gpio.write(motorEnablePin, 0, function () {});
};

exports.disable = function () {
   console.log('Disable the stepper motor');
   gpio.write(motorEnablePin, 1, function () {});
};

exports.rotateOneTick = function () {
   gpio.write(motorOnePulsePin, 1, function () { // toggle pin between high (1) and low (0)
      gpio.write(motorOnePulsePin, 0);
   });
};

function rotate(motor, callback) {
   var intervalId;
   var durationId;

   //Drive EN pin on the drive low to enable control 
   console.log('Enabling the stepper motor');
   gpio.write(motorEnablePin, 0);

   //Generate pulses
   console.log('GPIO pin %d is open. toggling pin every %s mS for 10s', motor, intervalTime);
   intervalId = setInterval(function () {
      gpio.write(motor, 1, function () { // toggle pin between high (1) and low (0)
         setTimeout(function () {
            gpio.write(motor, 0);
         }, 10);
      });
   }, intervalTime);

// Shut down
   durationId = setTimeout(function () {
      clearInterval(intervalId);
      clearTimeout(durationId);

      //Set EN to HI and stop pulsing
      gpio.write(motorEnablePin, 1, function () {
         gpio.write(motor, 0, function () { // turn off pin 16
            callback();
         });
      });
   }, onTime);
}
;

exports.rotateMotorOne = function (callback) {
   rotate(motorOnePulsePin, callback);
};

exports.rotateMotorTwo = function (callback) {
   rotate(motorTwoPulsePin, callback);
};

exports.closePorts = function () {
   console.log('Closing motor ports');
   gpio.close(motorEnablePin);
   gpio.close(motorOnePulsePin);
   gpio.close(motorTwoPulsePin);
};



