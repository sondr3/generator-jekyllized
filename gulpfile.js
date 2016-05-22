'use strict';

const path = require('path');
const gulp = require('gulp');
const coveralls = require('gulp-coveralls');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const del = require('del');

gulp.task('istanbul', done =>
  gulp.src([
    'generators/**/index.js'
  ])
  .pipe(istanbul())
  .pipe(istanbul.hookRequire())
  .on('finish', () => {
    gulp.src(['test/*.js'])
      .pipe(mocha({reporter: 'spec'}))
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({thresholds: {global: 70}}))
      .on('end', done);
  })
);

gulp.task('clean', done =>
  del(['test/tmp'], {dot: true}, done)
);

gulp.task('coveralls', () => {
  if (!process.env.CI) {
    return;
  }
  return gulp.src(path.join(__dirname, 'coverage/lcov.info')) //eslint-disable-line
    .pipe(coveralls());
});

gulp.task('test', gulp.series('clean', 'istanbul'));
gulp.task('default', gulp.series('coveralls'));
