var Sound = require('node-aplay');
var files = ['roll.wav', 'getup.wav', 'ball.wav'];

exports.playSound = function () {
   var fileIndex = parseInt(Math.random() * files.length);
   new Sound('sounds/' + files[fileIndex]).play();
};
