'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/gulp'))
    .withOptions({uploading: 'Github Pages'})
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates package.json file', () => {
  assert.file('package.json');
});

test('contain correct uploading packages', () => {
  assert.fileContent('package.json', '"gulp-gh-pages": "^0.5.2"');
});

test('does not contain wrong uploading packages', () => {
  [
    '"gulp-awspublish"',
    '"concurrent-transform"',
    '"gulp-rsync"'
  ].forEach(pack => {
    assert.noFileContent('package.json', pack);
  });
});

test('contains deploy function', () => {
  assert.fileContent('gulpfile.js', '// \'gulp deploy\' -- pushes your dist folder to Github');
  assert.fileContent('gulpfile.js', 'gulp.task(\'deploy\'');
});

test('does not contain the wrong uploading task', () => {
  assert.noFileContent('gulpfile.js', '// \'gulp deploy\' -- reads from your AWS Credentials file, creates the correct');
  assert.noFileContent('gulpfile.js', '// headers for your files and uploads them to S3');
  assert.noFileContent('gulpfile.js', '// \'gulp deploy\' -- reads from your Rsync credentials file and incrementally');
  assert.noFileContent('gulpfile.js', '// uploads your site to your server');
});
