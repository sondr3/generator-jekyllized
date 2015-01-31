// Generated on <%= (new Date).toISOString().split("T")[0] %> using <%= pkg.name %> <%= pkg.version %>
"use strict";

var gulp = require("gulp");
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
var $ = require("gulp-load-plugins")();
// "del" is used to clean out directories and such
var del = require("del");
<%  if (amazonCloudfrontS3) { %>// Parallelize the uploads when uploading to Amazon S3
// "fs" is used to read files from the system (used for AWS uploading)
var fs = require("fs");
var parallelize = require("concurrent-transform");
<% } %>// BrowserSync isn"t a gulp package, and needs to be loaded manually
var browserSync = require("browser-sync");
// merge is used to merge the output from two different streams into the same stream
var merge = require("merge-stream");
// Need a command for reloading webpages using BrowserSync
var reload = browserSync.reload;
// And define a variable that BrowserSync uses in it"s function
var bs;

// Deletes the directory that is used to serve the site during development
gulp.task("clean:dev", del.bind(null, ["serve"]));

// Deletes the directory that the optimized site is output to
gulp.task("clean:prod", del.bind(null, ["site"]));

// Runs the build command for Jekyll to compile the site locally
// This will build the site with the production settings
gulp.task("jekyll:dev", $.shell.task("jekyll build"));
gulp.task("jekyll-rebuild", ["jekyll:dev"], function () {
  reload;
});

// Almost identical to the above task, but instead we load in the build configuration
// that overwrites some of the settings in the regular configuration so that you
// don"t end up publishing your drafts or future posts
gulp.task("jekyll:prod", $.shell.task("jekyll build --config _config.yml,_config.build.yml"));

// Compiles the SASS files and moves them into the "assets/stylesheets" directory
gulp.task("styles", function () {
  // Looks at the style.scss or style.sass file for what to include and creates a style.css file
  return gulp.src('src/assets/scss/*.{scss,sass}')
    .pipe($.if('*.sass', $.sass({indentedSyntax: true, errLogToConsole: true})))
    .pipe($.if('*.scss', $.sass({indentedSyntax: false, errLogToConsole: true})))
    // AutoPrefix your CSS so it works between browsers
    .pipe($.autoprefixer("last 1 version", { cascade: true }))
    // Directory your CSS file goes to
    .pipe(gulp.dest("src/assets/stylesheets/"))
    .pipe(gulp.dest("serve/assets/stylesheets/"))
    // Outputs the size of the CSS file
    .pipe($.size({title: "styles"}))
    // Injects the CSS changes to your browser since Jekyll doesn"t rebuild the CSS
    .pipe(reload({stream: true}));
});

// Optimizes the images that exists
gulp.task("images", function () {
  return gulp.src("src/assets/images/**")
    .pipe($.changed("site/assets/images"))
    .pipe($.imagemin({
      // Lossless conversion to progressive JPGs
      progressive: true,
      // Interlace GIFs for progressive rendering
      interlaced: true
    }))
    .pipe(gulp.dest("site/assets/images"))
    .pipe($.size({title: "images"}));
});

// Copy over fonts to the "site" directory
gulp.task("fonts", function () {
  return gulp.src("src/assets/fonts/**")
    .pipe(gulp.dest("site/assets/fonts"))
    .pipe($.size({ title: "fonts" }));
});

// Copy xml and txt files to the "site" directory
gulp.task("copy", function () {
  return gulp.src(["serve/*.txt", "serve/*.xml"])
    .pipe(gulp.dest("site"))
    .pipe($.size({ title: "xml & txt" }))
});

// Optimizes all the CSS, HTML and concats the JS etc
gulp.task("html", ["styles"], function () {
  var assets = $.useref.assets({searchPath: "serve"});

  return gulp.src("serve/**/*.html")
    .pipe(assets)
    // Concatenate JavaScript files and preserve important comments
    .pipe($.if("*.js", $.uglify({preserveComments: "some"})))
    // Minify CSS
    .pipe($.if("*.css", $.minifyCss()))
    // Start cache busting the files
    .pipe($.revAll({ ignore: [".eot", ".svg", ".ttf", ".woff"] }))
    .pipe(assets.restore())
    // Conctenate your files based on what you specified in _layout/header.html
    .pipe($.useref())
    // Replace the asset names with their cache busted names
    .pipe($.revReplace())
    // Minify HTML
    .pipe($.if("*.html", $.htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    // Send the output to the correct folder
    .pipe(gulp.dest("site"))
    .pipe($.size({title: "optimizations"}));
});

<% if (amazonCloudfrontS3) { %>// Task to deploy your site to Amazon S3 and Cloudfront
gulp.task("deploy", function () {
  // Generate the needed credentials (bucket, secret key etc) from a "hidden" JSON file
  var credentials = JSON.parse(fs.readFileSync("aws-credentials.json", "utf8"));
  var publisher = $.awspublish.create(credentials);
  // Give your files the proper headers
  var headers = {
    "Cache-Control": "max-age=0, no-transform, public",
    "Content-Encoding": "gzip"
  };

  gulp.src("site/**/*")
    .pipe($.awspublishRouter({
      routes: {
        "^assets/(?:.+)\\.(?:js|css)$": {
          key: "$&",
          headers: {
            "Cache-Control": "max-age=315360000, no-transform, public",
            "Content-Encoding": "gzip"
          }
        },

        "^assets/(?:.+)\\.(?:jpg|png|gif)$": {
          key: "$&",
          headers: {
            "Cache-Control": "max-age=315360000, no-transform, public",
            "Content-Encoding": "gzip"
          }
        },

        "^assets/fonts/(?:.+)\\.(?:eot|svg|ttf|woff)$": {
          key: "$&",
          headers: {
            "Cache-Control": "max-age=315360000, no-transform, public"
          }
        },

        "^.+\\.html": {
          key: "$&",
          headers: {
            "Cache-Control": "max-age=0, no-transform, public",
            "Content-Encoding": "gzip"
          }
        },
        "^.+$": "$&"
      }
    }))
    // Gzip the files for moar speed
    .pipe($.awspublish.gzip())
    // Parallelize the number of concurrent uploads, in this case 30
    .pipe(parallelize(publisher.publish(), 30))
    // Have your files in the system cache so you don"t have to recheck all the files every time
    .pipe(publisher.cache())
    // Synchronize the contents of the bucket and local (this deletes everything that isn"t in local!)
    .pipe(publisher.sync())
    // And print the ouput, glorious
    .pipe($.awspublish.reporter())
    // And update the default root object
    .pipe($.cloudfront(credentials));
});<% } %><% if (rsync) { %>

// Task to upload your site via Rsync to your server
gulp.task("deploy", function () {
  // Load in the variables needed for our Rsync synchronization
  var secret = require("./rsync-credentials.json");

  return gulp.src("site/**")
    .pipe($.rsync({
      // This uploads the contenst of "root", instead of the folder
      root: "site",
      // Find your username, hostname and destination from your rsync-credentials.json
      hostname: secret.hostname,
      username: secret.username,
      destination: secret.destination,
      // Incremental uploading, adds a small delay but minimizes the amount of files transferred
      incremental: true,
      // Shows the progress on your files while uploading
      progress: true
  }));
});<% } %><% if (githubPages) { %>
// Task to upload your site to your personal GH Pages repo
gulp.task("deploy", function () {
  // Deploys your optimized site, you can change the settings in the html task if you want to
  return gulp.src("./site/**/*")
    .pipe($.ghPages({
      // Currently only personal GitHub Pages are supported so it will upload to the master
      // branch and automatically overwrite anything that is in the directory
      branch: "master"
      }));
});<% } %>

// Run JS Lint against your JS
gulp.task("jslint", function () {
  gulp.src("./serve/assets/javascript/*.js")
    // Checks your JS code quality against your .jshintrc file
    .pipe($.jshint(".jshintrc"))
    .pipe($.jshint.reporter());
});

// Runs "jekyll doctor" on your site to check for errors with your configuration
// and will check for URL errors a well
gulp.task("doctor", $.shell.task("jekyll doctor"));

// BrowserSync will serve our site on a local server for us and other devices to use
// It will also autoreload across all devices as well as keep the viewport synchronized
// between them.
gulp.task("serve:dev", ["styles", "jekyll:dev"], function () {
  bs = browserSync({
    notify: true,
    // tunnel: "",
    server: {
      baseDir: "serve"
    }
  });
});

// These tasks will look for files that change while serving and will auto-regenerate or
// reload the website accordingly. Update or add other files you need to be watched.
gulp.task("watch", function () {
  gulp.watch(["src/**/*.md", "src/**/*.html", "src/**/*.xml", "src/**/*.txt"], ["jekyll-rebuild"]);
  gulp.watch(["serve/assets/stylesheets/*.css", "serve/assest/javascript/*.js"], reload);
  gulp.watch(["src/assets/scss/**/*.{scss,sass}"], ["styles"]);
});

// Serve the site after optimizations to see that everything looks fine
gulp.task("serve:prod", function () {
  bs = browserSync({
    notify: false,
    // tunnel: true,
    server: {
      baseDir: "site"
    }
  });
});

// Default task, run when just writing "gulp" in the terminal
gulp.task("default", ["serve:dev", "watch"]);

// Checks your CSS, JS and Jekyll for errors
gulp.task("check", ["jslint", "doctor"], function () {
  // Better hope nothing is wrong.
});

// Builds the site but doesn"t serve it to you
gulp.task("build", ["jekyll:prod", "styles"], function () {});

// Builds your site with the "build" command and then runs all the optimizations on
// it and outputs it to "./site"
gulp.task("publish", ["build"], function () {
  gulp.start("html", "copy", "images", "fonts");
});
