"use strict";
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-statisk:editorconfig", () => {
  beforeAll(() => {
    return helpers.run(require.resolve("../generators/editorconfig"));
  });

  it("creates .editorconfig", () => {
    assert.file(".editorconfig");
  });
});
