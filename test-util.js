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

exports.assertJekyllSettings = function (generator, settingName, settingValue, done) {
  var configFile = fs.readFileSync('./_config.yml', 'utf8');
  var settingRegExp = new RegExp(settingName + ': ' + settingValue);

  assert.ok(
    settingRegExp.test(configFile),
    '_config.yml setting ' + settingName + ' does not contain the right value'
  );
  done();
};

exports.assertJekyllBuildSettings = function (generator, settingName, settingValue, done) {
  var configBuildFile = fs.readFileSync('./_config.build.yml', 'utf8');
  var settingRegExp = new RegExp(settingName + ': ' + settingValue);

  assert.ok(
    settingRegExp.test(configBuildFile),
    '_config.build.yml setting ' + settingName + ' does not contain the right value'
  );
  done();
};
