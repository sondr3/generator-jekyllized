'use strict';

import gulp from 'gulp';
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
// Delete stuff
import del from 'del';
// Used to run shell commands
import shell from 'shelljs';
<%  if (amazonS3) { -%>
// Parallelize the uploads when uploading to Amazon S3
// 'fs' is used to read files from the system (used for AWS uploading)
import fs from 'fs';
import parallelize from 'concurrent-transform';
<% } -%>
// BrowserSync is used to live-reload your website
import browserSync from 'browser-sync';
const reload = browserSync.reload;
// Wiredep is used to automatically wire up your Bower dependencies and
// main-bower-files is used to move the files to the 'assets/vendor folder
import wiredeps from 'wiredep';
const wiredep = wiredeps.stream;
import bowerFiles from 'main-bower-files';
// AutoPrefixer
import autoprefixer from 'autoprefixer-core';

/*
 * ORGANIZATION OF GULPFILE:
 *
 * 1. Cleaning assets and such
 * 2. Jekyll related tasks
 * 3. Development tasks
 * 4. Production and development tasks
 * 5. Development tasks
 * 6. Bower tasks
 * 7. Deployment tasks (if any)
 * 8. Various
 * 9. Serve tasks
 * 10. Main tasks
 *
 */

//
// 1. Cleaning tasks
//
gulp.task('clean:dist', del.bind(null, ['dist']));
gulp.task('clean:assets', del.bind(null, ['.tmp', 'dist/assets']));
gulp.task('clean:metadata', del.bind(null, ['src/.jekyll-metadata'], {dot: true}));

//
// 2. Jekyll tasks
//
// Build Jekyll without production settings
gulp.task('jekyll:dev', done => {
  shell.exec('jekyll build --quiet');
  done();
});

// Build Jekyll with production settings
gulp.task('jekyll:prod', done => {
  shell.exec('jekyll build --quiet --config _config.yml,_config.build.yml');
  done();
});

// Check Jekyll for configuration errors
gulp.task('jekyll:doctor', done => {
  shell.exec('jekyll doctor');
  done();
});

//
// 3. Development tasks
//
// Dev task for styles so they can be automatically injected into the browser
gulp.task('styles:dev', () =>
  // Don't use partials for best performance
  gulp.src('src/assets/scss/style.scss')
    // Initiate sourcemaps
    .pipe($.sourcemaps.init())
    // Run it through libsass
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    // Autoprefix things automagically
    .pipe($.postcss([
      autoprefixer({browsers: 'last 1 version'})
    ]))
    // Write the sourcemaps inline
    .pipe($.sourcemaps.write())
    // Display the size of the files
    .pipe($.size({
      title: 'styles',
      showFiles: true
    }))
    // Write it to the temporary directory
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    // Inject it directly into the browser
    .pipe(browserSync.stream())
);

// Dev task for scrips so they can be automatically injected into the browser
gulp.task('script:dev', () =>
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  gulp.src([
    'src/assets/javascript/vendor.js',
    'src/assets/javascript/main.js'
  ])
    // Initiate sourcemaps
    .pipe($.sourcemaps.init())
    // Concat all the JS files into a single file
    .pipe($.concat('index.js'))
    // Write the sourcemaps inline
    .pipe($.sourcemaps.write())
    // Display the size of the files
    .pipe($.size({
      title: 'scripts',
      showFiles: true
    }))
    // Write it to the temporary directory
    .pipe(gulp.dest('.tmp/assets/javascript'))
    // Inject it directly into the browser
    .pipe(browserSync.stream())
);

//
// 4. Production and development tasks
//
// Dev task for injecting the CSS into the HTML
gulp.task('inject:head', () =>
  // Change the include file instead of all the HTML files
  gulp.src('src/_includes/head.html')
    // Look for any CSS files in the 'stylesheets' directory
    // Don't read the files for performance and ignore the base directory
    .pipe($.inject(gulp.src('.tmp/assets/stylesheets/*.css',
                            {read: false}), {ignorePath: '.tmp'}))
    // Output the file back into it's directory
    .pipe(gulp.dest('src/_includes'))
);

// Dev task for injecting the JS into the HTML
gulp.task('inject:footer', () =>
  // Change the default layout file instead of all the HTML files
  gulp.src('src/_layouts/default.html')
    // Look for any JS files in the 'javascript' directory
    // Don't read the files for performance and ignore the base directory
    .pipe($.inject(gulp.src('.tmp/assets/javascript/*.js',
                            {read: false}), {ignorePath: '.tmp'}))
    // Output the file back into it's directory
    .pipe(gulp.dest('src/_layouts'))
);

// Production (and dev) task for images
gulp.task('images', () =>
  // Look for any kind of file in the images folder and subfolders
  // I hope you only put images here...
  gulp.src('src/assets/images/**/*')
    // Cache them so you don't repeatedly optimize them
    .pipe($.cache($.imagemin({
      // Progressively enhance JPEGs
      progressive: true,
      // Interlace PNGs
      interlaced: true
    })))
    // Output to both temporary and dist folders
    .pipe(gulp.dest('.tmp/assets/images'))
    // And display the size of the images
    .pipe($.size({title: 'images'}))
);

// Production (and dev) task for fonts
gulp.task('fonts', () =>
  // Look for any kind of file in the fonts folder and subfolders
  // You get the drift
  gulp.src('src/assets/fonts/**/*')
    // Copy them to the temporary and dist folder
    .pipe(gulp.dest('.tmp/assets/images'))
    // And display the size
    .pipe($.size({title: 'fonts'}))
);

// Copy the production assets into the dist folder, needs to be done this way
// because Jekyll overwrites the whole folder otherwise
gulp.task('copy:assets', () =>
  gulp.src('.tmp/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
);

//
// 5. Production tasks
//
// Production task for styles
gulp.task('styles', () =>
  // Don't include partials for performance
  gulp.src('src/assets/scss/style.scss')
    // Initiate sourcemaps
    .pipe($.sourcemaps.init())
    // Run it through libsass
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    // Autoprefix things automagically
    .pipe($.postcss([
      autoprefixer({browsers: 'last 1 version'})
    ]))
    // Rename to show it's minified
    .pipe($.rename('style.min.css'))
    // Minfiy the CSSS
    .pipe($.if('*.css', $.minifyCss()))
    // Display the size of the minified CSS
    .pipe($.size({
      title: 'minified styles',
      showFiles: true
    }))
    // Cache bust the files
    .pipe($.rev())
    // Write to asset folder
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    // Write the sourcemap into it's own file
    .pipe($.sourcemaps.write('.'))
    // Write even more to the asset folder
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    // Gzip the CSS file and append .gz
    .pipe($.if('*.css', $.gzip({append: true})))
    // Display the size of the gzipped file
    .pipe($.size({
      title: 'gzipped styles',
      gzip: true,
      showFiles: true
    }))
    // And put that too into the asset directory
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
);

// Production task for JavaScript
gulp.task('script', () =>
  // NOTE: The order your list the files in here are important, put vendor
  // files etc at the top
  gulp.src([
    'src/assets/javascript/vendor.js',
    'src/assets/javascript/main.js'
  ])
    // Initiate sourcemaps
    .pipe($.sourcemaps.init())
    // Concat all the JS files into a single file
    .pipe($.concat('index.js'))
    // Rename to show it's minified
    .pipe($.rename('index.min.js'))
    // Minify the JS files
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Cache bust the files
    .pipe($.rev())
    // Write the sourcemap into it's own file
    .pipe($.sourcemaps.write('.'))
    // Display the size of the minified JS
    .pipe($.size({
      title: 'optimized scripts',
      showFiles: true
    }))
    // Write to asset folder
    .pipe(gulp.dest('.tmp/assets/javascript'))
    // Gzip the JS file and append .gz
    .pipe($.if('*.js', $.gzip({append: true})))
    // Display the size of the gzipped file
    .pipe($.size({
      title: 'gzipped script',
      gzip: true,
      showFiles: true
    }))
    // And put that too into the asset directory
    .pipe(gulp.dest('.tmp/assets/javascript'))
);

// Production task for HTML
gulp.task('html', () =>
  // We're going to minify all the HTML
  gulp.src('dist/**/*.html')
    // Through HTMLmin
    .pipe($.htmlmin({
      // Removing comments
      removeComments: true,
      // Removing white space
      collapseWhitespace: true,
      // And other minor optimizations
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    }))
    // Display the size of the minified HTML
    .pipe($.size({title: 'optimized HTML'}))
    // Output the minified HTML before gzipping it
    .pipe(gulp.dest('dist'))
    // Gzip all the HTML files and append .gz
    .pipe($.gzip({append: true}))
    // Display the size of the gzipped file
    .pipe($.size({
      title: 'gzipped script',
      gzip: true
    }))
    // Write them back to the 'dist' folder
    .pipe(gulp.dest('dist'))
);

//
// 6. Bower tasks
//
// Wires your Bower dependencies into their own include file that are then
// inserted into the default layout, automatically adding JS and CSS
gulp.task('bower', () => {
  // Bower dependencies to exlude, for example:
  // const bowerExcludes = ['jquery'];
  const bowerExcludes = [];

  return gulp.src('src/_includes/bower_{scripts,styles}.html')
    .pipe(wiredep({
      exclude: bowerExcludes,
      fileTypes: {
        html: {
          replace: {
            js: filePath => {
              return '<script src="' + '/assets/vendor/' + filePath.split('/').pop() + '"></script>'; //eslint-disable-line
            },
            css: filePath => {
              return '<link rel="stylesheet" href="' + '/assets/vendor/' + filePath.split('/').pop() + '"/>'; //eslint-disable-line
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('src/_includes'));
});

// Copies the Bower dependencies into the '.tmp' folder so they work with
// BrowserSync
gulp.task('bower:files', () => {
  return gulp.src(bowerFiles())
    .pipe(gulp.dest('.tmp/assets/vendor'))
    .pipe($.size({title: 'Bower assets for development'}));
});

<% if (amazonS3) { -%>
// Task to deploy your site to Amazon S3 and Cloudfront
gulp.task('deploy', () => {
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
});

<% } -%><% if (rsync) { -%>
// Task to upload your site via Rsync to your server
gulp.task('deploy', () => {
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
});

<% } -%><% if (ghpages) { -%>
// Task to upload your site to your personal GH Pages repo
gulp.task('deploy', () => {
  // Deploys your optimized site, you can change the settings in the html task if you want to
  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      // Currently only personal GitHub Pages are supported so it will upload to the master
      // branch and automatically overwrite anything that is in the directory
      branch: 'master'
    }));
});

<% } -%>
<% if (noUpload) { -%><% } -%>
//
// 8. Various tasks
//
// Lint your JavaScript to look for errors and style errors
gulp.task('lint', () =>
  // Only look in the relevant JS files
  gulp.src([
    'gulpfile.babel.js',
    '.tmp/assets/javascript/*.js',
    '!.tmp/assets/javascript/*.min.js'
  ])
  // Run through ESlint with XO settings
  .pipe($.eslint())
  // Format it nicely
  .pipe($.eslint.formatEach())
  // And fail if need be
  .pipe($.eslint.failOnError())
);

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task('serve', () => {
  browserSync({
    // tunnel: true,
    server: {
      // Serve assets from '.tmp' instead of 'dist'
      baseDir: ['.tmp', 'dist']
    }
  });

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.xml', //eslint-disable-line
              'src/**/*.txt', 'src/**/*.yml']), gulp.series('jekyll:dev', reload);
  gulp.watch('src/assets/javascript/**/*.js', gulp.series('script:dev'));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles:dev'));
  gulp.watch('src/assets/images/**/*', reload);
});

// Serve the finished site for final review
gulp.task('serve:dist', () => {
  browserSync({
    server: {
      baseDir: ['dist']
    }
  });
});

// Asset tasks for development and production
gulp.task('assets:dev', gulp.series('clean:assets', 'styles:dev', 'script:dev', 'fonts', 'images'));
gulp.task('assets', gulp.series('clean:assets', 'styles', 'script', 'fonts', 'images'));

// Default task, run when just writing 'gulp' in the terminal
// Wires up your assets and such with the development settings etc
gulp.task('default', gulp.series(
  gulp.series('assets:dev', 'inject:head', 'inject:footer'),
  gulp.series('jekyll:dev', 'copy:assets'),
  gulp.series('serve')
));

// Builds your site with production settings and such
// Optimizes all your assets as well
gulp.task('build', gulp.series(
  gulp.series('assets', 'inject:head', 'inject:footer'),
  gulp.series('jekyll:prod', 'copy:assets'),
  gulp.series('html')
));

// Clean out your dist and .tmp folder and delete .jekyll-metadata
gulp.task('rebuild', gulp.series('clean:dist', 'clean:assets', 'clean:metadata'));

// Checks your JS and Jekyll for errors
gulp.task('check', gulp.series('jekyll:doctor', 'lint'));
