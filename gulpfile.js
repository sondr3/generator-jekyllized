'use strict';

var path = require('path');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var coveralls = require('gulp-coveralls');

var handleErr = function(err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task('check', function() {
  return gulp.src([
    'test/*.js',
    'app/index.js',
    'gulpfile.js',
    'test/temp/test-gulp/gulpfile.js',
    'test/temp/test-jekyll/gulpfile.js',
    'test/temp/test-aws/gulpfile.js',
    'test/temp/test-rsync/gulpfile.js',
    'test/temp/test-pages/gulpfile.js'
  ])
  .pipe(jscs())
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'))
  .on('error', handleErr);
});

gulp.task('test', function(done) {
  return gulp.src([
    'app/index.js',
    'gulpfile.js'
  ])
 .pipe(istanbul())
  .pipe(istanbul.hookRequire())
  .on('finish', function() {
    gulp.src(['test/*.js'])
      .pipe(plumber())
      .pipe(mocha({
        reporter: 'spec'
      }))
      .pipe(istanbul.writeReports())
      .on('end', done);
  });
});

gulp.task('coveralls', function() {
  if (!process.env.CI) { return; }
  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('default', gulp.series('check', 'coveralls'));
gulp.task('help', gulp.series('test', 'check', 'coveralls'));
