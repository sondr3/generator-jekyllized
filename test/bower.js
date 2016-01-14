'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('jekyllized:bower', function () {
  before(function (done) {
    this.options = {
      projectName: 'jekyllized',
      authorName: 'Ola Nordmann',
      authorEmail: 'ola.nordmann@gmail.com'
    };
    helpers.run(path.join(__dirname, '../generators/bower'))
      .inDir(path.join(__dirname, 'tmp/bower'))
      .withOptions(this.options)
      .on('end', done);
  });

  it('creates .bowerrc', function () {
    assert.file('.bowerrc');
  });

  it('creates bower.json', function () {
    assert.file('bower.json');
  });

  it('bower.json contains correct info', function () {
    [
      '"name": "jekyllized"',
      '"Ola Nordmann <ola.nordmann@gmail.com>"'
    ].forEach(function (text) {
      assert.fileContent('bower.json', text);
    });
  });
});
