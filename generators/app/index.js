'use strict';
const _ = require('lodash');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const shelljs = require('shelljs');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('skip-install', {
      desc: 'Skip installing dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skip the installation message',
      type: Boolean,
      defaults: true
    });

    if (!this.options['skip-install']) {
      const dependencies = ['ruby', 'bundle', 'yo', 'node'].every(depend => {
        return shelljs.which(depend);
      });

      if (!dependencies) {
        this.log(chalk.red('You are missing one or more dependencies!'));
        this.log(chalk.yellow('Make sure you have the required dependencies.'));
        shelljs.exit(1);
      }
    }
  }

  initializing() {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  prompting() {
    const questions = [
      {
        name: 'projectName',
        message: 'What is the name of your project?',
        store: true
      },
      {
        name: 'projectDescription',
        message: 'Describe your project',
        store: true
      },
      {
        name: 'projectURL',
        message:
          chalk.yellow(
            'If you will be using Github Pages, use username.github.io\n'
          ) +
          chalk.yellow('? ') +
          'What will the URL for your project be?',
        validate: i =>
          i.startsWith('http') ? true : 'URL must contain either HTTP or HTTPs',
        store: true
      },
      {
        name: 'authorName',
        message: "What's your name?",
        store: true
      },
      {
        name: 'authorEmail',
        message: "What's your email?",
        store: true
      },
      {
        name: 'authorURI',
        message:
          chalk.yellow('Can be the same as this site\n') +
          chalk.yellow('? ') +
          'What is your homepage?',
        store: true
      },
      {
        name: 'authorBio',
        message: 'Write a short description about yourself',
        store: true
      },
      {
        name: 'uploading',
        type: 'list',
        message: 'How do you want to upload your site?',
        choices: ['Amazon S3', 'Rsync', 'Github Pages', 'None'],
        store: true
      },
      {
        name: 'babel',
        type: 'confirm',
        message: 'Compile your JS with Babel'
      },
      {
        name: 'jekyllPermalinks',
        type: 'list',
        message:
          'Permalink style' +
          chalk.yellow(
            '\n   date:     /:categories/:year/:month/:day/:title.html' +
              '\n   pretty:   /:categories/:year/:month/:day/:title/' +
              '\n   ordinal:  /:categories/:year/:y_day/:title.html' +
              '\n   none:     /:categories/:title.html\n'
          ),
        choices: ['date', 'pretty', 'ordinal', 'none'],
        store: true
      }
    ];

    return this.prompt(questions).then(
      function(props) {
        this.props = props;
      }.bind(this)
    );
  }

  writing() {
    const pkgJSONFields = {
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
  }

  default() {
    this.composeWith(require.resolve('../editorconfig'));
    this.composeWith(require.resolve('../git'));
    this.composeWith(require.resolve('../readme'), {
      projectName: this.props.projectName,
      projectDescription: this.props.projectDescription,
      projectURL: this.props.projectURL,
      authorName: this.props.authorName
    });
  }

  installing() {
    this.installDependencies({
      bower: false,
      skipMessage: this.options['skip-install-message'],
      skipInstlal: this.options['skip-install']
    });

    if (!this.options['skip-install']) {
      this.log(
        '\nCreating files and running ' +
          chalk.blue('npm install') +
          ' and ' +
          chalk.blue('bundle install') +
          '.\n'
      );
      this.spawnCommand('bundle', ['install']);
    }
  }

  end() {
    const skipInstallMessage =
      '\nPlease run ' +
      chalk.blue('npm install') +
      ' and ' +
      chalk.blue('bundle install') +
      ' to install dependencies.\n';

    if (this.options['skip-install']) {
      this.log(skipInstallMessage);
    }
  }
};
