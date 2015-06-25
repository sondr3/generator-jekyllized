'use strict';

var gulp = require('gulp');
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require('gulp-load-plugins')();
// 'trash' is used to clean out directories and such
var trash = require('trash');
// Used to run shell commands
var shell = require('shelljs');
<%  if (amazonS3) { -%>
// Parallelize the uploads when uploading to Amazon S3
// 'fs' is used to read files from the system (used for AWS uploading)
var fs = require('fs');
var parallelize = require('concurrent-transform');
<% } -%>
// BrowserSync is used to live-reload your website
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// merge is used to merge the output from two different streams into the same stream
var merge = require('merge-stream');

// Deletes the directory that the optimized site is output to
function cleanDist(done) { trash(['dist']); done(); }
function cleanAssets(done) { trash(['.tmp']); done(); }
function rebuild(done) { trash(['src/.jekyll-metadata']); done(); } // so Jekyll rebuilds the site properly

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
function jekyllDev(done) { shell.exec('jekyll build --quiet'); done(); }

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don't end up publishing your drafts or future posts
function jekyllProd(done) {
  shell.exec('jekyll build --quiet --config _config.yml,_config.build.yml');
  done();
}

// Compiles the SASS files and moves them into the 'assets/stylesheets' directory
function styles() {
  // Looks at the style.scss file for what to include and creates a style.css file
  return gulp.src('src/assets/scss/**/*.scss')
    // Start creation of sourcemaps
    .pipe($.sourcemaps.init())
      .pipe($.sass({errLogToconsole: true}))
      // AutoPrefix your CSS so it works between browsers
      .pipe($.autoprefixer('last 1 version', {cascade: true}))
    // Write the sourcemaps to the directory of the gulp.src stream
    .pipe($.sourcemaps.write('.'))
    // Directory your CSS file goes to
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    // Outputs the size of the CSS file
    .pipe($.size({title: 'styles'}))
    // Injects the CSS changes to your browser since Jekyll doesn't rebuild the CSS
    .pipe(reload({stream: true}));
}

// Mostly used to create sourcemaps and live-reload JS
function javascript() {
  return gulp.src('src/assets/javascript/**/*.js')
    .pipe($.sourcemaps.init())
      .pipe($.uglify({compress: false, preserveComments: 'all'}))
      .pipe($.groupConcat({
        'index.js': 'src/assets/javascript/**/*.js'
      }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/assets/javascript'))
    .pipe($.size({title: 'javascript'}))
    .pipe(reload({stream: true}));
}

// Optimizes the images that exists
function images() {
  return gulp.src('src/assets/images/**/*')
    // Does not run on images that are already optimized
    .pipe($.cache($.imagemin({
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true
    })))
    .pipe(gulp.dest('.tmp/assets/images'))
    .pipe($.size({title: 'images'}));
}

// Copy over fonts to the '.tmp' directory
function fonts() {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('.tmp/assets/font'))
    .pipe($.size({title: 'fonts'}));
}

// Copy optimized images and (not optimized) fonts to the 'dist' folder
function copy() {
  var images = gulp.src('.tmp/assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size({title: 'copied images'}));

  var fonts = gulp.src('.tmp/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe($.size({title: 'copied fonts'}));

  return merge(images, fonts);
}

// Optimizes all the CSS, HTML and concats the JS etc
function optimize() {
  var assets = $.useref.assets({searchPath: ['dist', '.tmp']});

  return gulp.src('dist/**/*.html')
    .pipe(assets)
    // Concatenate JavaScript files and preserve important comments
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Minify CSS
    .pipe($.if('*.css', $.minifyCss()))
    // Start cache busting the files
    .pipe($.revAll({
      quiet: true,
      ignore: ['.eot', '.svg', '.ttf', '.woff', '.woff2']
    }))
    .pipe(assets.restore())
    // Conctenate your files based on what you specified in _layout/header.html
    .pipe($.useref())
    // Replace the asset names with their cache busted names
    .pipe($.revReplace())
    // Minify HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    // Send the output to the correct folder
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'optimizations'}));
}

<% if (amazonS3) { -%>
// Task to deploy your site to Amazon S3 and Cloudfront
function deploy() {
  // Generate the needed credentials (bucket, secret key etc) from a 'hidden' JSON file
  var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
  var publisher = $.awspublish.create(credentials);
  // Give your files the proper headers

  gulp.src('dist/**/*')
    .pipe($.awspublishRouter({
      routes: {
        '^assets/(?:.+)\\.(?:js|css)$': {
          key: '$&',
          headers: {
            'Cache-Control': 'max-age=315360000, no-transform, public',
            'Content-Encoding': 'gzip'
          }
        },

        '^assets/(?:.+)\\.(?:jpg|png|gif)$': {
          key: '$&',
          headers: {
            'Cache-Control': 'max-age=315360000, no-transform, public',
            'Content-Encoding': 'gzip'
          }
        },

        '^assets/fonts/(?:.+)\\.(?:eot|svg|ttf|woff)$': {
          key: '$&',
          headers: {
            'Cache-Control': 'max-age=315360000, no-transform, public'
          }
        },

        '^.+\\.html': {
          key: '$&',
          headers: {
            'Cache-Control': 'max-age=0, no-transform, public',
            'Content-Encoding': 'gzip'
          }
        },
        '^.+$': '$&'
      }
    }))
    // Gzip the files for moar speed
    .pipe($.awspublish.gzip())
    // Parallelize the number of concurrent uploads, in this case 30
    .pipe(parallelize(publisher.publish(), 30))
    // Have your files in the system cache so you don't have to recheck all the files every time
    .pipe(publisher.cache())
    // Synchronize the contents of the bucket and local (this deletes everything that isn't in local!)
    .pipe(publisher.sync())
    // And print the ouput, glorious
    .pipe($.awspublish.reporter())
    // And update the default root object
    .pipe($.cloudfront(credentials));
}

<% } -%><% if (rsync) { -%>
// Task to upload your site via Rsync to your server
function deploy() {
  // Load in the variables needed for our Rsync synchronization
  var secret = require('./rsync-credentials.json');

  return gulp.src('dist/**')
    .pipe($.rsync({
      // This uploads the contenst of 'root', instead of the folder
      root: 'dist',
      // Find your username, hostname and destination from your rsync-credentials.json
      hostname: secret.hostname,
      username: secret.username,
      destination: secret.destination,
      // Incremental uploading, adds a small delay but minimizes the amount of files transferred
      incremental: true,
      // Shows the progress on your files while uploading
      progress: true
    }));
}

<% } -%><% if (ghpages) { -%>
// Task to upload your site to your personal GH Pages repo
function deploy() {
  // Deploys your optimized site, you can change the settings in the html task if you want to
  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      // Currently only personal GitHub Pages are supported so it will upload to the master
      // branch and automatically overwrite anything that is in the directory
      branch: 'master'
    }));
}

<% } -%>
<% if (noUpload) { -%><% } -%>
// Run JS Lint against your JS
function jslint() {
  gulp.src('.tmp/assets/javascript/*.js')
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter());
}

// Runs 'jekyll doctor' on your site to check for errors with your configuration
// and will check for URL errors a well
function doctor(done) { shell.exec('jekyll doctor'); done(); }

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
function serve() {
  browserSync({
    notify: true,
    // tunnel: true,
    server: {
      baseDir: ['dist', '.tmp']
    }
  });

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md',
              'src/**/*.html',
              'src/**/*.xml',
              'src/**/*.txt',
              'src/**/*.yml'],
              gulp.series(jekyllDev, reload));
  gulp.watch('src/assets/javascript/**/*.js', javascript);
  gulp.watch('src/assets/scss/**/*.scss', styles);
  gulp.watch('src/assets/images/**/*', reload);
}

// Default task, run when just writing 'gulp' in the terminal
gulp.task('default', gulp.series(
      gulp.series(jekyllDev),
      gulp.parallel(styles, javascript, fonts, images),
      gulp.series(serve)
));

// Builds your site with the 'build' command and then runs all the optimizations on
// it and outputs it to './dist'
gulp.task('optimize', gulp.series(
      gulp.series(rebuild, jekyllProd),
      gulp.parallel(styles, javascript, fonts, images, copy),
      gulp.series(optimize)
));

gulp.task('build', gulp.series(
      gulp.series(jekyllDev),
      gulp.parallel(styles, javascript, fonts, images)
));
<% if (!noUpload) { -%>

// Deploy your site for all to see
gulp.task('deploy', deploy);
<% } -%>

// Serves your site locally
gulp.task('serve', serve);

// Clean out your dist and .tmp folder and delete .jekyll-metadata
gulp.task('clean', cleanDist);
gulp.task('clean:assets', cleanAssets);
gulp.task('rebuild', gulp.series(cleanDist, cleanAssets, rebuild));

// Create your styles and create sourcemaps
gulp.task('styles', styles);

// Create sourcemaps for your JS files
gulp.task('javascript', javascript);

// Checks your CSS, JS and Jekyll for errors
gulp.task('check', gulp.series(doctor, jslint));
