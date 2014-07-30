// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// Directories used:
//    css:          <%= cssDirectory %>
//    sass:         <%= cssPreprocessorDirectory %>
//    javascript:   <%= javascriptDirectory %>
//    images:       <%= imageDirectory %>
//    fonts:        <%= fontsDirectory %>

var gulp = require('gulp');
// Used for Bower files (jQuery, Normalize etc)
var wiredep = require('wiredep').streams;
// Loads the plugins without having to list all of them, but you need 
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
// 'del' is used to clean out directories and such
var del = require('del');
// 'fs' is used to read files from the system (used for AWS uploading)
var fs = require('fs');
// BrowserSync isn't a gulp package, and needs to be loaded manually
var browserSync = require('browser-sync');
// merge is used to merge the output from two different streams into the same stream
var merge = require('merge-stream');
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.relad;
// And define a variable that BrowserSync uses in it's function
var bs;

// Cleans out the './serve' directory used for serving the site locally
gulp.task('clean:serve', del.bind(null, ['serve']));

// Cleans out the './site' directory used when generating the site
gulp.task('clean:dist', del.bind(null, ['site']));

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task('jekyll:serve', $.shell.task('jekyll build'));

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don't end up publishing your drafts or future posts
gulp.task('jekyll:build', $.shell.task('jekyll build --config _config.yml,_config.build.yml'));

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

// Move the '.txt' and '.xml' files from './serve' to './site'
gulp.task('move', function() {
  return gulp.src(['./serve/**/*.xml', './serve/**/*.txt'])
    .pipe(gulp.dest('./site'))
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
  	// Check your CSS quality against your .csslintrc file
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

// Runs 'jekyll doctor' on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task('doctor', $.shell.task('jekyll doctor'));

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task('serve', function() {
    bs = browserSync({
        notify: false,
        // tunnel: '',
        server: {
            baseDir: 'serve'
        }
    }):

    // These tasks will look for files that change while serving and will auto-regenerate or
    // reload the website accordingly. Update or add other files you need to be watched.
    gulp.watch(['src/**/*.md', 'src/**/*.html'], ['jekyll:serve']);
    gulp.watch(['serve/**/*.html', 'serve/**/*.css', 'serve/**/*.js'], reload);
    gulp.watch(['src/assets/_scss/**/*.scss'], ['style:scss']);
    gulp.wathc(['src/assets/stylesheets/**/*.css'], ['style:css', reload]);
});

// Serve the site after optimizations to see that everything looks fine
gulp.task('serve:dist', function() {
    bs = browserSync({
        notify: false,
        server: {
            baseDir: 'site'
        }
    });
});

// Default task, run when just writing 'gulp' in the terminal
gulp.task('default', ['clean-serve', 'jekyll-serve', 'sass', 
                      'stylesheets', 'scripts', 'images'], function() {
  gulp.start('connect', 'watch');
});

// Checks your CSS, JS and Jekyll for errors
gulp.task('check', ['csslint', 'jslint', 'doctor'], function() {
  // Better hope nothing is wrong.
});

// Builds the site but doesn't serve it to you
gulp.task('build', ['clean-serve', 'jekyll-build',
                    'sass', 'stylesheets', 
                    'images', 'scripts'], function() {
});

// Builds your site with the 'build' command and then runs all the optimizations on
// it and outputs it to './site'
gulp.task('publish', ['build', 'clean-dist'], function() {
  gulp.start('htmlify', 'cssoptimize', 'move',
              'imgoptimize', 'jsoptimize');
});
