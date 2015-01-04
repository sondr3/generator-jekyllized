/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;
var tasks = require('../test-util.js')

describe('Jekyllized generator test when using Rsync', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp/test-rsync'))
      .withArguments(['--skip-install'])
      .withPrompt({
        projectName: ['Mocha Test'],
        projectDescription: ['Mocha tests for Jekyllized'],
        projectTagline: ['Better hope this doesn\'t blow up'],
        projectUrl: ['testing.com'],
        authorName: ['Ola Nordmann'],
        authorEmail: ['ola.nordmann@email.com'],
        authorBio: ['Just your average Norwegian'],
        authorTwitter: ['olanordmann123123'],
        jekyllPermalinks: ['pretty'],
        jekyllPaginate: ['10'],
        uploadChoices: ['rsync'],
        rsyncUsername: ['olanordmann'],
        rsyncHostname: ['example.com'],
        rsyncDestination: ['/srv/www/example.com/public_html']
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
      'rsync-credentials.json'
    ];

    assert.file(expected);
  });

  it('should contain deploy task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'deploy', [], done);
  });

});
