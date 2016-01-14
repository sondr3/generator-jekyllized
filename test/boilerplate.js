'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('jekyllized:boilerplate', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/boilerplate'))
      .on('end', done);
  });

  it('creates .editorconfig', function () {
    assert.file('.editorconfig');
  });

  it('creates .eslintrc', function () {
    assert.file('.eslintrc');
  });

  it('creates .gitignore', function () {
    assert.file('.gitignore');
  });

  it('creates .gitattributes', function () {
    assert.file('.gitattributes');
  });

  it('creates .babelrc', function () {
    assert.file('.babelrc');
  });

  describe('README', function () {
    before(function (done) {
      this.options = {
        projectName: 'README',
        projectDescription: 'This is a great README',
        projectURL: 'hello-world.com',
        authorName: 'Ola Nordmann'
      };
      helpers.run(path.join(__dirname, '../generators/boilerplate'))
        .inDir(path.join(__dirname, 'tmp/readme'))
        .withOptions(this.options)
        .on('end', done);
    });

    it('creates README.md', function () {
      assert.file('README.md');
    });

    it('contains correct info', function () {
      [
        '# README',
        '> This is a great README',
        '[Ola Nordmann](hello-world.com)'
      ].forEach(function (text) {
        assert.fileContent('README.md', text);
      });
    });
  });
});
