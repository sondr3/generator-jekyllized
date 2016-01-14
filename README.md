# generator-jekyllized [![Build Status](https://travis-ci.org/sondr3/generator-jekyllized.png?branch=master)](https://travis-ci.org/sondr3/generator-jekyllized)

[![NPM version](https://badge.fury.io/js/generator-jekyllized.png)](http://badge.fury.io/js/generator-jekyllized) [![Coverage Status](https://coveralls.io/repos/sondr3/generator-jekyllized/badge.png)](https://coveralls.io/r/sondr3/generator-jekyllized) [![Code Climate](https://codeclimate.com/github/sondr3/generator-jekyllized/badges/gpa.svg)](https://codeclimate.com/github/sondr3/generator-jekyllized)

### Development is happening on the [beta][beta] branch!

*Waiting on Gulp 4.0 to be released for the beta to go back to being the main
version of Jekyllized. If you want to try it as it is right now you can install
it from NPM under a `1.0.0-beta.6` version. Just read the installation
instructions!*

## Overview

Jekyllized is a very opinionated [Yeoman][yeoman] generator for very quickly and
effortlessly allowing you to build [Jekyll][jekyll] based sites with
[Gulp][gulp]. Get started using [Yo][yo] to scaffold your site and start
developing. Your assets are automatically updated when developing and injected
into your browser with [BrowserSync][browsersync] and are also optimized when
you're ready to publish.

## Features
> Rapidly prototype

When developing locally all your changes are automatically injected into your
browser. Change the background color of your website in SCSS and it will
automatically be built by [libsass][libsass], prefixed with
[AutoPrefixer][autoprefixer] and have source maps included. JavaScript is the
same, the changes are automatically injected and source maps are included.
Jekyll is also automatically reloaded when you change something in a post, and
the browser updates accordingly. Simple and rapid prototyping.

> Jekyll

Built on top of a modern and mature base, you get the full power of Jekyll to
power your site. Automatically have a sitemap and Atom feed generated, archives
for your tags and categories and more.

> Optimize your assets

Done with developing and ready for publishing? Jekyllized has you covered there
as well, running the generator with `--prod` makes everything run with
production settings: optimize, minify, gzip and cache bust your CSS and JS. Gzip
and minify your HTML. Optimize your images.

> Deploying

Support for deploying to either Amazon S3, Github Pages or via Rsync, you're
covered when everything is ready. Run a single command after your site is build
with production settings (`gulp deploy`) and your site is uploaded to your
choice of platform.

## Getting started

### Installation
* **Install dependencies:** Bundler `>1.10`, Node.js `>4.2`, Gulp `>4.0`, Ruby `>1.9` and Yo `>1.5.0`
* **Gulp:** Since the beta is running Gulp 4.0 you need to install `gulp-cli`:
  `npm install gulpjs/gulp-cli#4.0 -g`
* **Jekyllized:** Then install Jekyllized: `npm install
    generator-jekyllized@1.0.0-beta.6 -g`
* **Scaffold:** Run `yo jekyllized` in the directory you want your site to
  scaffold in
* **Start:** Run `gulp` and watch the magic unfold and/or look at the [FAQ][faq]
  for more options.

## Usage

#### `gulp [--prod]`

Running this will build your assets, copy your images and fonts, build your site
and start a BrowserSync session in your browser. Any change you make to (pretty
much) any file in the `src` directory will have the associated change be
automatically updated, built and pushed to your browser. By default all
optimizations are disabled, and source maps are enabled for easy debugging.

When you run the command with `--prod` you are changing into production
settings. It's mostly the same as the default, however all your CSS and JS are
minifed, gzipped, cache busted and your HTML is minified as well and source maps
are disabled. Use when you're done developing locally to verify that nothing is
broken and that everything works.

#### `gulp build [--prod]`

This command is identical to the `gulp` command, the only difference is that it
doesn't create a BrowserSync session in your browser.

#### `gulp deploy`

When you're done developing and have built your site with either `gulp --prod`
or `gulp build --prod` you can deploy your site to either Amazon S3, Github
Pages or with Rsync.

> Amazon S3 and Rsync

If you chose either of these two, you'll have a `[rsync/aws]-credentials.json`
file in your root folder that you have to fill out. It should be pretty self
explanatory, however, if you need any help with configuring it, you should check
out either the [`gulp-awspublish`][awspublish] repo or [`gulp-rsync`][rsync]
repo for help.

> Github Pages

If you chose to upload to Github Pages there's no configuration besides starting
a git repo in your folder, setting an `origin` remote repo and run `gulp
deploy`. Your site will be automatically pushed to Github. See the [FAQ][faq] for
configuring personal repos vs project repos.

#### `gulp check`

Lints your JavaScript files using ESLint with XO Space settings and run `jekyll
doctor` to look for potential errors.

#### `gulp clean`

Deletes your assets from their `.tmp` directory as well as in `dist` and deletes
any gzipped files.

#### `gulp rebuild`

Only run when you need to do a full rebuild! This will delete your built site
and all the assets with it.

### Subtasks

All of the commands listed above are the main commands, and are composed of
other smaller commands that have a small job that they do. You can find all the
command by running `gulp --tasks`, and look in the [gulpfile][gulpfile] for what they do.
All are commented about what they do.

## FAQ

> Inject more than one JavaScript file

If you want to split up your JavaScript files into say a `index.js` and a
`vendor.js` file with files from [Bower][bower] you can do this quite easily. Create a
copy of the `scripts` gulp task and rename it to `scripts:vendor` and change the
`gulp.src` files you need:

```js
  gulp.src([
    'bower_components/somelibrary.js/dist/somelibrary.js',
    'bower_components/otherthing.js/dist/otherthing.js'
  ])
```

and then change `.pipe($.concat('index.js'))` into
`.pipe($.concat('vendor.js'))`. Then you go to the bottom of the gulpfile and
change the `assets` task:

```js
gulp.task('assets', gulp.series(
  gulp.series('clean:assets'),
  gulp.parallel('styles', 'scripts:vendor', 'scripts', 'fonts', 'images')
));
```

Notice the `scripts:vendor` task that has been added. Also be ware that things
are injected in alphabetical order, so if you need your vendor scripts before
the `index.js` file you have to either rename the `index.js` file or rename the
`vendor.js` file. When you now run `gulp` or `gulp build` it will create a
`vendor.js` file and automatically inject it at the bottom of your HTML. When
running with `--prod` it'll automatically optimize and such as well.

For more advanced uses, refer to the [`gulp-inject`][inject] documentation on
how to create individual inject tags and inject specific files into them.

> Github Pages configuration

By default if you select Github Pages as your deployment option your site will
be pushed to a `gh-pages` branch, this works fine for any project pages but
won't work for your personal repo. If you want to use a `username.github.io`
site you'll have to change it to this:

```js
gulp.task('deploy', () => {
  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      branch: "master"
    }));
});
```

You might also have to configure the URL for your site if you want to use Github
Pages. Luckily the Jekyll documentation [has you covered][jekyll-url].

> Why don't you support Stylus/LESS/Angular/etc

Because I've never used them nor do I have any plans to use them. If you want to
you can create a pull request for them and I'll have a look and see whether
it'll work or not.

## Contributing

See the [contribution][contribute] docs.

## [Changelog][changelog]

## License

MIT © Sondre Nilsen (https://github.com/sondr3)

[autoprefixer]: https://github.com/ai/autoprefixer
[awspublish]: https://github.com/pgherveou/gulp-awspublish
[beta]: https://github.com/sondr3/generator-jekyllized/tree/beta
[bower]: http://bower.io/
[browsersync]: https://github.com/shakyShane/browser-sync
[bundler]: http://bundler.io
[contribute]: https://github.com/sondr3/generator-jekyllized/blob/beta/CONTRIBUTING.md
[changelog]: https://github.com/sondr3/generator-jekyllized/blob/master/CHANGELOG.md
[fag]: https://github.com/sondr3/generator-jekyllized#faq
[gulp]: http://gulpjs.com/
[gulpfile]: https://github.com/sondr3/generator-jekyllized/blob/beta/generators/gulp/templates/gulpfile.babel.js
[inject]: https://github.com/klei/gulp-inject
[jekyll-url]: http://jekyllrb.com/docs/github-pages/#project-page-url-structure
[jekyll]: https://jekyllrb.com
[libsass]: https://github.com/hcatlin/libsass
[nodejs]: http://nodejs.org/
[redcarpet]: https://github.com/vmg/redcarpet
[rsync]: https://github.com/jerrysu/gulp-rsync
[rubylang]: http://www.ruby-lang.org/
[yeoman]: http://yeoman.io
[yo]: https://github.com/yeoman/yo
