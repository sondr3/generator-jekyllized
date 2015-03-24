'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Jekyllized generator', function() {
  describe('test for Jekyll settings', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './temp/test-jekyll'))
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

    it('creates the expected files', function() {
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

    it('gulpfile.js does NOT contain a deploy task', function() {
      assert.noFileContent('gulpfile.js', /gulp.task\(\'deploy\'/);
    });

    it('_config.yml contains the correct settings', function() {
      var expected = [
        ['_config.yml', /title\: Mocha Test/],
        ['_config.yml', /description\: Mocha tests for Jekyllized/],
        ['_config.yml', /tagline\: Better hope this doesn\'t blow up/],
        ['_config.yml', /name\: Ola Nordmann/],
        ['_config.yml', /email\: ola\.nordmann\@email\.com/],
        ['_config.yml', /bio\: Just your average Norwegian/],
        ['_config.yml', /twitter\: olanordmann123123/]
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

  describe('test with pretty permalinks and 10 posts per page', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './temp/test-jekyll-pagination'))
        .withArguments(['--skip-install'])
        .withPrompt({
          jekyllPermalinks: ['pretty'],
          jekyllPaginate: ['10'],
          uploadChoices: ['noUpload']
        })
      .on('end', done);
    });

    it('_config.yml permalink setting is "pretty"', function() {
      assert.fileContent('_config.yml', /permalink\: pretty/);
    });

    it('_config.yml pagination is "10" posts per page', function() {
      assert.fileContent('_config.yml', /paginate\: 10/);
    });

  });

  describe('test with date permalinks and all posts together', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './temp/test-jekyll-pagination-1'))
        .withArguments(['--skip-install'])
        .withPrompt({
          jekyllPermalinks: ['date'],
          jekyllPaginate: ['all'],
          uploadChoices: ['noUpload']
        })
      .on('end', done);
    });

    it('_config.yml permalink setting is "date"', function() {
      assert.fileContent('_config.yml', /permalink\: date/);
    });

    it('_config.yml pagination is "all" posts per page', function() {
      assert.fileContent('_config.yml', /paginate\: all/);
    });

  });

  describe('test with no permalinks setting and 1 post per page', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './temp/test-jekyll-pagination-2'))
        .withArguments(['--skip-install'])
        .withPrompt({
          jekyllPermalinks: ['none'],
          jekyllPaginate: ['1'],
          uploadChoices: ['noUpload']
        })
      .on('end', done);
    });

    it('_config.yml permalink setting is "none"', function() {
      assert.fileContent('_config.yml', /permalink\: none/);
    });

    it('_config.yml pagination is "1" posts per page', function() {
      assert.fileContent('_config.yml', /paginate\: 1/);
    });

  });

});
