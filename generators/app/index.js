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
    var self = this;
    var done = this.async();

    var prompts = [{
      name: 'projectName',
      message: 'What is the name of your project?',
      store: true
    }, {
      name: 'projectDescription',
      message: 'Describe your project',
      store: true
    }, {
      name: 'projectURL',
      message: chalk.red('If you are using GHPages use username.github.io') +
        '\nWhat will the URL for your project be?',
      store: true
    }, {
      name: 'authorName',
      message: 'What\'s your name?',
      store: true
    }, {
      name: 'authorEmail',
      message: 'What\'s your email?',
      store: true
    }, {
      name: 'authorURI',
      message: 'Can be the same as this site!' +
        '\nWhat is your homepage?',
      store: true
    }, {
      name: 'authorBio',
      message: 'Write a short description about yourself',
      store: true
    }, {
      name: 'authorTwitter',
      message: 'Your Twitter handle',
      store: true,
    }, {
      name: 'uploading',
      type: 'list',
      message: 'How do you want to upload your site?',
      choices: ['Amazon S3', 'Rsync', 'Github Pages', 'None'],
      store: true
    }, {
      name: 'jekyllPermalinks',
      type: 'list',
      message: 'Permalink style' + (chalk.red(
                     '\n  pretty: /:year/:month/:day/:title/' +
                     '\n  date:   /:year/:month/:day/:title.html' +
                     '\n  none:   /:categories/:title.html')) + '\n',
      choices: ['pretty', 'date', 'none'],
      store: true
    }];

    this.prompt(prompts, function(props) {
      this.props = _.extend(this.props, props);

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
    this.composeWith('jekyllized:boilerplate', {
      options: {
        projectName: this.props.projectName,
        projectDescription: this.props.projectDescription,
        projectURL: this.props.projectURL,
        authorName: this.props.authorName
      }
    }, {
      local: require.resolve('../boilerplate')
    });

    this.composeWith('jekyllized:gulp', {
      options: {
        uploading: this.props.uploading
      }
    }, {
      local: require.resolve('../gulp')
    });

    this.composeWith('jekyllized:jekyll', {
      options: {
        projectName: this.props.projectName,
        projectDescription: this.props.projectDescription,
        projectURL: this.props.projectURL,
        authorName: this.props.authorName,
        authorEmail: this.props.authorEmail,
        authorURI: this.props.authorURI,
        authorBio: this.props.authorBio,
        authorTwitter: this.props.authorTwitter,
        jekyllPermalinks: this.props.jekyllPermalinks
      }
    }, {
      local: require.resolve('../jekyll')
    });
  },

  installing: function() {
    this.npmInstall();
  }
});
