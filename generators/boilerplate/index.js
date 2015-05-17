'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  configuring: function() {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('jscsrc'),
      this.destinationPath('.jscsrc')
    );

    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );
  }
});
