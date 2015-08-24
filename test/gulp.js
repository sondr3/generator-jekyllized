'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:gulp', function() {
  describe('no uploading', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp'))
        .withOptions({uploading: 'None'})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.babel.js');
    });

    it('creates package.json file', function() {
      assert.file('package.json');
    });

    it('package.json contains correct packages and versions', function() {
      var expected = [
        ['package.json', '"babel": "^5.6.8"'],
        ['package.json', '"browser-sync": "^2.7.12"'],
        ['package.json', '"bower": "^1.4.1"'],
        ['package.json', '"del": "^1.1.1"'],
        ['package.json', '"gulp": "git://github.com/gulpjs/gulp.git#4.0"'],
        ['package.json', '"gulp-autoprefixer": "^2.0.0"'],
        ['package.json', '"gulp-cache": "~0.2.4"'],
        ['package.json', '"gulp-cached": "^1.0.1"'],
        ['package.json', '"gulp-changed": "^1.0.0"'],
        ['package.json', '"gulp-filter": "^2.0.0"'],
        ['package.json', '"gulp-group-concat": "^1.1.4"'],
        ['package.json', '"gulp-gzip": "^1.1.0"'],
        ['package.json', '"gulp-htmlmin": "^1.0.0"'],
        ['package.json', '"gulp-if": "^1.2.4"'],
        ['package.json', '"gulp-imagemin": "^2.1.0"'],
        ['package.json', '"gulp-jshint": "^1.8.5"'],
        ['package.json', '"gulp-load-plugins": "^0.10.0"'],
        ['package.json', '"gulp-minify-css": "^1.2.0"'],
        ['package.json', '"gulp-rev-all": "^0.8.21"'],
        ['package.json', '"gulp-rev-replace": "^0.4.2"'],
        ['package.json', '"gulp-sass": "^2.0.2"'],
        ['package.json', '"gulp-shell": "^0.4.2"'],
        ['package.json', '"gulp-size": "^1.1.0"'],
        ['package.json', '"gulp-sourcemaps": "^1.3.0"'],
        ['package.json', '"gulp-uglify": "^1.1.0"'],
        ['package.json', '"gulp-uncss": "^1.0.0"'],
        ['package.json', '"gulp-useref": "^1.0.2"'],
        ['package.json', '"jshint-stylish": "^2.0.1"'],
        ['package.json', '"merge-stream": "^0.1.6"'],
        ['package.json', '"main-bower-files": "^2.8.2"'],
        ['package.json', '"shelljs": "^0.5.1"'],
        ['package.json', '"trash": "^1.4.0"'],
        ['package.json', '"wiredep": "^3.0.0-beta"']
      ];

      assert.fileContent(expected);
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
        ['package.json', /\"gulp-gh-pages/]
      ];

      assert.noFileContent(unexpected);
    });

    it('contains default gulp tasks', function() {
      var expected = [
        ['gulpfile.babel.js', /gulp.task\(\'clean\:dist\'/],
        ['gulpfile.babel.js', /gulp.task\(\'clean\:assets\'/],
        ['gulpfile.babel.js', /gulp.task\(\'clean\:metadata\'/],
        ['gulpfile.babel.js', /gulp.task\(\'jekyll\:dev\'/],
        ['gulpfile.babel.js', /gulp.task\(\'jekyll\:prod\'/],
        ['gulpfile.babel.js', /gulp.task\(\'styles\'/],
        ['gulpfile.babel.js', /gulp.task\(\'javascript\'/],
        ['gulpfile.babel.js', /gulp.task\(\'images\'/],
        ['gulpfile.babel.js', /gulp.task\(\'fonts\'/],
        ['gulpfile.babel.js', /gulp.task\(\'copy\'/],
        ['gulpfile.babel.js', /gulp.task\(\'bower\'/],
        ['gulpfile.babel.js', /gulp.task\(\'bower:files\'/],
        ['gulpfile.babel.js', /gulp.task\(\'optimize\'/],
        ['gulpfile.babel.js', /gulp.task\(\'jslint\'/],
        ['gulpfile.babel.js', /gulp.task\(\'doctor\'/],
        ['gulpfile.babel.js', /gulp.task\(\'default\'/],
        ['gulpfile.babel.js', /gulp.task\(\'build\'/],
        ['gulpfile.babel.js', /gulp.task\(\'serve\'/],
        ['gulpfile.babel.js', /gulp.task\(\'rebuild\'/],
        ['gulpfile.babel.js', /gulp.task\(\'check\'/]
      ];

      assert.fileContent(expected);
    });

    it('does not contain deploy task', function() {
      assert.noFileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
    });
  });

  describe('Amazon S3', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-aws'))
        .withOptions({uploading: 'Amazon S3'})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.babel.js');
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

    it('contains deploy task', function() {
      assert.fileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
      assert.fileContent('gulpfile.babel.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
    });

    it('does not contain wrong uploading tasks', function() {
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site via Rsync to your server/);
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('creates credentials file', function() {
      assert.file('aws-credentials.json');
    });
  });

  describe('Rsync', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-rsync'))
        .withOptions({uploading: 'Rsync'})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.babel.js');
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
      assert.fileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
      assert.fileContent('gulpfile.babel.js', /\/\/ Task to upload your site via Rsync to your server/);
    });

    it('does not contain the wrong uploading task', function() {
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('creates credentials file', function() {
      assert.file('rsync-credentials.json');
    });
  });

  describe('GitHub pages', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-pages'))
        .withOptions({uploading: 'Github Pages'})
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.babel.js');
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
      assert.fileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
      assert.fileContent('gulpfile.babel.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('does not contain the wrong uploadgin task', function() {
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site via Rsync to your server/);
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
    });
  });
});
