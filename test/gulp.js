'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('jekyllized:gulp', function() {
  describe('without any uploading', function() {
    before(function(done) {
      this.answers = {
        uploading: 'noUploadg'
      };
      helpers.run(path.join(__dirname, '../generators/gulp'))
        .withPrompts(this.answers)
        .on('end', done);
    });

    it('creates gulpfile', function() {
      assert.file('gulpfile.js');
    });

    it('creates package.json file', function() {
      assert.file('package.json');
    });
  });
});
