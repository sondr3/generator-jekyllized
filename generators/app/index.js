"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );
  }

  default() {
    this.composeWith(require.resolve("generator-node/generators/editorconfig"));
    this.composeWith(require.resolve("generator-node/generators/git"));

    this.composeWith(require.resolve("../jekyll"));
  }

  install() {
    this.npmInstall();
    this.runInstall("bundle");
  }
};
