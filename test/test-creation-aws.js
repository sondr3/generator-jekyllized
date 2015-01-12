/*global describe, before, it*/
"use strict";

var path    = require("path");
var helpers = require("yeoman-generator").test;
var assert  = require("yeoman-generator").assert;
var tasks = require("../test-util.js");

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

  it("should contain deploy tasks", function (done) {
    tasks.assertTaskExists(this.jekyllized, "deploy", [], done);
  });

});
