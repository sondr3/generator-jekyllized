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
        babel: this.props.babel,
        buildContent: `
// 'gulp jekyll:tmp' -- copies your Jekyll site to a temporary directory
// to be processed
gulp.task('site:tmp', () =>
  gulp.src(['src/**/*', '!src/assets/**/*', '!src/assets'], {dot: true})
    .pipe(gulp.dest('.tmp/src'))
    .pipe($.size({title: 'Jekyll'}))
);

// 'gulp jekyll' -- builds your site with development settings
// 'gulp jekyll --prod' -- builds your site with production settings
gulp.task('site', done => {
  if (!argv.prod) {
    shell.exec('jekyll build');
    done();
  } else if (argv.prod) {
    shell.exec('jekyll build --config _config.yml,_config.build.yml');
    done();
  }
});

// 'gulp doctor' -- literally just runs jekyll doctor
gulp.task('site:check', done => {
  shell.exec('jekyll doctor');
  done();
});
`
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
