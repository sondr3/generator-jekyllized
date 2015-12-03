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

// 'gulp clean:assets' -- deletes all assets except for images
// 'gulp clean:dist' -- erases the dist folder
// 'gulp clean:gzip' -- erases all the gzipped files
// 'gulp clean:metadata' -- deletes the metadata file for Jekyll
gulp.task('clean:assets', () => {
  return del(['.tmp/**/*', '!.tmp/assets', '!.tmp/assets/images', '!.tmp/assets/images/**/*', 'dist/assets']);
});
gulp.task('clean:dist', () => {
  return del(['dist/']);
});
gulp.task('clean:gzip', () => {
  return del(['dist/**/*.gz']);
});
gulp.task('clean:metadata', () => {
  return del(['src/.jekyll-metadata']);
});

// 'gulp jekyll' -- builds your site with development settings
// 'gulp jekyll --prod' -- builds your site with production settings
gulp.task('jekyll', done => {
  if (!argv.prod) {
    shell.exec('jekyll build');
    done();
  } else if (argv.prod) {
    shell.exec('jekyll build --config _config.yml,_config.build.yml');
    done();
  }
});

// 'gulp doctor' -- literally just runs jekyll doctor
gulp.task('jekyll:doctor', done => {
  shell.exec('jekyll doctor');
  done();
});

// 'gulp styles' -- creates a CSS file from your SASS, adds prefixes and
// creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SASS, adds prefixes and
// then minifies, gzips and cache busts it. Does not create a Sourcemap
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

// 'gulp scripts' -- creates a index.js file from your JavaScript files and
// creates a Sourcemap for it
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
// minifies, gzips and cache busts it. Does not create a Sourcemap
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
    .pipe($.if(argv.prod, $.size({
      title: 'minified scripts',
      showFiles: true
    })))
    .pipe($.if(argv.prod, $.rev()))
    .pipe($.if(!argv.prod, $.sourcemaps.write('.')))
    .pipe($.if(argv.prod, gulp.dest('.tmp/assets/javascript')))
    .pipe($.if(argv.prod, $.if('*.js', $.gzip({append: true}))))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped scripts',
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/javascript'))
    .pipe($.if(!argv.prod, browserSync.stream()))
);

// 'gulp inject:head' -- injects our style.css file into the head of our HTML
gulp.task('inject:head', () =>
  gulp.src('src/_includes/head.html')
    .pipe($.inject(gulp.src('.tmp/assets/stylesheets/*.css',
                            {read: false}), {ignorePath: '.tmp'}))
    .pipe(gulp.dest('src/_includes'))
);

// 'gulp inject:footer' -- injects our index.js file into the end of our HTML
gulp.task('inject:footer', () =>
  gulp.src('src/_layouts/default.html')
    .pipe($.inject(gulp.src('.tmp/assets/javascript/*.js',
                            {read: false}), {ignorePath: '.tmp'}))
    .pipe(gulp.dest('src/_layouts'))
);

// 'gulp images' -- optimizes and caches your images
gulp.task('images', () =>
  gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('.tmp/assets/images'))
    .pipe($.size({title: 'images'}))
);

// 'gulp fonts' -- copies your fonts to the temporary assets folder
gulp.task('fonts', () =>
  gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('.tmp/assets/images'))
    .pipe($.size({title: 'fonts'}))
);

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips our HTML files
gulp.task('html', () =>
  gulp.src('dist/**/*.html')
    .pipe($.if(argv.prod, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    .pipe($.if(argv.prod, $.size({title: 'optimized HTML'})))
    .pipe($.if(argv.prod, gulp.dest('dist')))
    .pipe($.if(argv.prod, $.gzip({append: true})))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped HTML',
      gzip: true
    })))
    .pipe($.if(argv.prod, gulp.dest('dist')))
);

<% if (amazonS3) { -%>
// 'gulp deploy' -- reads from your AWS Credentials file, creates the correct
// headers for your files and uploads them to S3
gulp.task('deploy', () => {
  var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
  var publisher = $.awspublish.create(credentials);

  var headers = {
    'Cache-Control': 'max-axe=315360000, no-transform, public'
  };

  gulp.src('dist/**/*')
    .pipe($.awspublish.gzip())
    .pipe(parallelize(publisher.publish(headers), 30))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe($.awspublish.reporter());
});

<% } -%><% if (rsync) { -%>
// 'gulp deploy' -- reads from your Rsync credentials file and incrementally
// uploads your site to your server
gulp.task('deploy', () => {
  var credentials = JSON.parse(fs.readFileSync('rsync-credentials.json', 'utf8'));

  return gulp.src('dist/**')
    .pipe($.rsync({
      root: 'dist',
      hostname: credentials.hostname,
      username: credentials.username,
      destination: credentials.destination,
      incremental: true
    }));
});

<% } -%><% if (ghpages) { -%>
// 'gulp deploy' -- pushes your dist folder to Github
gulp.task('deploy', () => {
  return gulp.src('dist/**/*')
    .pipe($.ghPages());
});

<% } -%>
<% if (noUpload) { -%><% } -%>
// 'gulp lint' -- check your JS for formatting errors using XO Space
gulp.task('lint', () =>
  gulp.src([
    'gulpfile.babel.js',
    '.tmp/assets/javascript/*.js',
    '!.tmp/assets/javascript/*.min.js'
  ])
  .pipe($.eslint())
  .pipe($.eslint.formatEach())
  .pipe($.eslint.failOnError())
);

// 'gulp serve' -- open up your website in your browser and watch for changes
// in all your files and update them when needed
gulp.task('serve', () => {
  browserSync({
    // tunnel: true,
    // open: false,
    server: {
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

// 'gulp assets' -- cleans out your assets and rebuilds them
// 'gulp assets --prod' -- cleans out your assets and rebuilds them with
// production settings
gulp.task('assets', gulp.series(
  gulp.series('clean:assets'),
  gulp.parallel('styles', 'scripts', 'fonts', 'images')
));

// 'gulp assets:copy' -- copies the assets into the dist folder, needs to be
// done this way because Jekyll overwrites the whole folder otherwise
gulp.task('assets:copy', () =>
  gulp.src('.tmp/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
);

// 'gulp' -- cleans your assets and gzipped files, creates your assets and
// injects them into the templates, then builds your site, copied the assets
// into their directory and serves the site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series(
  gulp.series('clean:assets', 'clean:gzip'),
  gulp.series('assets', 'inject:head', 'inject:footer'),
  gulp.series('jekyll', 'assets:copy', 'html'),
  gulp.series('serve')
));

// 'gulp build' -- same as 'gulp' but doesn't serve your site in your browser
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series(
  gulp.series('clean:assets', 'clean:gzip'),
  gulp.series('assets', 'inject:head', 'inject:footer'),
  gulp.series('jekyll', 'assets:copy', 'html')
));

// 'gulp clean' -- erases your assets and gzipped files
gulp.task('clean', gulp.series('clean:assets', 'clean:gzip'));

// 'gulp rebuild' -- WARNING: Erases your assets and built site, use only when
// you need to do a complete rebuild
gulp.task('rebuild', gulp.series('clean:dist', 'clean:assets',
'clean:metadata'));

// 'gulp check' -- checks your Jekyll configuration for errors and lint your JS
gulp.task('check', gulp.series('jekyll:doctor', 'lint'));
