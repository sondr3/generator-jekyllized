'use strict';

var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;

describe('Test for Gulp tasks without any uploading', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp/test-gulp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        projectName: ['Mocha Test'],
        projectDescription: ['Mocha tests for Jekyllized'],
        projectTagline: ['Better hope this doesn\'t blow up'],
        projectURL: ['testing.com'],
        authorName: ['Ola Nordmann'],
        authorEmail: ['ola.nordmann@email.com'],
        authorBio: ['Just your average Norwegian'],
        authorTwitter: ['olanordmann123123'],
        jekyllPermalinks: ['pretty'],
        jekyllPaginate: ['10'],
        uploadChoices: ['noUpload']
      })
    .on('end', done);
  });

  it('creates expected files', function() {
    var expected = [
      'bower.json',
      'package.json',
      'gulp.config.json',
      'gulpfile.js',
      'src/index.html',
      'src/robots.txt',
      'src/assets/favicon.ico',
      'src/assets/scss/style.scss'
    ];

    assert.file(expected);
  });

  it('does not create unexpected files', function() {
    var unexpected = [
      'aws-credentials.json',
      'rsync-redentials.json'
    ];

    assert.noFile(unexpected);
  });

  it ('should contain the default functions', function() {
    var expected = [
      ['gulpfile.js', /function cleanDist\(done\)/],
      ['gulpfile.js', /function cleanAssets\(done\)/],
      ['gulpfile.js', /function rebuild\(done\)/],
      ['gulpfile.js', /function jekyllDev\(done\)/],
      ['gulpfile.js', /function jekyllProd\(done\)/],
      ['gulpfile.js', /function styles\(\)/],
      ['gulpfile.js', /function javascript\(\)/],
      ['gulpfile.js', /function images\(\)/],
      ['gulpfile.js', /function fonts\(\)/],
      ['gulpfile.js', /function copy\(\)/],
      ['gulpfile.js', /function optimize\(\)/],
      ['gulpfile.js', /function jslint\(\)/],
      ['gulpfile.js', /function doctor\(done\)/],
      ['gulpfile.js', /function serve\(\)/]
    ];

    assert.fileContent(expected);
  });

  it ('should contain the default tasks', function() {
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

  it('should NOT contain a deploy function', function() {
    assert.noFileContent('gulpfile.js', /function deploy\(\)/);
  });

  it('should NOT contain a deploy task', function() {
    assert.noFileContent('gulpfile.js', /gulp.task\(\'deploy\'/);
  });

});
