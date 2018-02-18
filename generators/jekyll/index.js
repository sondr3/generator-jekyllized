"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  writing() {
    this.fs.copy(this.templatePath("app"), this.destinationPath("src"));
    this.fs.copy(this.templatePath("Gemfile"), this.destinationPath("Gemfile"));

    this.fs.copy(
      this.templatePath("config.yml"),
      this.destinationPath("_config.yml")
    );
  }
};
