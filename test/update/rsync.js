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
      uploading: 'Rsync',
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

test('creates credentials file', () => {
  assert.file('rsync-credentials.json');
  assert.noFile('aws-credentials.json');
});

test('gulp/tasks/assets.js does not contain babel', () => {
  [
    '.pipe($.babel'
  ].forEach(field => {
    assert.noFileContent('gulpfile.js', field);
  });
});

test('contain correct uploading packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'gulp-rsync': '^0.0.6'
    }
  });
});

test('does not contain wrong uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '',
      'concurrent-transform': '',
      'gulp-gh-pages': ''
    }
  });
});

test('contains upload function', () => {
  [
    'const fs',
    'reads from your Rsync credentials file',
    'gulp.task(\'upload'
  ].forEach(field => {
    assert.fileContent('gulpfile.js', field);
  });
});

test('does not contain the wrong uploading task', () => {
  [
    'const parallelize',
    'reads from your AWS credentials file',
    'const ghPages'
  ].forEach(field => {
    assert.noFileContent('gulpfile.js', field);
  });
});
