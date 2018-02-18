"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-jekyllized:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withGenerators([
        [helpers.createDummyGenerator(), "node:editorconfig"],
        [helpers.createDummyGenerator(), "node:git"],
        [helpers.createDummyGenerator(), "jekyllized:jekyll"]
      ]);
  });

  it("creates essential files", () => {
    assert.file([
      // Core files
      ".editorconfig",
      ".gitattributes",
      ".gitignore",
      "README.md",
      // Testing for Jekyll sub-generator
      "Gemfile",
      "_config.yml",
      "src"
    ]);
  });
});