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

  it("should contain clean:dev task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "clean:dev", [], done);
  });

  it("should contain clean:prod task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "clean:prod", [], done);
  });

  it("should contain jekyll:pure task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "jekyll:pure", [], done);
  });

  it("should contain jekyll:dev task with bower included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "jekyll:dev", ["bower"], done);
  });

  it("should contain jekyll-rebuild task with jekyll:pure included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "jekyll-rebuild", ["jekyll:pure"], done);
  });

  it("should contain jekyll:prod task with bower included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "jekyll:prod", ["bower"], done);
  });

  it("should contain styles task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "styles", [], done);
  });

  it("should contain bower task with bower:files included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "bower", ["bower:files"], done);
  });

  it("should contain images task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "images", [], done);
  });

  it("should contain fonts task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "fonts", [], done);
  });

  it("should contain copy task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "copy", [], done);
  });

  it("should contain html task with styles included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "html", ["styles"], done);
  });

  it("should contain jslint task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "jslint", [], done);
  });

  it("should contain doctor task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "doctor", [], done);
  });

  it("should contain serve:dev task with styles and jekyll:dev included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "serve:dev", ["styles", "jekyll:dev"], done);
  });

  it("should contain watch task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "watch", [], done);
  });

  it("should contain serve:prod task", function (done) {
    tasks.assertTaskExists(this.jekyllized, "serve:prod", [], done);
  });

  it("should contain default task with serve:dev and watch included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "default", ["serve:dev", "watch"], done);
  });

  it("should contain check task with jslint and doctor included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "check", ["jslint", "doctor"], done);
  });

  it("should contain build task with jekyll:prod and styles included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "build", [], done);
  });

  it("should contain publish task with build included", function (done) {
    tasks.assertTaskExists(this.jekyllized, "publish", ["build"], done);
  });

});
