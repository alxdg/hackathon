var Sound = require('node-aplay');
var files = ['roll', 'getup', 'ball', 'downinfront', 'freebies', 'frontrow', '8', '9', '10', '11'];
var index = 0;

exports.playSound = function () {
   var fileIndex = index++ % files.length;
   new Sound('sounds/' + files[fileIndex] + '.wav').play();
};
