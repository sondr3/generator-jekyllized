'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  var deps = [
    [helpers.createDummyGenerator(), 'jekyllized:boilerplate'],
    [helpers.createDummyGenerator(), 'jekyllized:jekyll'],
    [helpers.createDummyGenerator(), 'jekyllized:gulp']
  ];

  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      projectName: 'jekyllized',
      projectDescription: 'Test site for Jekyllized',
      projectURL: 'www.test.com',
      authorName: 'Ola Nordmann',
      authorEmail: 'ola.nordmann@gmail.com',
      authorBio: 'A norwegian dude',
      uploading: 'None',
      jekyllPermalinks: 'pretty'
    })
    .withOptions({'skip-install': true})
    .withGenerators(deps)
    .toPromise();
});

test('generates expected files', () => {
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

test('creates package.json correctly', () => {
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
