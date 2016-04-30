var gulp = require('gulp');
var scp = require('gulp-scp2');
 
gulp.task('default', function() {
  return gulp.src('routes/*.js')
  .pipe(scp({
    host: '10.31.2.29',
    username: 'pi',
    password: 'RaspberryPi123',
    dest: '/home/pi/sandbox/hack-server' 
  }))
  .on('watch', function(err, a) {
    console.log(err);
    console.log(a);
  });
});     