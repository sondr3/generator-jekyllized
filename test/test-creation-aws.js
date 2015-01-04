/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;

describe('Jekyllized generator test when using Amazon AWS', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './test-aws'))
      .withArguments(['--skip-install'])
      .withPrompt({
        projectName: ['Mocha Test'],
        projectDescription: ['Mocha tests for Jekyllized'],
        projectTagline: ['Better hope this doesn\'t blow up'],
        projectUrl: ['testing.com'],
        ownerName: ['Ola Nordmann'],
        ownerEmail: ['ola.nordmann@email.com'],
        ownerBio: ['Just your average Norwegian'],
        ownerTwitter: ['olanordmann123123'],
        jekyllPermalinks: ['pretty'],
        jekyllPaginate: ['10'],
        uploadChoices: ['amazonCloudfrontS3'],
        amazonKey: ['123123123123123'],
        amazonSecret: ['14141414141414'],
        amazonBucket: ['135135135135135'],
        amazonDistID: ['2121212121212121']
      })
    .on('end', done);
  });

  it('creates expected files', function () {
    var expected = [
      'bower.json',
      'package.json',
      'gulpfile.js',
      'src/index.html',
      'src/robots.txt',
      'src/assets/favicon.ico',
      'src/assets/scss/style.scss',
      'aws-credentials.json'
    ];

  assert.file(expected);
  });

});
