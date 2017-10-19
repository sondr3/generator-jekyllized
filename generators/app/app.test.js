'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('jekyllized:app', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '.'))
      .withPrompts({
        projectName: 'jekyllized',
        projectDescription: 'Test site for Jekyllized',
        projectURL: 'www.test.com',
        authorName: 'Ola Nordmann',
        authorEmail: 'ola.nordmann@gmail.com',
        authorBio: 'A norwegian dude',
        uploading: 'None',
        jekyllPermalinks: 'pretty'
      })
      .withOptions({ 'skip-install': true });
  });

  test('generates creates files', () => {
    assert.file([
      '.editorconfig',
      '.gitignore',
      '.gitattributes',
      'package.json',
      'README.md'
    ]);
  });

  test('creates package.json correctly', () => {
    assert.file('package.json');
    assert.jsonFileContent('package.json', {
      name: 'jekyllized',
      description: 'Test site for Jekyllized',
      homepage: 'www.test.com',
      author: {
        name: 'Ola Nordmann',
        email: 'ola.nordmann@gmail.com'
      }
    });
  });
});
