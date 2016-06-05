'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

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
      skipInstall: this.options['skip-install']
    });
    this.spawnCommand('bundle', ['install', '--quiet']);
  }
});
