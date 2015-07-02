'use strict';

import coveralls from 'gulp-coveralls';
import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';
import path from 'path';
import plumber from 'gulp-plumber';
import trash from 'trash';

const handleErr = err => {
  console.log(err.message);
  process.exit(1);
};

gulp.task('check', () => {
  return gulp.src([
    'test/*.js',
    'test/tmp/**/gulpfile.babel.js',
    'generators/**/index.js',
    'gulpfile.babel.js'
  ])
  .pipe(jscs())
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'))
  .on('error', handleErr);
});

gulp.task('istanbul', done => {
  return gulp.src([
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
  });
});

gulp.task('clean', done => {
  trash(['test/tmp']);
  done();
});

gulp.task('coveralls', () => {
  if (!process.env.CI) { return; }
  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('test', gulp.series('clean', 'istanbul'));
gulp.task('default', gulp.series('check', 'coveralls'));
