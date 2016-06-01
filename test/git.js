'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  var deps = [
    [helpers.createDummyGenerator(), 'statisk:git']
  ];

  return helpers.run(path.join(__dirname, '../generators/app'))
    .withOptions({'skip-install': true})
    .withGenerators(deps)
    .toPromise();
});

test('generates expected files', () => {
  assert.file([
    '.gitattributes',
    '.gitignore'
  ]);
});
