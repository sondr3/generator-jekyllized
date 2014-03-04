/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('jekyll generator', function () {
  this.timeout(15000);
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.jekyllized = helpers.createGenerator('jekyllized:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);

      this.jekyllized.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    // setTimeout(15000);
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.jekyllized, {
      javascriptPreprocessor: 'CoffeeScript',
      developmentTools: ['modernizr', 'normalize', 'jquery']
    });

    this.jekyllized.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
