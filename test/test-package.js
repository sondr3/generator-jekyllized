'use strict';

var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;

describe('Jekyllized generator test for package.json', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './temp/test-package'))
      .withArguments(['--skip-install'])
      .withPrompt({
        projectName: ['Package Test'],
        projectDescription: ['Package tests for Jekyllized'],
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

  it('should contain the proper names and version', function() {
    var expected = [
      ['package.json', /\"name\"\: \"test-package\"/],
      ['package.json', /\"description\"\: \"Yeoman workflow for test package\"/]
    ];

    assert.fileContent(expected);
  });

});
