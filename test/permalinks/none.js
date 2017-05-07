'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers.run(path.join(__dirname, '../../generators/jekyll'))
    .withOptions({jekyllPermalinks: 'none'})
    .toPromise();
});

test('sets none permalinks', () => {
  assert.fileContent('_config.yml', 'permalink: none');
});
