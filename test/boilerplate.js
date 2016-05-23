'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/boilerplate'))
    .withOptions({
      projectName: 'README',
      projectDescription: 'This is a great README',
      projectURL: 'hello-world.com',
      authorName: 'Ola Nordmann'
    })
    .toPromise();
});

test.serial('creates .editorconfig', () => {
  assert.file('.editorconfig');
});

test.serial('creates .gitignore', () => {
  assert.file('.gitignore');
});

test.serial('creates .gitattributes', () => {
  assert.file('.gitattributes');
});

test.serial('creates README.md', () => {
  assert.file('README.md');
});

test.serial('README is correct', () => {
  [
    '# README',
    '> This is a great README',
    '[Ola Nordmann](hello-world.com)'
  ].forEach(field => {
    assert.fileContent('README.md', field);
  });
});
