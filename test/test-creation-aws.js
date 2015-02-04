/*global describe, before, it*/
"use strict";

var path    = require("path");
var helpers = require("yeoman-generator").test;
var assert  = require("yeoman-generator").assert;

describe("Jekyllized generator test when using Amazon AWS", function () {
  before(function (done) {
    helpers.run(path.join(__dirname, "../app"))
      .inDir(path.join(__dirname, "./temp/test-aws"))
      .withArguments(["--skip-install"])
      .withPrompt({
        uploadChoices: ["amazonCloudfrontS3"],
        amazonKey: ["123123123123123"],
        amazonSecret: ["14141414141414"],
        amazonBucket: ["135135135135135"],
        amazonDistID: ["2121212121212121"]
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
      "src/assets/scss/style.scss",
      "aws-credentials.json"
    ];

  assert.file(expected);
  });

  it("should contain the correct deploy function", function () {
    assert.fileContent("gulpfile.js", /\/\/ Task to deploy your site to Amazon S3 and Cloudfront/);
  });

  it("should NOT contain either the GH Pages or Rsync function", function () {
    assert.noFileContent("gulpfile.js", /\/\/ Task to upload your site via Rsync to your server/);
    assert.noFileContent("gulpfile.js", /\/\/ Task to upload your site to your personal GH Pages repo/);
  });

  it("should contain deploy tasks", function () {
    assert.fileContent("gulpfile.js", /gulp.task\(\"deploy\"/);
  });

  it("should contain the correct packages", function () {
    var expected = [
      ["package.json", /\"concurrent-transform\"/],
      ["package.json", /\"gulp-awspublish\"/],
      ["package.json", /\"gulp-awspublish-router\"/],
      ["package.json", /\"gulp-cloudfront\"/]
    ];

  assert.fileContent(expected);
  });

});
