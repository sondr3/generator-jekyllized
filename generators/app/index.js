'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  initializing: function() {
    this.props = {};
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: function() {
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
    }, {
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
  },

  writing: function() {
    var pkgJSONFields = {
      name: _.kebabCase(this.props.projectName),
      version: '0.0.0',
      description: this.props.projectDescription,
      homepage: this.props.projectURL,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail
      }
    };

    this.fs.writeJSON('package.json', _.extend(pkgJSONFields, this.pkg));
  },

  default: function() {
    this.composeWith('jekyllized:editorconfig', {}, {
      local: require.resolve('../editorconfig')
    });

    this.composeWith('jekyllized:jshint', {}, {
      local: require.resolve('../jshint')
    });

    this.composeWith('jekyllized:jscs', {}, {
      local: require.resolve('../jscs')
    });

    this.composeWith('jekyllized:git', {}, {
      local: require.resolve('../git')
    });

    this.composeWith('jekyllized:gulp', {}, {
      local: require.resolve('../gulp')
    });
  }
});
