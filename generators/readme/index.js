'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('projectDescription', {
      type: String,
      required: true,
      desc: 'Project description'
    });

    this.option('projectURL', {
      type: String,
      required: true,
      desc: 'Project URL'
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name'
    });
  }

  configuring() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.options.projectName,
        projectDescription: this.options.projectDescription,
        projectURL: this.options.projectURL,
        authorName: this.options.authorName
      }
    );
  }
};
