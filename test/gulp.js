'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:gulp', function() {
  describe('no uploading', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp'))
        .withOptions({noUpload: true})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.js');
    });

    it('creates package.json file', function() {
      assert.file('package.json');
    });

    it('does not create credentials files', function() {
      assert.noFile('aws-credentials.json');
      assert.noFile('rsync-credentials.json');
    });

    it('does not contain uploading packages', function() {
      var unexpected = [
        ['package.json', /\"gulp-awspublish/],
        ['package.json', /\"gulp-awspublish-router/],
        ['package.json', /\"concurrent-transform/],
        ['package.json', /\"gulp-rsync/],
        ['package.json', /\"gulp-gh-pages/],
      ];

      assert.noFileContent(unexpected);
    });

    it('contains default gulp functions', function() {
      var expected = [
        ['gulpfile.js', /function cleanDist/],
        ['gulpfile.js', /function cleanAssets/],
        ['gulpfile.js', /function rebuild/],
        ['gulpfile.js', /function jekyllDev/],
        ['gulpfile.js', /function jekyllProd/],
        ['gulpfile.js', /function styles/],
        ['gulpfile.js', /function javascript/],
        ['gulpfile.js', /function images/],
        ['gulpfile.js', /function fonts/],
        ['gulpfile.js', /function copy/],
        ['gulpfile.js', /function optimize/],
        ['gulpfile.js', /function jslint/],
        ['gulpfile.js', /function doctor/],
        ['gulpfile.js', /function serve/]
      ];

      assert.fileContent(expected);
    });

    it('contains default gulp tasks', function() {
      var expected = [
        ['gulpfile.js', /gulp.task\(\'default\'/],
        ['gulpfile.js', /gulp.task\(\'optimize\'/],
        ['gulpfile.js', /gulp.task\(\'build\'/],
        ['gulpfile.js', /gulp.task\(\'serve\'/],
        ['gulpfile.js', /gulp.task\(\'clean\'/],
        ['gulpfile.js', /gulp.task\(\'clean\:assets\'/],
        ['gulpfile.js', /gulp.task\(\'rebuild\'/],
        ['gulpfile.js', /gulp.task\(\'styles\'/],
        ['gulpfile.js', /gulp.task\(\'javascript\'/],
        ['gulpfile.js', /gulp.task\(\'check\'/]
      ];

      assert.fileContent(expected);
    });

    it('does not contain deploy function', function() {
      assert.noFileContent('gulpfile.js', 'function deploy');
    });

    it('does not contain deploy task', function() {
      assert.noFileContent('gulpfile.js', 'gulp.task(\'deploy\'');
    });
  });

  describe('Amazon S3', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-aws'))
        .withOptions({amazonS3: true})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.js');
    });

    it('creates package.json file', function() {
      assert.file('package.json');
    });

    it('contain correct uploading packages', function() {
      var expected = [
        ['package.json', /\"gulp-awspublish/],
        ['package.json', /\"gulp-awspublish-router/],
        ['package.json', /\"concurrent-transform/]
      ];

      assert.fileContent(expected);
    });

    it('does not contain wrong uploading packages', function() {
      var unexpected = [
        ['package.json', /\"gulp-rsync/],
        ['package.json', /\"gulp-gh-pages/]
      ];

      assert.noFileContent(unexpected);
    });

    it('contains deploy function', function() {
      assert.fileContent('gulpfile.js', 'function deploy');
      assert.fileContent('gulpfile.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
    });

    it('contains deploy task', function() {
      assert.fileContent('gulpfile.js', 'gulp.task(\'deploy\'');
    });

    it('does not contain wrong uploading tasks', function() {
      assert.noFileContent('gulpfile.js', /\/\/ Task to upload your site via Rsync to your server/);
      assert.noFileContent('gulpfile.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('creates credentials file', function() {
      assert.file('aws-credentials.json');
    });
  });

  describe('Rsync', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-rsync'))
        .withOptions({rsync: true})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.js');
    });

    it('creates package.json file', function() {
      assert.file('package.json');
    });

    it('contain correct uploading packages', function() {
      assert.fileContent('package.json', '\"gulp-rsync');
    });

    it('does not contain wrong uploading packages', function() {
      var unexpected = [
        ['package.json', /\"gulp-awspublish/],
        ['package.json', /\"gulp-awspublish-router/],
        ['package.json', /\"concurrent-transform/],
        ['package.json', /\"gulp-gh-pages/]
      ];

      assert.noFileContent(unexpected);
    });

    it('contains deploy function', function() {
      assert.fileContent('gulpfile.js', 'function deploy');
      assert.fileContent('gulpfile.js', /\/\/ Task to upload your site via Rsync to your server/);
    });

    it('contains deploy task', function() {
      assert.fileContent('gulpfile.js', 'gulp.task(\'deploy\'');
    });

    it('does not contain the wrong uploading task', function() {
      assert.noFileContent('gulpfile.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
      assert.noFileContent('gulpfile.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('creates credentials file', function() {
      assert.file('rsync-credentials.json');
    });
  });

  describe('GitHub pages', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-pages'))
        .withOptions({ghPages: true})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.js');
    });

    it('creates package.json file', function() {
      assert.file('package.json');
    });

    it('contain correct uploading packages', function() {
      assert.fileContent('package.json', '\"gulp-gh-pages');
    });

    it('does not contain wrong uploading packages', function() {
      var unexpected = [
        ['package.json', /\"gulp-awspublish/],
        ['package.json', /\"gulp-awspublish-router/],
        ['package.json', /\"concurrent-transform/],
        ['package.json', /\"gulp-rsync/]
      ];

      assert.noFileContent(unexpected);
    });

    it('contains deploy function', function() {
      assert.fileContent('gulpfile.js', 'function deploy');
      assert.fileContent('gulpfile.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('contains deploy task', function() {
      assert.fileContent('gulpfile.js', 'gulp.task(\'deploy\'');
    });

    it('does not contain the wrong uploadgin task', function() {
      assert.noFileContent('gulpfile.js', /\/\/ Task to upload your site via Rsync to your server/);
      assert.noFileContent('gulpfile.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
    });
  });
});
