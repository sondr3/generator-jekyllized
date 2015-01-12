/*global describe, before, it*/
"use strict";

var path = require("path");
var helpers = require("yeoman-generator").test;
var assert = require("yeoman-generator").assert;
var tasks = require("../test-util.js");

describe("Jekyllized generator", function () {
  describe("test for Jekyll settings", function () {
    before(function (done) {
      helpers.run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "./temp/test-jekyll"))
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

    it("creates the expected files", function () {
      var expected = [
        "src/404.html",
        "src/about.md",
        "src/atom.xml",
        "src/crossdomain.xml",
        "src/humans.txt",
        "src/index.html",
        "src/robots.txt",
        "src/sitemap.xml"
      ];

    assert.file(expected);
    });

    it("_config.yml contains the correct title", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "title", "Mocha Test", done);
    });

    it("_config.yml contains the correct description", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "description", "Mocha tests for Jekyllized", done);
    });

    it("_config.yml contains the correct tagline", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "tagline", "Better hope this doesn\"t blow up", done);
    });

    it("_config.yml contains the correct author name", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "name", "Ola Nordmann", done);
    });

    it("_config.yml contains the correct author email", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "email", "ola.nordmann@email.com", done);
    });

    it("_config.yml contains the correct author bio", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "bio", "Just your average Norwegian", done);
    });

    it("_config.yml contains the correct author Twitter", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "twitter", "olanordmann123123", done);
    });

    it("_config.build.yml contains the correct URL", function (done) {
      tasks.assertJekyllBuildSettings(this.jekyllized, "url", "testing.com", done);
    });

  });

  describe("test for permalinks and pagination", function () {
    before(function (done) {
      helpers.run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "./temp/test-jekyll-pagination"))
        .withArguments(["--skip-install"])
        .withPrompt({
          jekyllPermalinks: ["pretty"],
          jekyllPaginate: ["10"],
          uploadChoices: ["noUpload"]
        })
      .on("end", done);
    });

    it("_config.yml permalink setting is 'pretty'", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "permalink", "pretty", done);
    });

    it("_config.yml pagination setting is '10'", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "paginate", "10", done);
    });

  });

  describe("", function () {
    before(function (done) {
      helpers.run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "./temp/test-jekyll-pagination-1"))
        .withArguments(["--skip-install"])
        .withPrompt({
          jekyllPermalinks: ["date"],
          jekyllPaginate: ["all"],
          uploadChoices: ["noUpload"]
        })
      .on("end", done);
    });

    it("_config.yml permalink setting is 'date'", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "permalink", "date", done);
    });

    it("_config.yml pagination setting is 'all'", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "paginate", "all", done);
    });

  });

  describe("", function () {
    before(function (done) {
      helpers.run(path.join(__dirname, "../app"))
        .inDir(path.join(__dirname, "./temp/test-jekyll-pagination-2"))
        .withArguments(["--skip-install"])
        .withPrompt({
          jekyllPermalinks: ["none"],
          jekyllPaginate: ["1"],
          uploadChoices: ["noUpload"]
        })
      .on("end", done);
    });

    it("_config.yml permalink setting is 'none'", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "permalink", "none", done);
    });

    it("_config.yml pagination setting is '1'", function (done) {
      tasks.assertJekyllSettings(this.jekyllized, "paginate", "1", done);
    });

  });

});
