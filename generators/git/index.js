"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option("gitignore", {
      type: String,
      required: false,
      desc: "Files and paths that should be ignored by git"
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore"),
      {
        gitignore: this.options.gitignore
      }
    );

    this.fs.copy(
      this.templatePath("gitattributes"),
      this.destinationPath(".gitattributes")
    );
  }
};
