'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  var deps = [
    [helpers.createDummyGenerator(), 'statisk:editorconfig']
  ];

  return helpers.run(path.join(__dirname, '.'))
    .withOptions({'skip-install': true})
    .withGenerators(deps);
});

test('generates expected files', () => {
  assert.file([
    '.editorconfig'
  ]);
});
