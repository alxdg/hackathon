var gulp = require('gulp');
var scp = require('gulp-scp2');

gulp.task('default', function () {
   return gulp.src(['**/*', '!node_modules/**/*', '!nbproject/**/*'])
           .pipe(scp({
              host: '10.31.5.200',
              username: 'pi',
              password: 'RaspberryPi123',
              dest: '/home/pi/sandbox/hackathon',
              watch: function (client) {
                 client.on('write', function (o) {
                    console.log('write %s', o.destination);
                 });
              }
           }));
});