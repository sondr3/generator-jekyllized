'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name'
    });

    this.option('authorEmail', {
      type: String,
      required: true,
      desc: 'Author email'
    });
  },

  configuring: function() {
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {
        projectName: this.options.projectName,
        authorName: this.options.authorName,
        authorEmail: this.options.authorEmail
      }
    );

    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );
  }
});
