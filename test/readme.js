'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  var deps = [
    [helpers.createDummyGenerator(), 'statisk:readme']
  ];

  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      projectName: 'README',
      projectDescription: 'This is a great README',
      projectURL: 'http://hello-world.com',
      authorName: 'Ola Nordmann'
    })
    .withGenerators(deps)
    .toPromise();
});

test('creates README.md', () => {
  assert.file('README.md');
});

test('README is correct', () => {
  [
    '# README',
    '> This is a great README',
    '#### Settings',
    '## Install',
    '#### Update',
    'https://github.com/sondr3/generator-jekyllized',
    '[Ola Nordmann](http://hello-world.com)'
  ].forEach(field => {
    assert.fileContent('README.md', field);
  });
});
