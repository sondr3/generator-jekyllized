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
<%  if (amazonS3 || rsync) { -%>
// 'fs' is used to read files from the system (used for uploading)
import fs from 'fs';
<% } -%>
<%  if (amazonS3) { -%>
// Parallelize the uploads when uploading to Amazon S3
import parallelize from 'concurrent-transform';
<% } -%>
// BrowserSync is used to live-reload your website
import browserSync from 'browser-sync';
const reload = browserSync.reload;
// AutoPrefixer
import autoprefixer from 'autoprefixer';
// Yargs for command line arguments
import {argv} from 'yargs';

/*
 * ORGANIZATION OF GULPFILE:
 *
 * 1. Cleaning assets and such
 * 2. Jekyll related tasks
 * 3. Development tasks
 * 4. Production and development tasks
 * 5. Development tasks
 * 6. Deployment tasks (if any)
 * 7. Various
 * 8. Serve tasks
 * 9. Main tasks
 *
 */

//
// 1. Cleaning tasks
//
gulp.task('clean:dist', () => {
  return del(['dist/']);
});
gulp.task('clean:assets', () => {
  return del(['.tmp/**/*', '!.tmp/assets', '!.tmp/assets/images', '!.tmp/assets/images/**/*', 'dist/assets']);
});
gulp.task('clean:gzip', () => {
  return del(['dist/**/*.gz']);
});
gulp.task('clean:metadata', () => {
  return del(['src/.jekyll-metadata']);
});

//
// 2. Jekyll tasks
//
// Build Jekyll without production settings
gulp.task('jekyll', done => {
  if (!argv.prod) {
    shell.exec('jekyll build');
    done();
  } else if (argv.prod) {
    shell.exec('jekyll build --config _config.yml,_config.build.yml');
    done();
  }
});

// Check Jekyll for configuration errors
gulp.task('jekyll:doctor', done => {
  shell.exec('jekyll doctor');
  done();
});

//
// 3. Development tasks
//
// Default: Creates a CSS file from your SCSS file and prefixes it with
// AutoPrefixer and creates a SourceMap and injects it into BrowserSync
// --prod: Same as above but it doesn't create a SourceMap and it minifies,
// gzips and cache busts it
gulp.task('styles', () =>
  gulp.src('src/assets/scss/style.scss')
    .pipe($.if(!argv.prod, $.sourcemaps.init()))
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({browsers: 'last 1 version'})
    ]))
    .pipe($.size({
      title: 'styles',
      showFiles: true
    }))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.if('*.css', $.minifyCss())))
    .pipe($.if(argv.prod, $.size({
      title: 'minified styles',
      showFiles: true
    })))
    .pipe($.if(argv.prod, $.rev()))
    .pipe($.if(!argv.prod, $.sourcemaps.write('.')))
    .pipe($.if(argv.prod, gulp.dest('.tmp/assets/stylesheets')))
    .pipe($.if(argv.prod, $.if('*.css', $.gzip({append: true}))))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped styles',
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    .pipe($.if(!argv.prod, browserSync.stream()))
);

// Dev task for scrips so they can be automatically injected into the browser
gulp.task('scripts', () =>
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  gulp.src([
    'src/assets/javascript/vendor.js',
    'src/assets/javascript/main.js'
  ])
    .pipe($.newer('.tmp/assets/javascript/index.js', {dest: '.tmp/assets/javascript', ext: '.js'}))
    .pipe($.if(!argv.prod, $.sourcemaps.init()))
    .pipe($.concat('index.js'))
    .pipe($.size({
      title: 'scripts',
      showFiles: true
    }))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.if('*.js', $.uglify({preserveComments: 'some'}))))
    .pipe($.if(argv.prod, $.rev()))
    .pipe($.if(argv.prod, $.size({
      title: 'optimized scripts',
      showFiles: true
    })))
    .pipe($.if(argv.prod, gulp.dest('.tmp/assets/javascript')))
    .pipe($.if(argv.prod, $.if('*.js', $.gzip({append: true}))))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped script',
      gzip: true,
      showFiles: true
    })))
    .pipe($.if(!argv.prod, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/assets/javascript'))
    .pipe($.if(!argv.prod, browserSync.stream()))
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

// Production task for HTML
gulp.task('html', () =>
  // We're going to minify all the HTML
  gulp.src('dist/**/*.html')
    // Through HTMLmin
    .pipe($.if(argv.prod, $.htmlmin({
      // Removing comments
      removeComments: true,
      // Removing white space
      collapseWhitespace: true,
      // And other minor optimizations
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    // Display the size of the minified HTML
    .pipe($.if(argv.prod, $.size({title: 'optimized HTML'})))
    // Output the minified HTML before gzipping it
    .pipe($.if(argv.prod, gulp.dest('dist')))
    // Gzip all the HTML files and append .gz
    .pipe($.if(argv.prod, $.gzip({append: true})))
    // Display the size of the gzipped file
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped script',
      gzip: true
    })))
    // Write them back to the 'dist' folder
    .pipe($.if(argv.prod, gulp.dest('dist')))
);

<% if (!noUpload) { %>//
// 6. Deployment tasks
//
<% } -%>
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
  var credentials = JSON.parse(fs.readFileSync('rsync-credentials.json', 'utf8'));

  return gulp.src('dist/**')
    .pipe($.rsync({
      // This uploads the contenst of 'root', instead of the folder
      root: 'dist',
      // Find your username, hostname and destination from your rsync-credentials.json
      hostname: credentials.hostname,
      username: credentials.username,
      destination: credentials.destination,
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
// 7. Various tasks
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

//
// 8. Serve tasks
//
// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task('serve', () => {
  browserSync({
    // tunnel: true,
    // open: false,
    server: {
      // Serve assets from '.tmp' instead of 'dist'
      baseDir: ['.tmp', 'dist']
    }
  });

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('jekyll', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('jekyll'));
  gulp.watch('src/assets/javascript/**/*.js', gulp.series('scripts'));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('src/assets/images/**/*', reload);
});

//
// 9. Main tasks
//
// Asset tasks for development and production
gulp.task('assets', gulp.series(
  gulp.series('clean:assets'),
  gulp.parallel('styles', 'scripts', 'fonts', 'images')
));

// Default task, run when just writing 'gulp' in the terminal
// Wires up your assets and such with the development settings etc
gulp.task('default', gulp.series(
  gulp.series('clean:assets', 'clean:gzip'),
  gulp.series('assets', 'inject:head', 'inject:footer'),
  gulp.series('jekyll', 'copy:assets', 'html'),
  gulp.series('serve')
));

// Builds your site with production settings and such
// Optimizes all your assets as well
gulp.task('build', gulp.series(
  gulp.series('clean:assets', 'clean:gzip'),
  gulp.series('assets', 'inject:head', 'inject:footer'),
  gulp.series('jekyll', 'copy:assets', 'html')
));

// Clean out your dist and .tmp folder and delete .jekyll-metadata
gulp.task('rebuild', gulp.series('clean:dist', 'clean:assets', 'clean:metadata'));

// Checks your JS and Jekyll for errors
gulp.task('check', gulp.series('jekyll:doctor', 'lint'));
