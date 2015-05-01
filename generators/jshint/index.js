'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  configuring: function() {
    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );
  }
});
