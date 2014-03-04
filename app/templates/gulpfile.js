// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// Directories used:
//    css:          <%= cssDirectory %>
//    sass:         <%= cssPreprocessorDirectory %>
//    javascript:   <%= javascriptDirectory %>
//    coffeescript: <%= javascriptPreprocessorDirectory %>
//    images:       <%= imageDirectory %>
//    fonts:        <%= fontsDirectory %>

var gulp = require('gulp');
// Since these gulp plugins contains hyphens they can't be properly
// configured with gulp-load-plugins
var runSequence = require('run-sequence');
var minifyHTML = require('gulp-minify-html');
// Used for Bower files (jQuery, Normalize etc)
var wiredep = require('wiredep').streams;

// Loads the plugins without having to list all of them, but you need 
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();

// Used for running a LiveReload Server and automatically opening your browser
gulp.task('connect', $.connect.server({
  // Declare what directory and port it runs from
  root: ['serve'],
  port: 4000,
  livereload: true,
  // Automatically opens Google Chrome when executed
  open: {
    browser: 'Google Chrome' // if not OS X this should be 'chrome'
  }
}));

// Cleans out the './serve' directory used for serving the site locally
gulp.task('clean-serve', function() {
    return gulp.src('./serve/**/*', { read: false })
      .pipe($.rimraf());
});

// Cleans out the './site' directory used when generating the site
gulp.task('clean-dist', function() {
    return gulp.src('./site/**/*', { read: false })
      .pipe($.rimraf());
});

// Runs the build command for Jekyll to (re)compile the site
// When watching the site for changes this will be executed every time a HTML or Markdown
// file is changed and the changes are available via LiveReload automatically
gulp.task('jekyll', function() {
  return gulp.src('')
    .pipe($.exec("jekyll build"));
});

// Runs every time a HTML file is changed in the './src' directory
// Also runs the 'jekyll' gulp task
gulp.task('html', ['jekyll'], function () {
  return gulp.src('./src/**/*.html')
    .pipe($.connect.reload());
});

// Runs every time a Markdown file with the .md extention is changed in the './src' directory
// Also runs the 'jekyll' gulp task
gulp.task('markdown',['jekyll'], function() {
  return gulp.src('./src/**/*.md')
    .pipe($.connect.reload());
});

// Compiles the SASS files and moved them into the '<%= cssDirectory %>' directory
gulp.task('sass', function() {
  // Only runs on the '<%= cssPreprocessorDirectory %>/main.scss' file so you need to import all the SCSS files in it
  return gulp.src('./src/<%= cssPreprocessorDirectory %>/main.scss')
    // Only runs if the file is actually changed, otherwise it will skip it
    .pipe($.changed('./src/<%= cssDirectory %>/**/*'))
    // Prevents it from creating a cache directory and disables warnings
  	.pipe($.sass({
      noCache: true,
      quiet: true
    }))
  	.pipe(gulp.dest('./src/<%= cssDirectory %>'));
});

// LiveReload for the CSS
gulp.task('stylesheets', function() {
	return gulp.src('./src/<%= cssDirectory %>/main.css')
    .pipe($.changed('./serve/<%= cssDirectory %>/**/*'))
  	.pipe(gulp.dest('./serve/<%= cssDirectory %>'))
    // Shows the file size in the terminal output
    .pipe($.size())
    // Connects the changes to the LoveReload server and reloads them when they change
    .pipe($.connect.reload());
});

// LiveReload for JS
gulp.task('scripts', function() {
    return gulp.src('./src/<%= javascriptDirectory %>/**/*.js')
      .pipe($.changed('./serve/<%= javascriptDirectory %>/**/*'))
      .pipe(gulp.dest('./serve/<%= javascriptDirectory %>'))
      .pipe($.size())
      .pipe($.connect.reload());
});

// LiveReload for images
gulp.task('images', function() {
  // Only works on PNG, JPEG and GIFs currently
  return gulp.src(['./src/<%= imageDirectory %>/**/*.jpg', './src/<%= imageDirectory %>/**/*.png', './src/<%= imageDirectory %>/**/*.gif'])
    .pipe($.changed('./serve/<%= imageDirectory %>/**/*'))
    .pipe(gulp.dest('./serve/<%= imageDirectory %>'))
    .pipe($.size())
    .pipe($.connect.reload());
});

// Minifies the HTML of the site
gulp.task('htmlify', function() {
    return gulp.src('./serve/**/*.html')
      .pipe(minifyHTML())
      .pipe(gulp.dest('./site'));
});

// Optimize the CSS with Autoprefixer and CSS Optimizer
gulp.task('cssoptimize', function() {
  return gulp.src('./serve/<%= cssDirectory %>/main.css')
    // Autoprefixes your CSS for the last version of the browers
    .pipe($.autoprefixer('last 1 version'))
    // Optimizes it via CSS Optimizer
    .pipe($.csso())
    .pipe(gulp.dest('./site/<%= cssDirectory %>'))
    .pipe($.size());
});

// Optimize images using image-min and only update changed files
gulp.task('imgoptimize', function() {
  return gulp.src(['./src/<%= imageDirectory %>/**/*.jpg', './src/<%= imageDirectory %>/**/*.png', './src/<%= imageDirectory %>/**/*.gif'])
    .pipe($.changed('./site/<%= imageDirectory %>/**/*'))
    .pipe($.imagemin({
      // Runs 16 trials on the PNGs to better the optimization
      // Can by anything from 1 to 7, for more see https://github.com/gruntjs/grunt-contrib-imagemin#optimizationlevel-png-only
      optimizationLevel: 3,
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true,
      // Enables pngquant lossy compression
      pngquant: true
    }))
    .pipe(gulp.dest('./site/<%= imageDirectory %>'))
    .pipe($.size());
});

// Optimize the JavaScript
gulp.task('jsoptimize', function() {
  return gulp.src('./serve/<%= javascriptDirectory %>/**/*.js')
    // Concats the JS files into one file, see '_layouts_default.html'
    .pipe($.useref())
    // Concats the files into one minimized one
    .pipe($.concat('all.min.js'))
    // Minifies the JS via Uglify
    .pipe($.uglify())
    .pipe(gulp.dest('site/<%= javascriptDirectory %>'))
    .pipe($.size());
});

// Run CSS Lint against your CSS
gulp.task('csslint', function() {
  gulp.src('./serve/assets/stylesheets/main.css')
  	// Lint your CSS to check for common errors
    .pipe($.csslint('.csslintrc'))
    .pipe($.csslint.reporter())
});

// Run JS Lint against your JS
gulp.task('jslint', function() {
  gulp.src('./serve/assets/javascript/*.js')
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter());
});

// Looks for changes for specific file types and runs it's task if it is changed
gulp.task('watch', function () {
  gulp.watch('./src/**/*.html', ['html']);
  gulp.watch('./src/_posts/**/*.md', ['markdown']);
  gulp.watch('./src/<%= imageDirectory %>/**/*', ['jekyll']);
  gulp.watch('./src/<%= cssPreprocessorDirectory %>/**/*.scss', ['sass']);
  gulp.watch('./src/<%= cssDirectory %>/**/*.css', ['stylesheets']);
  gulp.watch('./src/<%= javascriptDirectory %>/**/*.js', ['scripts']);
  gulp.watch('./src/<%= imageDirectory %>/**/*', ['images']);
});

// Default task, run when just writing 'gulp' in the terminal
// Runs the commands in sequence so they don't overlap
gulp.task('default', function(callback) {
  runSequence('clean-serve',
              'jekyll',
              ['sass', 'stylesheets', 'images', 'scripts'],
              'connect',
              'watch',
              callback);
});

// Check your CSS and JS for errors
gulp.task('check', ['csslint', 'jslint'], function() {
	// Whoop whoops
});

// Builds the site but doesn't serve it to you
gulp.task('build', function(callback) {
  runSequence('clean-serve',
              'jekyll',
              ['sass', 'stylesheets', 'images', 'scripts'],
              callback);
});

// Builds your site with the 'build' command and then runs all the optimizations on
// it and outputs it to './site'
gulp.task('publish', ['build'], function(callback) {
  runSequence('clean-dist',
              'htmlify',
              'cssoptimize',
              'imgoptimize',
              'jsoptimize',
              callback);
});