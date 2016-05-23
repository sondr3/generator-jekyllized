'use strict';

var oldExit = process.exit;
process.exit = function () {
  console.error(new Error(‘OH NO!!!’));
  oldExit.apply(process, arguments);
}

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

helpers.run(path.join(__dirname, 'generators/app'))
  .withPrompts({
    projectName: 'jekyllized',
    projectDescription: 'Test site for Jekyllized',
    projectURL: 'www.test.com',
    authorName: 'Ola Nordmann',
    authorEmail: 'ola.nordmann\@gmail.com',
    authorBio: 'A norwegian dude',
    uploading: 'None',
    jekyllPermalinks: 'pretty'
  })
  .toPromise()
  .then(function () {
    test.serial('generates expected files', () => {
      assert.file([
        '.editorconfig',
        '.gitignore',
        '.gitattributes',
        'package.json',
        'gulpfile.js',
        'README.md',
        '_config.yml',
        '_config.build.yml',
        'Gemfile'
      ]);
    });

    test.serial('creates package.json correctly', () => {
      assert.file('package.json');
      [
        '"name": "jekyllized"',
        '"description": "Test site for Jekyllized"',
        '"homepage": "www.test.com',
        '"name": "Ola Nordmann"',
        '"email": "ola.nordmann@gmail.com"'
      ].forEach(field => {
        assert.fileContent('package.json', field);
      });
    });
  });
