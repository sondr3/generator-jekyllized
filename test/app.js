'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:app', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('ready', function(gen) {
        gen.fs.copy(
            path.join(__dirname, '../package.json'),
            gen.destinationPath('package.json')
          );
      })
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      '.editorconfig',
      '.jshintrc',
      '.jscsrc',
      '.gitignore',
      '.gitattributes',
      'package.json'
    ]);
  });
});
