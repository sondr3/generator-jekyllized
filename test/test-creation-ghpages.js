'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Jekyllized generator test when using GitHub Pages', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp/test-pages'))
      .withArguments(['--skip-install'])
      .withPrompt({
        uploadChoices: ['githubPages']
      })
    .on('end', done);
  });

  it('creates expected files', function() {
    var expected = [
      'bower.json',
      'package.json',
      'gulpfile.js',
      'src/index.html',
      'src/robots.txt',
      'src/assets/favicon.ico',
      'src/assets/scss/style.scss'
    ];

    assert.file(expected);
  });

  it('should contain the correct deploy function', function() {
    assert.fileContent('gulpfile.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
  });

  it('should NOT contain either the Amazon or Rsync function', function() {
    assert.noFileContent('gulpfile.js', /\/\/ Task to upload your site via Rsync to your server/);
    assert.noFileContent('gulpfile.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
  });

  it('should contain deploy tasks', function() {
    assert.fileContent('gulpfile.js', /gulp.task\(\'deploy\'/);
  });

  it('should contain the correct packages', function() {
    assert.fileContent('package.json', /\"gulp-gh-pages\"/);
  });

});
