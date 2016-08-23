'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var pkg = require('../../package.json');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('skip-install', {
      desc: 'Skip installing dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the installation message',
      type: Boolean,
      defaults: true
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
        name: pkg.name,
        version: pkg.version,
        uploading: this.props.uploading,
        babel: this.props.babel
      }
    }, {
      local: require.resolve('generator-statisk/generators/gulp')
    });

    this.composeWith('jekyllized:gulp', {
      options: {}
    }, {
      local: require.resolve('../gulp')
    });
  },

  install: function () {
    this.installDependencies({
      bower: false,
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });
    if (!this.options['skip-install']) {
      this.log('\nRunning ' + chalk.blue('npm install') + ' and ' + chalk.blue('bundle install') + '.\n');
      this.spawnCommandSync('bundle', ['install']);
    }
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
