'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../generators/jekyll'))
    .withOptions({jekyllPermalinks: 'date'})
    .toPromise();
});

test.serial('sets date permalinks', () => {
  assert.fileContent('_config.yml', 'permalink: date');
});
