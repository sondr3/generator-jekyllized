'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('jekyllized:editorconfig', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '.'))
      .withOptions({ 'skip-install': true });
  });

  test('generates expected files', () => {
    assert.file(['.editorconfig']);
  });
});
