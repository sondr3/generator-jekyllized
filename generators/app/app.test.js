'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('jekyllized:app', () => {
  beforeAll(() => {
    var deps = [
      [helpers.createDummyGenerator(), 'statisk:git'],
      [helpers.createDummyGenerator(), 'statisk:editorconfig'],
      [helpers.createDummyGenerator(), 'statisk:gulp'],
      [helpers.createDummyGenerator(), 'statisk:readme'],
      [helpers.createDummyGenerator(), 'jekyllized:jekyll']
    ];

    return helpers.run(path.join(__dirname, '.'))
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
      .withOptions({'skip-install': true})
      .withGenerators(deps);
  });

  test('generates expected files', () => {
    assert.file([
      '.editorconfig',
      '.gitignore',
      '.gitattributes',
      'package.json',
      'gulpfile.js',
      'README.md',
      '_config.yml',
      '_config.build.yml',
      'Gemfile'
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

describe('jekyllized:app -- editorconfig', () => {
  beforeAll(() => {
    var deps = [
      [helpers.createDummyGenerator(), 'statisk:editorconfig']
    ];

    return helpers.run(path.join(__dirname, '.'))
      .withOptions({'skip-install': true})
      .withGenerators(deps);
  });

  test('generates expected files', () => {
    assert.file([
      '.editorconfig'
    ]);
  });
});

describe('jekyllized:app -- git', () => {
  beforeAll(() => {
    var deps = [
      [helpers.createDummyGenerator(), 'statisk:git']
    ];

    return helpers.run(path.join(__dirname, '.'))
      .withOptions({'skip-install': true})
      .withGenerators(deps);
  });

  test('generates expected files', () => {
    assert.file([
      '.gitattributes',
      '.gitignore'
    ]);
  });
});

describe('jekyllized:app -- git', () => {
  beforeAll(() => {
    var deps = [
      [helpers.createDummyGenerator(), 'statisk:readme']
    ];

    return helpers.run(path.join(__dirname, '.'))
      .withPrompts({
        projectName: 'README',
        projectDescription: 'This is a great README',
        projectURL: 'http://hello-world.com',
        authorName: 'Ola Nordmann'
      })
      .withGenerators(deps);
  });

  test('creates README.md', () => {
    assert.file('README.md');
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
