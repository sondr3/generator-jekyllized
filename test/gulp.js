'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:gulp', function () {
  describe('no uploading', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp'))
        .withOptions({uploading: 'None'})
        .on('end', done);
    });

    it('creates gulpfile', function () {
      assert.file('gulpfile.babel.js');
    });

    it('creates package.json file', function () {
      assert.file('package.json');
    });

    it('package.json contains correct packages', function () {
      [
        '"autoprefixer-core": "^6.0.1"',
        '"babel-core": "^5.8.24"',
        '"babel-eslint": "^4.1.1"',
        '"browser-sync": "^2.9.3"',
        '"del": "^2.0.0"',
        '"eslint": "^1.4.1"',
        '"eslint-config-xo": "^0.6.0"',
        '"eslint-config-xo-space": "^0.5.0"',
        '"gulp": "git://github.com/gulpjs/gulp.git#4.0"',
        '"gulp-cache": "~0.3.0"',
        '"gulp-changed": "^1.0.0"',
        '"gulp-concat": "^2.6.0"',
        '"gulp-eslint": "^1.0.0"',
        '"gulp-gzip": "^1.1.0"',
        '"gulp-htmlmin": "^1.0.0"',
        '"gulp-if": "^1.2.4"',
        '"gulp-imagemin": "^2.1.0"',
        '"gulp-inject": "^1.5.0"',
        '"gulp-load-plugins": "^1.0.0-rc.1"',
        '"gulp-minify-css": "^1.2.0"',
        '"gulp-postcss": "^6.0.0"',
        '"gulp-rename": "^1.2.2"',
        '"gulp-rev": "^6.0.0"',
        '"gulp-sass": "^2.0.2"',
        '"gulp-size": "^2.0.0"',
        '"gulp-sourcemaps": "^1.3.0"',
        '"gulp-uglify": "^1.4.1"',
        '"gulp-uncss": "^1.0.0"',
        '"shelljs": "^0.5.1"'
      ].forEach(function (pack) {
        assert.fileContent('package.json', pack);
      });
    });

    it('does not create credentials files', function () {
      assert.noFile([
        'aws-credentials.json',
        'rsync-credentials.json'
      ]);
    });

    it('does not contain uploading packages', function () {
      [
        '"gulp-awspublish"',
        '"gulp-awspublish-router"',
        '"concurrent-transform"',
        '"gulp-rsync"',
        '"gulp-gh-pages"'
      ].forEach(function (pack) {
        assert.noFileContent('package.json', pack);
      });
    });

    it('contains default gulp tasks', function () {
      [
        'clean:dist',
        'clean:assets',
        'clean:metadata',
        'jekyll:dev',
        'jekyll:prod',
        'jekyll:doctor',
        'styles:dev',
        'script:dev',
        'inject:head',
        'inject:footer',
        'images',
        'fonts',
        'copy:assets',
        'styles',
        'script',
        'html',
        'lint',
        'serve',
        'serve:dist',
        'assets:dev',
        'assets',
        'default',
        'build',
        'rebuild',
        'check'
      ].forEach(function (task) {
        assert.fileContent('gulpfile.babel.js', 'gulp.task(\'' + task);
      });
    });

    it('does not contain deploy task', function () {
      assert.noFileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
    });
  });

  describe('Amazon S3', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-aws'))
        .withOptions({uploading: 'Amazon S3'})
        .on('end', done);
    });

    it('creates gulpfile', function () {
      assert.file('gulpfile.babel.js');
    });

    it('creates package.json file', function () {
      assert.file('package.json');
    });

    it('contain correct uploading packages', function () {
      [
        '"gulp-awspublish"',
        '"gulp-awspublish-router"',
        '"concurrent-transform"'
      ].forEach(function (pack) {
        assert.fileContent('package.json', pack);
      });
    });

    it('does not contain wrong uploading packages', function () {
      [
        '"gulp-rsync"',
        '"gulp-gh-pages"'
      ].forEach(function (pack) {
        assert.noFileContent('package.json', pack);
      });
    });

    it('contains deploy task', function () {
      assert.fileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
      assert.fileContent('gulpfile.babel.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
    });

    it('does not contain wrong uploading tasks', function () {
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site via Rsync to your server/);
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('creates credentials file', function () {
      assert.file('aws-credentials.json');
    });
  });

  describe('Rsync', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-rsync'))
        .withOptions({uploading: 'Rsync'})
        .on('end', done);
    });

    it('creates gulpfile', function () {
      assert.file('gulpfile.babel.js');
    });

    it('creates package.json file', function () {
      assert.file('package.json');
    });

    it('contain correct uploading packages', function () {
      assert.fileContent('package.json', '\"gulp-rsync');
    });

    it('does not contain wrong uploading packages', function () {
      [
        '"gulp-awspublish"',
        '"gulp-awspublish-router"',
        '"concurrent-transform"',
        '"gulp-gh-pages"'
      ].forEach(function (pack) {
        assert.noFileContent('package.json', pack);
      });
    });

    it('contains deploy function', function () {
      assert.fileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
      assert.fileContent('gulpfile.babel.js', /\/\/ Task to upload your site via Rsync to your server/);
    });

    it('does not contain the wrong uploading task', function () {
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('creates credentials file', function () {
      assert.file('rsync-credentials.json');
    });
  });

  describe('GitHub pages', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .inDir(path.join(__dirname, 'tmp/gulp-pages'))
        .withOptions({uploading: 'Github Pages'})
        .on('end', done);
    });

    it('creates gulpfile', function () {
      assert.file('gulpfile.babel.js');
    });

    it('creates package.json file', function () {
      assert.file('package.json');
    });

    it('contain correct uploading packages', function () {
      assert.fileContent('package.json', '\"gulp-gh-pages');
    });

    it('does not contain wrong uploading packages', function () {
      [
        '"gulp-awspublish"',
        '"gulp-awspublish-router"',
        '"concurrent-transform"',
        '"gulp-rsync"'
      ].forEach(function (pack) {
        assert.noFileContent('package.json', pack);
      });
    });

    it('contains deploy function', function () {
      assert.fileContent('gulpfile.babel.js', 'gulp.task(\'deploy\'');
      assert.fileContent('gulpfile.babel.js', /\/\/ Task to upload your site to your personal GH Pages repo/);
    });

    it('does not contain the wrong uploading task', function () {
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to upload your site via Rsync to your server/);
      assert.noFileContent('gulpfile.babel.js', /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
    });
  });
});
