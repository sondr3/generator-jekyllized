"use strict";
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-statisk:git", () => {
  beforeAll(() => {
    return helpers
      .run(require.resolve("../generators/git"))
      .withOptions({ gitignore: `# statisk` });
  });

  it("creates and fills .gitignore", () => {
    assert.file(".gitignore");
    assert.fileContent(".gitignore", "# statisk");
  });

  it("creates .gitattributes", () => {
    assert.file(".gitattributes");
  });
});
