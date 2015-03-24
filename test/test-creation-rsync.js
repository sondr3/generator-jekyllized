'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;

describe('Jekyllized generator test when using Rsync', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp/test-rsync'))
      .withArguments(['--skip-install'])
      .withPrompt({
        uploadChoices: ['rsync'],
        rsyncUsername: ['olanordmann'],
        rsyncHostname: ['example.com'],
        rsyncDestination: ['/srv/www/example.com/public_html']
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
      'src/assets/scss/style.scss',
      'rsync-credentials.json'
    ];

    assert.file(expected);
  });

  it('should contain the correct deploy function', function() {
    assert.fileContent('gulpfile.js', /\/\/ Task to upload your site via Rsync to your server/);
  });

  it('should NOT contain either the GH Pages or Amazon function', function() {
    assert.noFileContent('gulpfile.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
    assert.noFileContent('gulpfile.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
  });

  it('should contain deploy tasks', function() {
    assert.fileContent('gulpfile.js', /gulp.task\(\'deploy\'/);
  });

  it('should contain the correct packages', function() {
    assert.fileContent('package.json', /\"gulp-rsync\"/);
  });

});
