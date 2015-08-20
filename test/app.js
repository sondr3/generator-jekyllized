'use strict';

var _ = require('lodash');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var fs = require('fs');

function assertObjectContains(obj, content) {
  Object.keys(content).forEach(function(key) {
    if (typeof content[key] === 'object') {
      assertObjectContains(content[key], obj[key]);
    } else {
      assert.equal(content[key], obj[key]);
    }
  });
}

function assertJSONFileContains(filename, content) {
  var obj = JSON.parse(fs.readFileSync(filename, 'utf8'));
  assertObjectContains(obj, content);
}

describe('jekyllized:app', function() {
  describe('running on new project', function() {
    before(function(done) {
      this.answers = {
        projectName: 'jekyllized',
        projectDescription: 'Test site for Jekyllized',
        projectURL: 'www.test.com',
        authorName: 'Ola Nordmann',
        authorEmail: 'ola.nordmann@gmail.com',
        authorBio: 'A norwegian dude',
        authorTwitter: '0lanordmann',
        uploading: 'None',
        jekyllPermalinks: 'pretty',
        jekyllPaginate: '10'
      };
      this.deps = [
        [helpers.createDummyGenerator(), 'jekyllized:boilerplate'],
        [helpers.createDummyGenerator(), 'jekyllized:bower'],
        [helpers.createDummyGenerator(), 'jekyllized:gulp'],
        [helpers.createDummyGenerator(), 'jekyllized:jekyll'],
      ];
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, 'tmp/app'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts(this.answers)
        .withGenerators(this.deps)
        .on('end', done);
    });

    it('can be required without throwing', function() {
      this.app = require('../generators/app');
    });

    it('creates files', function() {
      assert.file([
        '.editorconfig',
        '.jshintrc',
        '.jscsrc',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        'bower.json',
        'package.json',
        'gulpfile.babel.js',
        'README.md',
        '_config.yml',
        '_config.build.yml',
        'Gemfile'
      ]);
    });

    it('creates package.json', function() {
      assert.file('package.json');
      assertJSONFileContains('package.json', {
        name: this.answers.projectName,
        version: '0.0.0',
        description: this.answers.projectDescription,
        homepage: this.answers.projectURL,
        author: {
          name: this.answers.authorName,
          email: this.answers.authorEmail
        },
      });
    });
  });

  describe('running on existing project', function() {
    before(function(done) {
      this.pkg = {
        version: '3.1.4',
        description: '404 not found',
        homepage: 'ulv.no',
        author: 'Kari Nordmann'
      };

      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({
          'skip-install': true
        })
        .withPrompts({
          projectName: 'jekyllized'
        })
        .withGenerators([
            [helpers.createDummyGenerator(), 'mocha:app']
        ])
        .on('ready', function(gen) {
          gen.fs.writeJSON(gen.destinationPath('package.json'), this.pkg);
        }.bind(this))
        .on('end', done);
    });

    it('extends package.json', function() {
      var pkg = _.extend({name: 'jekyllized'}, this.pkg);
      assertJSONFileContains('package.json', pkg);
    });
  });
});
