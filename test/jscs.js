'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:jscs', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('end', done);
  });

  it('creates .jscsrc', function() {
    assert.file([
      '.jscsrc'
    ]);
  });
});
