"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(chalk.red("generator-jekyllized")));

    const prompts = [
      {
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );
  }

  default() {
    this.composeWith(require.resolve("generator-node/generators/editorconfig"));
    this.composeWith(require.resolve("generator-node/generators/git"));
  }

  install() {
    this.npmInstall();
  }
};
