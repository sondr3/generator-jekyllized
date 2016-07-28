'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  var pkg = require('../package.json');

  var deps = [
    [helpers.createDummyGenerator(), 'statisk:gulp']
  ];

  return helpers.run(path.join(__dirname, '../generators/update'))
    .withOptions({
      'name': pkg.name,
      'version': pkg.version,
      'skip-install': true
    })
    .withPrompts({
      uploading: 'None',
      babel: false
    })
    .withGenerators(deps)
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates package.json', () => {
  assert.file('package.json');
});

test('creates comment about creation', () => {
  const pkg = require('../package.json');

  const date = (new Date()).toISOString().split('T')[0];
  assert.fileContent('gulpfile.js', '// generated on ' + date + ' using ' + pkg.name + ' ' + pkg.version);
});

test('creates gulp task files, but not build.js', () => {
  assert.file([
    'gulp/tasks/assets.js',
    'gulp/tasks/clean.js',
    'gulp/tasks/copy.js',
    'gulp/tasks/fonts.js',
    'gulp/tasks/html.js',
    'gulp/tasks/images.js',
    'gulp/tasks/inject.js',
    'gulp/tasks/uploading.js'
  ]);
});

test('does not create uploading credentials', () => {
  assert.noFile([
    'rsync-credentials.json',
    'aws-credentials.json'
  ]);
});

test('gulp/tasks/scripts.js does not contain babel', () => {
  assert.noFileContent('gulp/tasks/assets.js', 'const babel');
  assert.noFileContent('gulp/tasks/assets.js', '.pipe(babel');
});
