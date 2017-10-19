'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator:jekyllized', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '.'))
      .withPrompts({
        someAnswer: true
      })
      .toPromise();
  });

  test('generator-jekyllized creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
