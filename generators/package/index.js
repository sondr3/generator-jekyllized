'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  initializing: function() {
    this.props = {};
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: {
    projectQuestions: function() {
      var done = this.async();

      var prompts = [{
        name: 'projectName',
        message: 'What is the name of your project?'
      }, {
        name: 'projectDescription',
        message: 'Describe your project'
      }, {
        name: 'projectURL',
        message: chalk.red('If you are using GHPages use username.github.io') +
          '\nWhat will the URL for your project be?'
      }];

      this.prompt(prompts, function(props) {
        this.props = _.extend(this.props, props);
        this.config.set(this.props);

        done();
      }.bind(this));
    },

    authorQuestions: function() {
      var done = this.async();

      var prompts = [{
        name: 'authorName',
        message: 'What\'s your name?'
      }, {
        name: 'authorEmail',
        message: 'What\'s your email?'
      }, {
        name: 'authorBio',
        message: 'Write a short description about yourself'
      }, {
        name: 'authorTwitter',
        message: 'Your Twitter handle'
      }];

      this.prompt(prompts, function(props) {
        this.props = _.extend(this.props, props);
        this.config.set(this.props);

        done();
      }.bind(this));
    }
  },

  writing: function() {
    var pkgJsonFields = {
      name: _.kebabCase(this.props.projectName),
      version: '0.0.0',
      description: this.props.projectDescription,
      homepage: this.props.projectURL,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail
      }
    };

    this.fs.writeJSON('package.json', _.extend(pkgJsonFields, this.pkg));
  }
});
