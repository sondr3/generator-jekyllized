'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:jekyll', function() {
  describe('default settings', function() {
    before(function(done) {
      this.options = {
        projectName: 'jekyllized',
        projectDescription: 'Tests for Jekyllized',
        projectURL: 'example.org',
        authorName: 'Ola Nordmann',
        authorEmail: 'ola.nordmann@email.com',
        authorBio: 'I am a tester for tests',
        authorTwitter: '0lanordmann'
      };
      helpers.run(path.join(__dirname, '../generators/jekyll'))
        .inDir(path.join(__dirname, 'tmp/jekyll'))
        .withOptions(this.options)
        .on('end', done);
    });

    it('creates Gemfile', function() {
      assert.file('Gemfile');
    });

    it('creates _config.yml files', function() {
      assert.file('_config.yml');
      assert.file('_config.build.yml');
    });

    it('creates src directory', function() {
      var expected = [
        'src/404.html',
        'src/about.md',
        'src/feed.xml',
        'src/crossdomain.xml',
        'src/humans.txt',
        'src/index.html',
        'src/robots.txt'
      ];

      assert.file(expected);
    });

    it('_config.yml contains the correct settings', function() {
      var expected = [
        ['_config.yml', /title\: jekyllized/],
        ['_config.yml', /description\: Tests for Jekyllized/],
        ['_config.yml', /name\: Ola Nordmann/],
        ['_config.yml', /email\: ola\.nordmann\@email\.com/],
        ['_config.yml', /bio\: I am a tester for tests/],
        ['_config.yml', /twitter\: 0lanordmann/]
      ];

      assert.fileContent(expected);
    });

    it('_config.build.yml contains the correct settings', function() {
      var expected = [
        ['_config.build.yml', /future\: false/],
        ['_config.build.yml', /show_drafts\: false/],
        ['_config.build.yml', /lsi\: true/],
        ['_config.build.yml', /limit_posts\: 0/],
        ['_config.build.yml', /source\: src/],
        ['_config.build.yml', /destination\: dist/]
      ];

      assert.fileContent(expected);
    });
  });
});
