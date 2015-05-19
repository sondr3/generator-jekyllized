'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var generators = require('yeoman-generator');
var path = require('path');
var yosay = require('yosay');
var shelljs = require('shelljs');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    var dependenciesInstalled = ['bundle', 'ruby'].every(function(depend) {
      return shelljs.which(depend);
    });

    if (!dependenciesInstalled) {
      this.log('MISSING DEPENDENCIES:' +
        '\nEither ' + chalk.white('Ruby') + ' or ' + chalk.white('Bundler') +
        ' is not installed or missing from $PATH.' +
        '\nMake sure that they are either installed or added to $PATH.');
      shelljs.exit(1);
    }

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

    this.option('authorEmail', {
      type: String,
      required: true,
      desc: 'Author email'
    });

    this.option('authorBio', {
      type: String,
      required: true,
      desc: 'Author bio'
    });

    this.option('authorTwitter', {
      type: String,
      required: true,
      desc: 'Author twitter'
    });

    this.option('jekyllPermalink', {
      type: String,
      required: true,
      desc: 'Jekyll permalinks'
    });

    this.option('jekyllPaginate', {
      type: String,
      required: true,
      desc: 'Jekyll paginate'
    });
  },

  writing: function() {
    this.fs.copy(
      this.templatePath('Gemfile'),
      this.destinationPath('Gemfile')
    );

    this.fs.copyTpl(
      this.templatePath('config.yml'),
      this.destinationPath('_config.yml'),
      {
        projectName: this.options.projectName,
        projectDescription: this.options.projectDescription,
        projectURL: this.options.projectURL,
        authorName: this.options.authorName,
        authorEmail: this.options.authorEmail,
        authorBio: this.options.authorBio,
        authorTwitter: this.options.authorTwitter,
        jekyllPermalinks: this.options.jekyllPermalinks,
        jekyllPaginate: this.options.jekyllPaginate
      }
    );

    this.fs.copyTpl(
      this.templatePath('config.build.yml'),
      this.destinationPath('_config.build.yml')
    );

    this.fs.copy(
      this.templatePath('app'),
      this.destinationPath('src')
    );
  }
});
