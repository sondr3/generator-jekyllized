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

  return helpers.run(path.join(__dirname, '../generators/app'))
    .withOptions({
      name: pkg.name,
      version: pkg.version,
      uploading: 'None'
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
  const date = (new Date).toISOString().split('T')[0]; // eslint-disable-line
  assert.fileContent('gulpfile.js', '// generated on ' + date + ' using ' + pkg.name + ' ' + pkg.version);
});

test('creates gulp task files', () => {
  assert.file([
    'gulp/tasks/browsersync.js',
    'gulp/tasks/build.js',
    'gulp/tasks/clean.js',
    'gulp/tasks/copy.js',
    'gulp/tasks/fonts.js',
    'gulp/tasks/html.js',
    'gulp/tasks/images.js',
    'gulp/tasks/inject.js',
    'gulp/tasks/scripts.js',
    'gulp/tasks/style.js',
    'gulp/tasks/uploading.js'
  ]);
});
