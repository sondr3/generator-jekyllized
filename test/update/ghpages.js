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

test('creates package.json file', () => {
  assert.file('package.json');
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
    'const ghPages',
    'pushes your dist folder to Github',
    'gulp.task(\'upload'
  ].forEach(field => {
    assert.fileContent('gulpfile.js', field);
  });
});

test('does not contain the wrong uploading task', () => {
  [
    'const parallelize',
    'reads from your AWS credentials file',
    'reads from your Rsync credentials file'
  ].forEach(field => {
    assert.noFileContent('gulpfile.js', field);
  });
});
