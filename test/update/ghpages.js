'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  var pkg = require('../../package.json');

  var deps = [
    [helpers.createDummyGenerator(), 'statisk:gulp']
  ];

  return helpers.run(path.join(__dirname, '../../generators/update'))
    .withOptions({
      'name': pkg.name,
      'version': pkg.version,
      'skip-install': true
    })
    .withPrompts({
      uploading: 'Github Pages',
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
  const pkg = require('../../package.json');

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

test('gulp/tasks/assets.js does not contain babel', () => {
  [
    'const babel',
    '.pipe(babel'
  ].forEach(field => {
    assert.noFileContent('gulp/tasks/assets.js', field);
  });
});

test('does not create credentials files', () => {
  assert.noFile([
    'aws-credentials.json',
    'rsync-credentials.json'
  ]);
});

test('contain correct uploading packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'gh-pages': '^0.11.0'
    }
  });
});

test('does not contain wrong uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '',
      'concurrent-transform': '',
      'gulp-rsync': ''
    }
  });
});

test('contains deploy function', () => {
  [
    'const gulp',
    'const ghPages',
    'gulp.task(\'upload'
  ].forEach(field => {
    assert.fileContent('gulp/tasks/uploading.js', field);
  });
});

test('does not contain the wrong uploading task', () => {
  [
    'const parallelize',
    'const awspublish',
    'const rsync'
  ].forEach(field => {
    assert.noFileContent('gulp/tasks/uploading.js', field);
  });
});
