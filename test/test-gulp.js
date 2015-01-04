/*global describe, beforeEach, it*/
'use strict'

var fs = require('fs');
var util = require('util');
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var tasks = require('../test-util.js')

describe('Jekyllized generator test for Gulp tasks without any uploading', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './test-gulp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        projectName: ['Mocha Test'],
        projectDescription: ['Mocha tests for Jekyllized'],
        projectTagline: ['Better hope this doesn\'t blow up'],
        projectUrl: ['testing.com'],
        ownerName: ['Ola Nordmann'],
        ownerEmail: ['ola.nordmann@email.com'],
        ownerBio: ['Just your average Norwegian'],
        ownerTwitter: ['olanordmann123123'],
        jekyllPermalinks: ['pretty'],
        jekyllPaginate: ['10'],
        uploadChoices: ['noUpload']
      })
    .on('end', done);
  });

  it('should contain clean:dev task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'clean:dev', [], done);
  });

  it('should contain clean:prod task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'clean:prod', [], done);
  });

  it('should contain jekyll:dev task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'jekyll:dev', [], done);
  });

  it('should contain jekyll-rebuild task with jekyll:dev included', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'jekyll-rebuild', ['jekyll:dev'], done);
  });

  it('should contain jekyll:prod task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'jekyll:prod', [], done);
  });

  it('should contain styles task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'styles', [], done);
  });

  it('should contain images task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'images', [], done);
  });

  it('should contain fonts task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'fonts', [], done);
  });

  it('should contain copy task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'copy', [], done);
  });

  it('should contain html task with styles included', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'html', ['styles'], done);
  });

  it('should contain jslint task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'jslint', [], done);
  });

  it('should contain doctor task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'doctor', [], done);
  });

  it('should contain serve:dev task with styles and jekyll:dev included', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'serve:dev', ['styles', 'jekyll:dev'], done);
  });

  it('should contain watch task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'watch', [], done);
  });

  it('should contain serve:prod task', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'serve:prod', [], done);
  });

  it('should contain default task with serve:dev and watch included', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'default', ['serve:dev', 'watch'], done);
  });

  it('should contain check task with jslint and doctor included', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'check', ['jslint', 'doctor'], done);
  });

  it('should contain build task with jekyll:prod and styles included', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'build', [], done);
  });

  it('should contain publish task with build included', function (done) {
    tasks.assertTaskExists(this.jekyllized, 'publish', ['build'], done);
  });

});
