var fs = require('fs');
var util = require('util');
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;

exports.assertTaskExists = function (generator, taskName, features, done) {
  var gulpFile = fs.readFileSync('./gulpfile.js', 'utf8');
  var regExpGulp = new RegExp('gulp.task\\(\'' + taskName + '\'');

  assert.ok(
    regExpGulp.test(gulpFile),
    'gulpfile.js does not contain ' + taskName + ' task'
  );
  done();
};
