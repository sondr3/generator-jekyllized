"use strict";
var path = require("path");
var gulp = require("gulp");
var jshint = require("gulp-jshint");
var istanbul = require("gulp-istanbul");
var plumber = require("gulp-plumber");
var mocha = require("gulp-mocha");
var coveralls = require("gulp-coveralls");

var handleErr = function (err) {
  console.log(err.message);
  process.exit(1);
};

gulp.task("static", function () {
  return gulp.src([
    "test/*.js",
    "app/index.js",
    "gulpfile.js"
  ])
  .pipe(jshint(".jshintrc"))
  .pipe(jshint.reporter("jshint-stylish"))
  .pipe(jshint.reporter("fail"))
  .on("error", handleErr);
});

gulp.task("test", function (cb) {
  gulp.src([
    "app/index.js"
  ])
 .pipe(istanbul({
    includeUntested: true
  }))
  .pipe(istanbul.hookRequire())
  .on("finish", function () {
    gulp.src(["test/*.js"])
      .pipe(plumber())
      .pipe(mocha({
        reporter: "spec"
      }))
      .pipe(istanbul.writeReports())
      .on("end", cb);
  });
});

gulp.task("coveralls", ["test"], function () {
  if (!process.env.CI) return;
  return gulp.src(path.join(__dirname, "coverage/lcov.info"))
    .pipe(coveralls());
});

gulp.task("default", ["static", "test", "coveralls"]);
