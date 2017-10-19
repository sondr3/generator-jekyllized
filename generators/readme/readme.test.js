'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('jekyllized:readme', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '../app'))
      .withPrompts({
        projectName: 'README',
        projectDescription: 'This is a great README',
        projectURL: 'http://hello-world.com',
        authorName: 'Ola Nordmann'
      })
      .withOptions({ 'skip-install': true });
  });

  test('generates README.md', () => {
    assert.file(['README.md']);
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
});
