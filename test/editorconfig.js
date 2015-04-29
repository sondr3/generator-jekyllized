'use strict';

var path = require ('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:editorconfig', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/editorconfig'))
      .on('end', done);
  });

  it('created .editorconfig', function () {
    assert.file([
      '.editorconfig'
    ]);
  });
});
