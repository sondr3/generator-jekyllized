# generator-jekyllized [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

# Looking for a (co)-maintainer
I've since stopped using Jekyll and consequently have neither the time nor need 
to maintain this package, I would however love it if someone who either found this
generator useful or wants to help to take over the responsibility in maintaining
it. Hit me up on Twitter (@sondr3), Keybase (@sondre) or the mail in my GitHub
profile.

***NOTE: Currently using gulp 4.0 which is in beta!***

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
that Jekyll brings you. You'll have sitemaps, Atom feeds generated and SEO meta
data tags added to your posts and pages.

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
* **Node**: `>4.2` and Yo `>1.7.0`
* **Gulp:** Since the release candidate is running Gulp 4.0 you need to install
  `gulp-cli`: `npm install gulp-cli -g`
* **Jekyllized:** Then install Jekyllized: `npm install generator-jekyllized -g`

#### Install
* **Scaffold:** Run `yo jekyllized` in the directory you want scaffold your site
    in
* **Start:** Run `gulp` and watch the magic unfold

#### Update
To update the generator, run `npm update -g generator-jekyllized` and then run
`yo jekyllized:update` and it will update your packages and gulp tasks. You can
skip installing dependencies by running it with `--skip-install`. **NOTE:**
Updating will overwrite any changes you've done to your gulp tasks and
package.json, so back them up before running it! It will ask before overwriting
though, so you can see the diff before applying it.

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
the time to build your site due to image optimizations.

#### `gulp rebuild`

Only use this if you want to regenerate everything, this will delete everything
generated. Images, assets, your Jekyll site. You really shouldn't need to do
this.

### Subtasks

All of the subtasks lives in their own files in the `gulp` directory and are
named after what they do. You can edit or look at any of them to see how they
actually work. They're all commented.

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

and then change `.pipe(concat('index.js'))` into
`.pipe(concat('vendor.js'))`. Then you go to the bottom of the gulpfile and
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
site all you have to do is to uncomment the `branch` line.

```js
gulp.task('upload', (done) => {
  ghPages.publish(path.join(__dirname + '/../../', 'dist'), {
    dotfiles: true,
    // branch: "master"
	},
	done);
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
[contribute]: https://github.com/sondr3/generator-jekyllized/blob/master/CONTRIBUTING.md
[changelog]: https://github.com/sondr3/generator-jekyllized/blob/master/CHANGELOG.md
[frequentlyasked]: https://github.com/sondr3/generator-jekyllized#frequently-asked-questions
[gulp]: http://gulpjs.com/
[gulpfile]: https://github.com/sondr3/generator-jekyllized/blob/master/generators/gulp/templates/gulpfile.js
[inject]: https://github.com/klei/gulp-inject
[jekyll-url]: http://jekyllrb.com/docs/github-pages/#project-page-url-structure
[jekyll]: https://jekyllrb.com
[libsass]: https://github.com/hcatlin/libsass
[localtunnel]: http://localtunnel.me/
[rsync]: https://github.com/jerrysu/gulp-rsync
[yeoman]: http://yeoman.io
[npm-image]: https://badge.fury.io/js/generator-jekyllized.svg
[npm-url]: https://npmjs.org/package/generator-jekyllized
[travis-image]: https://travis-ci.org/sondr3/generator-jekyllized.svg?branch=master
[travis-url]: https://travis-ci.org/sondr3/generator-jekyllized
[coveralls-image]: https://coveralls.io/repos/sondr3/generator-jekyllized/badge.svg
[coveralls-url]: https://coveralls.io/r/sondr3/generator-jekyllized
