'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('skip-install-message', {
      desc: 'Skip the post-install message',
      type: Boolean,
      default: true
    });

    this.option('skip-install', {
      desc: 'Skip installing dependencies',
      type: Boolean
    });
  },

  prompting: function () {
    var prompts = [{
      name: 'babel',
      type: 'confirm',
      message: 'Compile your JS with Babel',
      when: this.options.babel === undefined
    }, {
      name: 'uploading',
      type: 'list',
      message: 'How do you want to upload your site?',
      choices: ['Amazon S3', 'Rsync', 'Github Pages', 'None'],
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  default: function () {
    this.composeWith('jekyllized:gulp', {
      options: {
        uploading: this.props.uploading,
        babel: this.props.babel
      }
    }, {
      local: require.resolve('generator-statisk/generators/gulp')
    });
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
    this.spawnCommand('bundle', ['install', '--quiet']);
  },

  end: function () {
    var skipInstallMessage =
      '\nPlease run ' + chalk.blue('npm install') + ' and ' +
      chalk.blue('bundle install') + ' to install dependencies\n';

    if (this.options['skip-install']) {
      this.log(skipInstallMessage);
      return;
    }
   }
});
