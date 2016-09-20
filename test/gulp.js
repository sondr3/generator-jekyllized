'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  var pkg = require('../package.json');

  var deps = [
    [helpers.createDummyGenerator(), 'statisk:gulp']
  ];

  return helpers.run(path.join(__dirname, '../generators/app'))
    .withOptions({
      name: pkg.name,
      version: pkg.version,
      uploading: 'None',
      babel: false,
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
    })
    .withGenerators(deps)
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates package.json', () => {
  assert.file('package.json');
});

test('creates comment about creation', () => {
  const pkg = require('../package.json');

  const date = (new Date()).toISOString().split('T')[0];
  assert.fileContent('gulpfile.js', '// generated on ' + date + ' using ' + pkg.name + ' ' + pkg.version);
});

test('does not create credentials files', () => {
  assert.noFile([
    'aws-credentials.json',
    'rsync-credentials.json'
  ]);
});

test('does not contain uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '',
      'gulp-babel': '',
      'concurrent-transform': '',
      'gulp-rsync': '',
      'gulp-gh-pages': ''
    }
  });
});

test('does not contain deploy task', () => {
  assert.noFileContent('gulpfile.js', 'gulp.task(\'upload');
  assert.noFileContent('gulpfile.js', 'gulp.task(\'deploy');
});

test('contains default gulp tasks', () => {
  [
    'clean:assets',
    'clean:images',
    'clean:dist',
    'clean:gzip',
    'clean:site',
    'scripts',
    'styles',
    'serve',
    'fonts',
    'html',
    'images',
    'copy:assets',
    'copy:site',
    'inject:head',
    'inject:footer',
    'inject',
    'build:site',
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

test('contains reload function', () => {
  assert.fileContent('gulpfile.js', 'function reload');
});

test('contains build tasks for Jekyll', () => {
  [
    'site:tmp',
    'site',
    'site:check'
  ].forEach(function (task) {
    assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
  });
});

test('package.json contains correct packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'autoprefixer': '^6.2.3',
      'babel-preset-es2015': '^6.9.0',
      'browser-sync': '^2.11.0',
      'del': '^2.2.0',
      'gulp': 'git://github.com/gulpjs/gulp.git#4.0',
      'gulp-cache': '^0.4.1',
      'gulp-concat': '^2.6.0',
      'gulp-cssnano': '^2.1.0',
      'gulp-gzip': '^1.1.0',
      'gulp-htmlmin': '^2.0.0',
      'gulp-if': '^2.0.0',
      'gulp-imagemin': '^3.0.0',
      'gulp-inject': '^4.0.0',
      'gulp-load-plugins': '^1.3.0',
      'gulp-newer': '^1.1.0',
      'gulp-postcss': '^6.0.0',
      'gulp-rename': '^1.2.2',
      'gulp-rev': '^7.0.0',
      'gulp-sass': '^2.1.1',
      'gulp-size': '^2.0.0',
      'gulp-sourcemaps': '^1.3.0',
      'gulp-uglify': '^1.5.1',
      'require-dir': '^0.3.0',
      'shelljs': '^0.7.0',
      'yargs': '^4.7.0'
    }
  });
});
