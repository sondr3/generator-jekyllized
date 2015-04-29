'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var _ = require('lodash');

describe('jekyllized:package', function() {
  describe('running on new project', function() {
    before(function(done) {
      this.answers = {
        projectName: 'jekyllized',
        projectDescription: 'Test site for Jekyllized',
        projectURL: 'www.test.com',
        authorName: 'Ola Nordmann',
        authorEmail: 'ola.nordmann@gmail.com'
      };
      helpers.run(path.join(__dirname, '../generators/package'))
        .withPrompts(this.answers)
        .on('end', done);
    });

    it('creates package.json', function() {
      assert.file('package.json');
      assert.fileContent('package.json', JSON.stringify({
        name: this.answers.projectName,
        version: '0.0.0',
        description: this.answers.projectDescription,
        homepage: this.answers.projectURL,
        author: {
          name: this.answers.authorName,
          email: this.answers.authorEmail
        }
      }, null, 2));
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

      helpers.run(path.join(__dirname, '../generators/package'))
        .inDir(path.join(__dirname, 'tmp/package'))
        .withPrompts({
          projectName: 'jekyllized'
        })
        .on('ready', function(gen) {
          gen.fs.writeJSON(gen.destinationPath('package.json'), this.pkg);
        }.bind(this))
        .on('end', done);
    });

    it('creates package.json', function() {
      var pkg = _.extend({name: 'jekyllized'}, this.pkg);
      assert.fileContent('package.json', JSON.stringify(pkg, null, 2));
    });
  });
});
