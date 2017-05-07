'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers.run(path.join(__dirname, '../../generators/jekyll'))
    .withOptions({jekyllPermalinks: 'ordinal'})
    .toPromise();
});

test('sets ordinal permalinks', () => {
  assert.fileContent('_config.yml', 'permalink: ordinal');
});

