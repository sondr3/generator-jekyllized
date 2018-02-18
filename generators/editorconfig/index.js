"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath("editorconfig"),
      this.destinationPath(".editorconfig")
    );
  }
};
