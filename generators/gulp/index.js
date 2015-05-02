'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'uploading',
      message: 'How would you like to host/upload your site?',
      choices: [{
        name: 'Amazon S3',
        value: 'amazonS3'
      }, {
        name: 'Rsync',
        value: 'rsync'
      }, {
        name: 'GitHub Pages',
        value: 'ghpages'
      }, {
        name: 'None',
        value: 'noUpload'
      }]
    }];

    this.prompt(prompts, function(props) {
      this.props = _.extend(this.props, props);
      this.config.set(this.props);

      done();
    }.bind(this));
  },

  writing: {
    package: function() {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      pkg.devDependencies = pkg.devDependencies || {};
      _.extend(pkg.devDependencies, {
        'browser-sync': '^1.5.7',
        'del': '^1.1.1',
        'gulp': 'git://github.com/gulpjs/gulp#4.0',
        'gulp-autoprefixer': '^2.0.0',
        'gulp-cache': '~0.2.4',
        'gulp-cached': '^1.0.1',
        'gulp-changed': '^1.0.0',
        'gulp-filter': '^2.0.0',
        'gulp-group-concat': '^1.1.4',
        'gulp-gzip': '0.0.8',
        'gulp-htmlmin': '^1.0.0',
        'gulp-if': '^1.2.4',
        'gulp-imagemin': '^2.1.0',
        'gulp-jshint': '^1.8.5',
        'gulp-load-plugins': '^0.8.0',
        'gulp-minify-css': '^0.4.4',
        'gulp-rev-all': '^0.7.5',
        'gulp-rev-replace': '^0.3.1',
        'gulp-sass': '^1.0.0',
        'gulp-shell': '^0.2.9',
        'gulp-size': '^1.1.0',
        'gulp-sourcemaps': '^1.3.0',
        'gulp-uglify': '^1.1.0',
        'gulp-uncss': '^1.0.0',
        'gulp-useref': '^1.0.2',
        'jshint-stylish': '^1.0.0',
        'merge-stream': '^0.1.6',
        'shelljs': '^0.3.0',
        'trash': '^1.4.0'
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    gulpfile: function() {

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    }
  }
});
