'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('jekyllized:jekyll', function () {
  describe('default settings', function () {
    before(function (done) {
      this.options = {
        projectName: 'jekyllized',
        projectDescription: 'Tests for Jekyllized',
        projectURL: 'example.org',
        authorName: 'Ola Nordmann',
        authorEmail: 'ola.nordmann@email.com',
        authorURI: 'homepage.com',
        authorBio: 'I am a tester for tests',
        authorTwitter: '0lanordmann',
        authorGithub: '0lanordmann'
      };
      helpers.run(path.join(__dirname, '../generators/jekyll'))
        .inDir(path.join(__dirname, 'tmp/jekyll'))
        .withOptions(this.options)
        .on('end', done);
    });

    it('creates Gemfile', function () {
      assert.file('Gemfile');
    });

    it('creates _config.yml files', function () {
      assert.file([
        '_config.yml',
        '_config.build.yml'
      ]);
    });

    it('creates src directory', function () {
      assert.file([
        'src/404.html',
        'src/about.md',
        'src/crossdomain.xml',
        'src/humans.txt',
        'src/index.html',
        'src/robots.txt'
      ]);
    });

    it('_config.yml contains the correct settings', function () {
      [
        'title: jekyllized',
        'description: Tests for Jekyllized',
        'url: example.org',
        'name: Ola Nordmann',
        'email: ola.nordmann@email.com',
        'uri: homepage.com',
        'bio: I am a tester for tests',
        'twitter: 0lanordmann',
        'github: 0lanordmann'
      ].forEach(function (config) {
        assert.fileContent('_config.yml', config);
      });
    });

    it('_config.build.yml contains the correct settings', function () {
      [
        'future: false',
        'show_drafts: false',
        'limit_posts: 0'
      ].forEach(function (config) {
        assert.fileContent('_config.build.yml', config);
      });
    });

    it('fills out humans.txt correctly', function () {
      assert.fileContent('src/humans.txt', 'Ola Nordmann -- <role> -- @0lanordmann');
    });
  });

  describe('different permalink settings', function () {
    describe('date permalinks', function () {
      before(function (done) {
        this.options = {
          jekyllPermalinks: 'date'
        };
        helpers.run(path.join(__dirname, '../generators/jekyll'))
          .inDir(path.join(__dirname, 'tmp/jekyll-date'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('sets date permalinks', function () {
        assert.fileContent('_config.yml', 'permalink: date');
      });
    });

    describe('pretty permalinks', function () {
      before(function (done) {
        this.options = {
          jekyllPermalinks: 'pretty'
        };
        helpers.run(path.join(__dirname, '../generators/jekyll'))
          .inDir(path.join(__dirname, 'tmp/jekyll-pretty'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('sets pretty permalinks', function () {
        assert.fileContent('_config.yml', 'permalink: pretty');
      });
    });

    describe('ordinal permalinks', function () {
      before(function (done) {
        this.options = {
          jekyllPermalinks: 'ordinal'
        };
        helpers.run(path.join(__dirname, '../generators/jekyll'))
          .inDir(path.join(__dirname, 'tmp/jekyll-ordinal'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('sets ordinal permalinks', function () {
        assert.fileContent('_config.yml', 'permalink: ordinal');
      });
    });

    describe('"none" permalinks', function () {
      before(function (done) {
        this.options = {
          jekyllPermalinks: 'none'
        };
        helpers.run(path.join(__dirname, '../generators/jekyll'))
          .inDir(path.join(__dirname, 'tmp/jekyll-none'))
          .withOptions(this.options)
          .on('end', done);
      });

      it('sets "none" permalinks', function () {
        assert.fileContent('_config.yml', 'permalink: none');
      });
    });
  });
});
