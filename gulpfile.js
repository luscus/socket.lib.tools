var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var testFiles = './test/**/*.spec.js';
var lintFiles = ['./**/*.js', './**/*.json', '!./node_modules/**/*'];

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'lint', 'test']);

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(lintFiles, ['lint', 'test']);
});

gulp.task('lint', function() {

  return gulp.src(lintFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {

  return gulp.src(testFiles, {read: false})
    .pipe(mocha({
      reporter: 'dot',
      bail: true
    }));
});
