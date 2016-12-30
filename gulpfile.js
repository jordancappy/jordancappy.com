var gulp = require('gulp');
var stylus = require('gulp-stylus');

// stylus css transpiling
gulp.task('styles', function () {
  return gulp.src('./public/css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/stylesheets'));
});
gulp.task('styles-watch', function() {
  gulp.watch('./public/css/*.styl', ['styles']);
});

gulp.task('default', ['styles','styles-watch'])
gulp.task('build', ['styles']);