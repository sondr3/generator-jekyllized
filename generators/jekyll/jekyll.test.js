'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('jekyllized:jekyll', () => {
  beforeAll(() => {
    return helpers.run(require.resolve('.'))
      .withOptions({
        projectName: 'jekyllized',
        projectDescription: 'Tests for Jekyllized',
        projectURL: 'example.org',
        authorName: 'Ola Nordmann',
        authorEmail: 'ola.nordmann@email.com',
        authorURI: 'homepage.com',
        authorBio: 'I am a tester for tests'
      });
  });

  test('creates Gemfile', () => {
    assert.file('Gemfile');
  });

  test('creates _config.yml files', () => {
    assert.file([
      '_config.yml',
      '_config.build.yml'
    ]);
  });

  test('creates src directory', () => {
    assert.file([
      'src/404.html',
      'src/about.md',
      'src/crossdomain.xml',
      'src/humans.txt',
      'src/index.html',
      'src/robots.txt'
    ]);
  });

  test('_config.yml contains the correct settings', () => {
    [
      'title: jekyllized',
      'description: Tests for Jekyllized',
      'url: example.org',
      'name: Ola Nordmann',
      'email: ola.nordmann@email.com',
      'uri: homepage.com',
      'bio: I am a tester for tests'
    ].forEach(function (config) {
      assert.fileContent('_config.yml', config);
    });
  });

  test('_config.build.yml contains the correct settings', () => {
    [
      'future: false',
      'show_drafts: false',
      'limit_posts: 0'
    ].forEach(function (config) {
      assert.fileContent('_config.build.yml', config);
    });
  });

  test('fills out humans.txt correctly', () => {
    assert.fileContent('src/humans.txt', 'Ola Nordmann -- <role> -- @');
  });
});

describe('jekyllized:jekyll -- date permalinks', () => {
  beforeAll(() => {
    return helpers.run(require.resolve('.'))
      .withOptions({jekyllPermalinks: 'date'});
  });

  test('sets none permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: date');
  });
});

describe('jekyllized:jekyll -- no permalinks', () => {
  beforeAll(() => {
    return helpers.run(require.resolve('.'))
      .withOptions({jekyllPermalinks: 'none'});
  });

  test('sets none permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: none');
  });
});

describe('jekyllized:jekyll -- ordinal permalinks', () => {
  beforeAll(() => {
    return helpers.run(require.resolve('.'))
      .withOptions({jekyllPermalinks: 'ordinal'});
  });

  test('sets ordinal permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: ordinal');
  });
});

describe('jekyllized:jekyll -- pretty permalinks', () => {
  beforeAll(() => {
    return helpers.run(require.resolve('.'))
      .withOptions({jekyllPermalinks: 'pretty'});
  });

  test('sets pretty permalinks', () => {
    assert.fileContent('_config.yml', 'permalink: pretty');
  });
});
