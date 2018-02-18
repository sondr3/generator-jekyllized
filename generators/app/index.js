"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );
  }

  default() {
    this.composeWith(require.resolve("../editorconfig"));
    this.composeWith(require.resolve("../git"), {
      gitignore: `# jekyllized
_site/
dist/
.sass-cache/
Gemfile.lock`
    });

    this.composeWith(require.resolve("../jekyll"));
  }

  install() {
    this.npmInstall();
    this.runInstall("bundle");
  }
};
