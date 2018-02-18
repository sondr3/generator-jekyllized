"use strict";
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-jekyllized:app", () => {
  beforeAll(() => {
    return helpers
      .run(require.resolve("../generators/app"))
      .withOptions({
        gitignore: `# jekyllized
_site/                                                                                                              
dist/                                                                                                               
.sass-cache/                                                                                                        
Gemfile.lock`
      })
      .withGenerators([
        [helpers.createDummyGenerator(), "jekyllized:editorconfig"],
        [helpers.createDummyGenerator(), "jekyllized:git"],
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

  it(".gitignore contains correct ignores", () => {
    ["# jekyllized", "_site/", "dist/", ".sass-cache/", "Gemfile.lock"].forEach(
      field => assert.fileContent(".gitignore", field)
    );
  });
});
