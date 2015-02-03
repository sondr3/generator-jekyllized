/*global describe, before, it*/
"use strict";

var path = require("path");
var assert = require("assert");
var helpers = require("yeoman-generator").test;
var tasks = require("../test-util.js");

describe("Jekyllized generator test for Gulp tasks without any uploading", function () {
  before(function (done) {
    helpers.run(path.join(__dirname, "../app"))
      .inDir(path.join(__dirname, "./temp/test-gulp"))
      .withArguments(["--skip-install"])
      .withPrompt({
        projectName: ["Mocha Test"],
        projectDescription: ["Mocha tests for Jekyllized"],
        projectTagline: ["Better hope this doesn\"t blow up"],
        projectURL: ["testing.com"],
        authorName: ["Ola Nordmann"],
        authorEmail: ["ola.nordmann@email.com"],
        authorBio: ["Just your average Norwegian"],
        authorTwitter: ["olanordmann123123"],
        jekyllPermalinks: ["pretty"],
        jekyllPaginate: ["10"],
        uploadChoices: ["noUpload"]
      })
    .on("end", done);
  });

  it("creates expected files", function () {
    var expected = [
      "bower.json",
      "package.json",
      "gulpfile.js",
      "src/index.html",
      "src/robots.txt",
      "src/assets/favicon.ico",
      "src/assets/scss/style.scss"
    ];

  assert.file(expected);
  });

  it("does not create unexpected files", function () {
    var unexpected = [
      "aws-credentials.json",
      "rsync-redentials.json"
    ];

  assert.noFile(unexpected);
  });

  it("should contain default task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "default", [], done);
  });

  it("should contain optimize task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "optimize", [], done);
  });

  it("should contain deploy task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "deploy", [], done);
  });

  it("should contain serve task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "serve", [], done);
  });

  it("should contain styles task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "styles", [], done);
  });

  it("should contain javascript task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "javascript", [], done);
  });

  it("should contain check task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "check", [], done);
  });

});
