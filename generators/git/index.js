'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  configuring: function() {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );
  }
});
