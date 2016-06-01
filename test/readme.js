'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
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
    '[Ola Nordmann](http://hello-world.com)'
  ].forEach(field => {
    assert.fileContent('README.md', field);
  });
});
