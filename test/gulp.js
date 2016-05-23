'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/gulp'))
    .withOptions({uploading: 'None'})
    .toPromise();
});

test.serial('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test.serial('creates package.json', () => {
  assert.file('package.json');
});

test.serial('package.json contains correct packages', () => {
  [
    '"autoprefixer": "^6.2.3"',
    '"browser-sync": "^2.11.0"',
    '"del": "^2.2.0"',
    '"gulp": "git://github.com/gulpjs/gulp.git#4.0"',
    '"gulp-cache": "^0.4.1"',
    '"gulp-concat": "^2.6.0"',
    '"gulp-cssnano": "^2.1.0"',
    '"gulp-eslint": "^2.0.0"',
    '"gulp-gzip": "^1.1.0"',
    '"gulp-htmlmin": "^1.3.0"',
    '"gulp-if": "^2.0.0"',
    '"gulp-imagemin": "^2.1.0"',
    '"gulp-inject": "^4.0.0"',
    '"gulp-load-plugins": "^1.2.0"',
    '"gulp-newer": "^1.1.0"',
    '"gulp-postcss": "^6.0.0"',
    '"gulp-rename": "^1.2.2"',
    '"gulp-rev": "^7.0.0"',
    '"gulp-sass": "^2.1.1"',
    '"gulp-size": "^2.0.0"',
    '"gulp-sourcemaps": "^1.3.0"',
    '"gulp-uglify": "^1.5.1"',
    '"gulp-uncss": "^1.0.0"',
    '"shelljs": "^0.6.0"',
    '"yargs": "^4.3.2"'
  ].forEach(pack => {
    assert.fileContent('package.json', pack);
  });
});

test.serial('contains default gulp tasks', () => {
  [
    'clean:assets',
    'clean:images',
    'clean:dist',
    'clean:gzip',
    'clean:jekyll',
    'jekyll:tmp',
    'jekyll',
    'jekyll:doctor',
    'styles',
    'scripts',
    'inject:head',
    'inject:footer',
    'images',
    'fonts',
    'html',
    'copy:assets',
    'copy:jekyll',
    'inject',
    'build:jekyll',
    'serve',
    'assets',
    'clean',
    'rebuild',
    'build',
    'check',
    'default'
  ].forEach(function (task) {
    assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
  });
});
