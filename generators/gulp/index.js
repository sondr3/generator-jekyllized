'use strict';

var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('uploading', {
      required: true,
      name: 'uploading',
      type: 'list',
      message: 'How do you want to upload your site?',
      choices: ['Amazon S3', 'Rsync', 'Github Pages', 'None']
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      pkg.devDependencies = pkg.devDependencies || {};
      _.extend(pkg.devDependencies, {
        'autoprefixer': '^6.0.3',
        'babel-core': '^5.8.24',
        'babel-eslint': '^4.1.1',
        'browser-sync': '^2.9.3',
        'del': '^2.0.0',
        'eslint': '^1.4.1',
        'eslint-config-xo': '^0.6.0',
        'eslint-config-xo-space': '^0.5.0',
        'gulp': 'git://github.com/gulpjs/gulp.git#4.0',
        'gulp-cache': '~0.3.0',
        'gulp-concat': '^2.6.0',
        'gulp-eslint': '^1.0.0',
        'gulp-gzip': '^1.1.0',
        'gulp-htmlmin': '^1.0.0',
        'gulp-if': '^1.2.4',
        'gulp-imagemin': '^2.1.0',
        'gulp-inject': '^2.2.0',
        'gulp-load-plugins': '^1.0.0-rc.1',
        'gulp-minify-css': '^1.2.0',
        'gulp-newer': '^1.0.0',
        'gulp-postcss': '^6.0.0',
        'gulp-rename': '^1.2.2',
        'gulp-rev': '^6.0.0',
        'gulp-sass': '^2.0.2',
        'gulp-size': '^2.0.0',
        'gulp-sourcemaps': '^1.3.0',
        'gulp-uglify': '^1.4.1',
        'gulp-uncss': '^1.0.0',
        'shelljs': '^0.5.1'
      });

      if (this.options.uploading === 'Amazon S3') {
        pkg.devDependencies['gulp-awspublish'] = '^2.0.0';
        pkg.devDependencies['gulp-awspublish-router'] = '^0.1.0';
        pkg.devDependencies['concurrent-transform'] = '^1.0.0';
      }

      if (this.options.uploading === 'Rsync') {
        pkg.devDependencies['gulp-rsync'] = '^0.0.5';
      }

      if (this.options.uploading === 'Github Pages') {
        pkg.devDependencies['gulp-gh-pages'] = '^0.5.2';
      }

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          amazonS3: this.options.uploading === 'Amazon S3',
          rsync: this.options.uploading === 'Rsync',
          ghpages: this.options.uploading === 'Github Pages',
          noUpload: this.options.uploading === 'None'
        }
      );

      if (this.options.uploading === 'Amazon S3') {
        this.fs.copyTpl(
          this.templatePath('aws-credentials.json'),
          this.destinationPath('aws-credentials.json')
        );
      }

      if (this.options.uploading === 'Rsync') {
        this.fs.copyTpl(
          this.templatePath('rsync-credentials.json'),
          this.destinationPath('rsync-credentials.json')
        );
      }
    }
  }
});
