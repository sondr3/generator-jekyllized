'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers.run(path.join(__dirname, '.'))
    .withOptions({jekyllPermalinks: 'date'});
});

test('sets date permalinks', () => {
  assert.fileContent('_config.yml', 'permalink: date');
});
