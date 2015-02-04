/*global describe, before, it*/
"use strict";

var path = require("path");
var assert = require("assert");
var helpers = require("yeoman-generator").test;

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

  it ("should contain the standard tasks", function () {
    var expected = [
      ["gulpfile.js", /gulp.task\(\"default\"/],
      ["gulpfile.js", /gulp.task\(\"optimize\"/],
      ["gulpfile.js", /gulp.task\(\"build\"/],
      ["gulpfile.js", /gulp.task\(\"serve\"/],
      ["gulpfile.js", /gulp.task\(\"clean\"/],
      ["gulpfile.js", /gulp.task\(\"rebuild\"/],
      ["gulpfile.js", /gulp.task\(\"styles\"/],
      ["gulpfile.js", /gulp.task\(\"javascript\"/],
      ["gulpfile.js", /gulp.task\(\"check\"/]
    ];

  assert.fileContent(expected);
  });

  it("should NOT contain a deploy task", function () {
    assert.noFileContent("gulpfile.js", /gulp.task\(\"deploy\"/);
  });

});
