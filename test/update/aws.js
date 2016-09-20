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
      uploading: 'Amazon S3',
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

test('creates comment about creation', () => {
  const pkg = require('../../package.json');

  const date = (new Date()).toISOString().split('T')[0];
  assert.fileContent('gulpfile.js', '// generated on ' + date + ' using ' + pkg.name + ' ' + pkg.version);
});

test('gulp/tasks/assets.js does not contain babel', () => {
  [
    '.pipe($.babel'
  ].forEach(field => {
    assert.noFileContent('gulpfile.js', field);
  });
});

test('creates correct credentials file', () => {
  assert.file('aws-credentials.json');
  assert.noFile('rsync-credentials.json');
});

test('contain correct uploading packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '^3.2.0',
      'concurrent-transform': '^1.0.0'
    }
  });
});

test('does not contain wrong uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-rsync': '',
      'gulp-gh-pages': ''
    }
  });
});

test('contains upload task', () => {
  [
    'const fs',
    'const parallelize',
    'reads from your AWS credentials file',
    'gulp.task(\'upload'
  ].forEach(field => {
    assert.fileContent('gulpfile.js', field);
  });
});

test('does not contain wrong uploading tasks', () => {
  [
    'const ghPages',
    'reads from your Rsync credentials file'
  ].forEach(field => {
    assert.noFileContent('gulpfile.js', field);
  });
});
