'use strict';

import coveralls from 'gulp-coveralls';
import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import path from 'path';
import del from 'del';

gulp.task('check', () =>
  gulp.src([
    'gulpfile.babel.js',
    'test/*.js',
    'test/tmp/**/gulpfile.babel.js',
    'generators/**/index.js'
  ])
  .pipe(eslint())
  .pipe(eslint.formatEach())
  .pipe(eslint.failOnError())
);

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
  if (!process.env.CI) { return; } //eslint-disable-line
  return gulp.src(path.join(__dirname, 'coverage/lcov.info')) //eslint-disable-line
    .pipe(coveralls());
});

gulp.task('test', gulp.series('clean', 'istanbul'));
gulp.task('default', gulp.series('check', 'coveralls'));
