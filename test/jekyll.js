'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/jekyll'))
    .withOptions({
      projectName: 'jekyllized',
      projectDescription: 'Tests for Jekyllized',
      projectURL: 'example.org',
      authorName: 'Ola Nordmann',
      authorEmail: 'ola.nordmann@email.com',
      authorURI: 'homepage.com',
      authorBio: 'I am a tester for tests'
    })
    .toPromise();
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
