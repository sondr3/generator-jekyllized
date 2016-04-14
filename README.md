# generator-jekyllized [![Build Status](https://travis-ci.org/sondr3/generator-jekyllized.png?branch=master)](https://travis-ci.org/sondr3/generator-jekyllized)

[![NPM version](https://badge.fury.io/js/generator-jekyllized.png)](http://badge.fury.io/js/generator-jekyllized) [![Coverage Status](https://coveralls.io/repos/sondr3/generator-jekyllized/badge.png)](https://coveralls.io/r/sondr3/generator-jekyllized) [![Code Climate](https://codeclimate.com/github/sondr3/generator-jekyllized/badges/gpa.svg)](https://codeclimate.com/github/sondr3/generator-jekyllized)

*Waiting on Gulp 4.0 to be released for the beta to go back to being the main
version of Jekyllized. If you want to try it as it is right now you can install
it from NPM under the `next` tag. Just read the installation instructions!*

## Introduction

`generator-jekyllized` is a very opinionated [Yeoman][yeoman] generator built
with [Jekyll][jekyll] and [gulp][gulp]. You will be able to quickly scaffold
your site and start developing. As you are working on your site your assets will
automatically be updated and injected into your browser as well as your posts.
When you are done developing and want to publish it you are two commands away
from having everything optimized and published.

## Features
> Rapidly prototype

While developing locally everything you change will automatically be updated and
injected into your browser. Changing your SCSS or JavaScript files will
automatically updated them, create sourcemaps and inject them. Writing or
editing posts and pages for your website will do the same. Simple and effective.

> Jekyll

Built on top of Jekyll 3, you get a mature and stable base with the full power
that Jekyll brings you. You'll have sitemaps and Atom feeds generated, archives
for your posts created and SEO meta data tags added to your posts and pages.

> Optimize your assets

When you are done developing you can have your assets optimized and injected
correctly into your HTML. Your assets will be minified, compressed with gzip,
cache busted and otherwise optimized. Your images will be run through
compressors to save space and even your HTML will be minified.

> Deploying

Finally, once everything is done and you are ready to publish your site, you can
do it via either Amazon S3, Github Pages or Rsync. With a single command your
new/updated site is uploaded to your platform of choice.

## Getting started

### Installation

#### Dependencies
* **Ruby**: `>2.0` with Bundler `>1.10`
* **Node**: `>4.2`, Gulp `>4.0` and Yo `>1.7.0`
* **Gulp:** Since the beta is running Gulp 4.0 you need to install `gulp-cli`:
  `npm install gulpjs/gulp-cli#4.0 -g`
* **Jekyllized:** Then install Jekyllized: `npm install
  generator-jekyllized@next -g`

#### Install
* **Scaffold:** Run `yo jekyllized` in the directory you want scaffold your site
    in
* **Start:** Run `gulp` and watch the magic unfold

#### Update
It's recommended that you keep your `gulpfile` up to date with the generator.
First, update `generator-jekyllized`: `npm update generator-jekyllized -g` and
then run `yo jekyllized:gulp [--rsync|amazon|pages]`, or see the help: `yo
jekyllized:gulp --help`. Note that this will overwrite any local changes you've
made, so make sure to make a backup.

## Usage

#### `gulp [--prod]`

This is the default command, and probably the one you'll use the most. This
command will build your assets and site with development settings. You'll get
sourcemaps, your drafts will be generated and you'll only generate the last 10
posts (for speed). As you are changing your posts, pages and assets they will
automatically update and inject into your browser via
[BrowserSync][browsersync].

> `--prod`

Once you are done and want to verify that everything works with production
settings you add the flag `--prod` and your assets will be optimized. Your CSS,
JS and HTML will be minified and gzipped, plus the CSS and JS will be cache
busted. The images will be compressed and Jekyll will generate a site with all
your posts and no drafts.

#### `gulp build [--prod]`

This command is identical to the normal `gulp [--prod]` however it will not
create a BrowserSync session in your browser.

#### `gulp (build) [--prod]` main subtasks
> `gulp jekyll [--prod]`

Without production settings Jekyll will only create the 10 latest posts and will
create both future posts and drafts. With `--prod` none of that is true and it
will generate all your posts.

> `gulp styles|scripts [--prod]`

Both your CSS and JS will have sourcemaps generated for them under development
settings. Once you generate them with production settings sourcemap generation
is disabled. Both will be minified, gzipped and cache busted with production
settings.

> `gulp images`

Optimizes and caches your images. This is a set it and forget it command for the
most part.

> `gulp html --prod`

**Does nothing without `--prod`.** Minifies and gzips your HTML files.

> `gulp serve`

If you just want to watch your site you can run this command. If wanted you can
also edit the `serve` task to allow it to tunnel via [localtunnel][localtunnel]
so people outside your local network can view it as well:

```js
    // tunnel: true,
```

You can also change the behaviour for how it opens the URL when you run `gulp
[--prod]`, you can see the options [here][browsersync-open]:

```js
    // open: false,
```

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
deploy`. Your site will be automatically pushed to Github. See the
[FAQ][frequentlyasked] for configuring personal repos vs project repos.

#### `gulp check`

Lints your JavaScript files using ESLint with XO Space settings and run `jekyll
doctor` to look for potential errors.

#### `gulp clean`

Deletes your assets from their `.tmp` directory as well as in `dist` and deletes
any gzipped files. **NOTE:** Does not delete your images from `.tmp` to reduce
the time to build your site due to image optimizations. Note that `gulp clean`
is built on top of a few other commands that you can run individually if that is
more to your liking.

> `gulp clean:assets`

Erases out your assets from `.tmp` and `dist` but does not remove images.

> `gulp clean:images`

Erases your images from `.tmp` and `dist`.

> `gulp clean:dist`

Erases your `dist` folder.

> `gulp clean:gzip`

Erases any gzipped files in your `dist` folder.

> `gulp clean:metadata`

Deletes the `.jekyll-metadata` file, this will force Jekyll to completely
rebuild your site.

#### `gulp rebuild`

Only run when you need to do a full rebuild! This will delete your built site
and all the assets with it.

### Subtasks

All of the commands listed above are the main commands, and are composed of
other smaller commands that have a small job that they do. You can find all the
command by running `gulp --tasks`, and look in the [gulpfile][gulpfile] for what they do.
All are commented about what they do.

## Frequently Asked Questions

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

Because I've never used them nor do I have any plans of using them. Furthermore,
they're a bit outside what I want with this generator anyways. I want a lean,
simple and opinionated generator, not a big complicated one.

## Contributing

See the [contribution][contribute] docs.

## [Changelog][changelog]

## License

MIT © Sondre Nilsen (https://github.com/sondr3)

[awspublish]: https://github.com/pgherveou/gulp-awspublish
[browsersync]: https://github.com/shakyShane/browser-sync
[browsersync-open]: https://browsersync.io/docs/options/#option-open
[contribute]: https://github.com/sondr3/generator-jekyllized/blob/beta/CONTRIBUTING.md
[changelog]: https://github.com/sondr3/generator-jekyllized/blob/master/CHANGELOG.md
[frequentlyasked]: https://github.com/sondr3/generator-jekyllized#frequently-asked-questions
[gulp]: http://gulpjs.com/
[gulpfile]: https://github.com/sondr3/generator-jekyllized/blob/beta/generators/gulp/templates/gulpfile.babel.js
[inject]: https://github.com/klei/gulp-inject
[jekyll-url]: http://jekyllrb.com/docs/github-pages/#project-page-url-structure
[jekyll]: https://jekyllrb.com
[libsass]: https://github.com/hcatlin/libsass
[localtunnel]: http://localtunnel.me/
[rsync]: https://github.com/jerrysu/gulp-rsync
[yeoman]: http://yeoman.io
