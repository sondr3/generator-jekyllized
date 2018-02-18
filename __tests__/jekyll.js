"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-jekyllized:jekyll", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/jekyll"));
  });

  it("creates Gemfile", () => {
    assert.file("Gemfile");
  });

  it("creates _config.yml", () => {
    assert.file("_config.yml");
  });

  it("creates src directory", () => {
    assert.file(["src/404.html", "src/about.md", "src/index.md"]);
  });
});
