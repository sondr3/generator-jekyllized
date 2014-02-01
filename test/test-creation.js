/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('jekyll generator', function () {
  this.timeout(15000);
  var jekyllized;
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('jekyllized:app', [
        '../../app'
      ]);
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

    helpers.mockPrompt(this.app, {
      cssPreprocessor: 'libsass',
      markupEngine: 'HAML',
      javascriptPreprocessor: 'CoffeeScript',
      developmentTools: ['modernizr', 'normalize', 'jquery'],
      cssDirectory: '/assets/stylesheets',
      javascriptDirectory: '/assets/javascript',
      imageDirectory: '/assets/images',
      fontsDirectory: '/assets/fonts',
      cssPreprocessorDirectory: '/assets/_scss',
      javascriptPreprocessorDirectory: '/assets/_coffee'
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
