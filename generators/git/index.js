'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  configuring() {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  end() {
    this.spawnCommandSync('git', ['init', '--quiet'], {
      cwd: this.destinationPath()
    });
  }
};
