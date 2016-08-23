
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/gulp'))
    .toPromise();
});

test('creates gulp file for building jekyll', () => {
  assert.file('gulp/tasks/build.js');
});
