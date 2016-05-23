'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../generators/gulp'))
    .withOptions({uploading: 'None'})
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates package.json file', () => {
  assert.file('package.json');
});

test('does not create credentials files', () => {
  assert.noFile([
    'aws-credentials.json',
    'rsync-credentials.json'
  ]);
});

test('does not contain uploading packages', () => {
  [
    '"gulp-awspublish"',
    '"concurrent-transform"',
    '"gulp-rsync"',
    '"gulp-gh-pages"'
  ].forEach(pack => {
    assert.noFileContent('package.json', pack);
  });
});

test('does not contain deploy task', () => {
  assert.noFileContent('gulpfile.js', 'gulp.task(\'deploy\'');
});
