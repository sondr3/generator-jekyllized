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
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// AutoPrefixer
import autoprefixer from 'autoprefixer';
// Yargs for command line arguments
import {argv} from 'yargs';

var basePaths = {
  dest: 'dist/',
  tmp: '.tmp/'
};

var paths = {
  assetsBuilt: basePaths.tmp + 'assets-built/',
  jekyllBuilt: basePaths.tmp + 'jekyll-built/',
  jekyllPreprocessedSrc: basePaths.tmp + 'jekyll-preprocessed-src/',
  destAssets: basePaths.dest + 'assets/'
};

// 'gulp clean:assets' -- deletes all assets except for images and favicon
// 'gulp clean:images' -- deletes your images
// 'gulp clean:favicon' -- deletes favicon
// 'gulp clean:dist' -- erases the dist directory
// 'gulp clean:jekyll-built' -- deletes the jekyll-built directory
// 'gulp clean:metadata' -- deletes the metadata file for Jekyll
// 'gulp clean:jekyll-preprocessed-src' -- deletes the jekyll build source
gulp.task('clean:assets', () => {
  return del([paths.assetsBuilt + 'assets/**/*', '!' + paths.assetsBuilt + 'assets/favicon.ico', '!' + paths.assetsBuilt + 'assets/images', '!' + paths.assetsBuilt + 'assets/images/**/*']);
});
gulp.task('clean:images', () => {
  return del([paths.assetsBuilt + 'assets/images']);
});
gulp.task('clean:favicon', () => {
  return del([paths.assetsBuilt + 'assets/favicon.ico']);
});
gulp.task('clean:dist-assets', () => {
  return del([paths.destAssets]);
});
gulp.task('clean:dist-jekyll', () => {
  return del(['!' + basePaths.dest, basePaths.dest + '**/*', '!' + paths.destAssets, '!' + paths.destAssets + '**/*']);
});
gulp.task('clean:dist', gulp.series(
  gulp.parallel('clean:dist-assets', 'clean:dist-jekyll')
));
gulp.task('clean:jekyll-built', () => {
  return del([paths.jekyllBuilt]);
});
gulp.task('clean:metadata', () => {
  return del(['src/.jekyll-metadata']);
});
gulp.task('clean:jekyll-preprocessed-src', () => {
  return del([paths.jekyllPreprocessedSrc]);
});
gulp.task('clean:assets-built', () => {
  return del([paths.assetsBuilt]);
});

// 'gulp clean' -- cleans the project
gulp.task('clean', gulp.parallel('clean:images', 'clean:assets', 'clean:dist', 'clean:jekyll-built', 'clean:metadata', 'clean:jekyll-preprocessed-src', 'clean:assets-built'));

// 'gulp jekyll-preprocessed-src' -- copies Jekyll data to temporary
// jekyll-preprocessed-src directory before running the source pre-processing
// tasks like inject:*
gulp.task('jekyll-preprocessed-src', () =>
  gulp.src(['src/**/*', '!src/assets/**/*', '!src/assets'])
    .pipe(gulp.dest(paths.jekyllPreprocessedSrc))
    .pipe($.size({title: 'jekyll-preprocessed-src'}))
);

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
    .pipe($.if(argv.prod, $.if('*.css', $.cssnano({autoprefixer: false}))))
    .pipe($.if(argv.prod, $.size({
      title: 'minified styles',
      showFiles: true
    })))
    .pipe($.if(argv.prod, $.rev()))
    .pipe($.if(!argv.prod, $.sourcemaps.write('.')))
    .pipe($.if(argv.prod, gulp.dest(paths.assetsBuilt + 'assets/stylesheets')))
    .pipe($.if(argv.prod, $.if('*.css', $.gzip({append: true}))))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped styles',
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest(paths.assetsBuilt + 'assets/stylesheets'))
    .pipe($.if(!argv.prod, browserSync.stream({match: '**/*.css'})))
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
    .pipe($.newer(paths.assetsBuilt + 'assets/javascript/index.js', {dest: paths.assetsBuilt + 'assets/javascript', ext: '.js'}))
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
    .pipe($.if(argv.prod, gulp.dest(paths.assetsBuilt + 'assets/javascript')))
    .pipe($.if(argv.prod, $.if('*.js', $.gzip({append: true}))))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped scripts',
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest(paths.assetsBuilt + 'assets/javascript'))
    .pipe($.if(!argv.prod, browserSync.stream({match: '**/*.js'})))
);

// 'gulp inject:head' -- injects our style.css file into the head of our HTML
gulp.task('inject:head', () =>
  gulp.src(paths.jekyllPreprocessedSrc + '_includes/head.html')
    .pipe($.inject(gulp.src(paths.assetsBuilt + 'assets/stylesheets/*.css',
                            {read: false}), {ignorePath: paths.assetsBuilt}))
    .pipe(gulp.dest(paths.jekyllPreprocessedSrc + '_includes'))
);

// 'gulp inject:footer' -- injects our index.js file into the end of our HTML
gulp.task('inject:footer', () =>
  gulp.src(paths.jekyllPreprocessedSrc + '_layouts/default.html')
    .pipe($.inject(gulp.src(paths.assetsBuilt + 'assets/javascript/*.js',
                            {read: false}), {ignorePath: paths.assetsBuilt}))
    .pipe(gulp.dest(paths.jekyllPreprocessedSrc + '_layouts'))
);

// 'gulp images' -- optimizes and caches your images
gulp.task('images', () =>
  gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(paths.assetsBuilt + 'assets/images'))
    .pipe($.size({title: 'images'}))
);

// 'gulp fonts' -- copies your fonts to the temporary assets directory
gulp.task('fonts', () =>
  gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest(paths.assetsBuilt + 'assets/fonts'))
    .pipe($.size({title: 'fonts'}))
);

// 'gulp favicon' -- copies your favicon to the temporary assets directory
gulp.task('favicon', () =>
  gulp.src('src/assets/favicon.ico')
    .pipe(gulp.dest(paths.assetsBuilt))
    .pipe($.size({title: 'favicon'}))
);

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips our HTML files
gulp.task('html', () =>
  gulp.src(basePaths.dest + '**/*.html')
    .pipe($.if(argv.prod, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    .pipe($.if(argv.prod, $.size({title: 'optimized HTML'})))
    .pipe($.if(argv.prod, gulp.dest(basePaths.dest)))
    .pipe($.if(argv.prod, $.gzip({append: true})))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped HTML',
      gzip: true
    })))
    .pipe($.if(argv.prod, gulp.dest(basePaths.dest)))
);

<% if (amazonS3) { -%>
// 'gulp deploy' -- reads from your AWS Credentials file, creates the correct
// headers for your files and uploads them to S3
gulp.task('deploy', () => {
  var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
  var publisher = $.awspublish.create(credentials);

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**/*')
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
// 'gulp deploy' -- pushes your dist directory to Github
gulp.task('deploy', () => {
  return gulp.src(basePaths.dest + '**/*')
    .pipe($.ghPages({
    }));
});

<% } -%>
<% if (noUpload) { -%><% } -%>
// 'gulp lint' -- check your JS for formatting errors using XO Space
gulp.task('lint', () =>
  gulp.src([
    'gulpfile.babel.js',
    paths.assetsBuilt + 'assets/javascript/*.js',
    '!' + paths.assetsBuilt + 'assets/javascript/*.min.js'
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
      baseDir: [paths.assetsBuilt, paths.jekyllBuilt]
    }
  });

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], {usePolling: true}, gulp.series('jekyll-preprocessed-src', 'inject:head', 'inject:footer', 'jekyll', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], {usePolling: true}, gulp.series('jekyll-preprocessed-src', 'inject:head', 'inject:footer', 'jekyll'));
  gulp.watch('src/assets/javascript/**/*.js', {usePolling: true}, gulp.series('scripts'));
  gulp.watch('src/assets/scss/**/*.scss', {usePolling: true}, gulp.series('styles'));
  gulp.watch('src/assets/images/**/*', {usePolling: true}, gulp.series('clean:images', 'images'), reload);
  gulp.watch('src/assets/favicon.ico', {usePolling: true}, gulp.series('clean:favicon', 'favicon'));
});

// 'gulp assets' -- cleans out your assets and rebuilds them
// 'gulp assets --prod' -- cleans out your assets and rebuilds them with
// production settings
gulp.task('assets', gulp.series(
  gulp.parallel('clean:assets', 'clean:favicon', 'clean:images'),
  gulp.parallel('styles', 'scripts', 'fonts', 'images', 'favicon')
));

// 'gulp copy:assets' -- copies the assets into the dist directory
gulp.task('copy:assets', () =>
  gulp.src(paths.assetsBuilt + '**/*')
    .pipe(gulp.dest(basePaths.dest))
);

// 'gulp copy:jekyll' -- copies jekyll site into the dist directory
gulp.task('copy:jekyll', () =>
  gulp.src(paths.jekyllBuilt + '**/*')
    .pipe(gulp.dest(basePaths.dest))
);

// 'gulp check' -- checks your Jekyll configuration for errors and lint your JS
gulp.task('check', gulp.series('jekyll:doctor', 'lint'));

// 'gulp build' -- same as 'gulp' but doesn't serve your site in your browser
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build',
  gulp.series(
    gulp.series('check', 'clean', 'assets', 'jekyll-preprocessed-src', 'inject:head', 'inject:footer', 'jekyll'),
    gulp.parallel('copy:assets', 'copy:jekyll'),
    gulp.series('html')
  )
);

// 'gulp' -- cleans your assets, gzipped files and temp files, creates your assets and
// injects them into the templates, builds the site with Jekyll and serves it
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series('build', 'serve'));
