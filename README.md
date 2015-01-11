# generator-jekyllized [![Build Status](https://travis-ci.org/sondr3/generator-jekyllized.png?branch=master)](https://travis-ci.org/sondr3/generator-jekyllized)

[![NPM version](https://badge.fury.io/js/generator-jekyllized.png)](http://badge.fury.io/js/generator-jekyllized) [![Coverage Status](https://coveralls.io/repos/sondr3/generator-jekyllized/badge.png)](https://coveralls.io/r/sondr3/generator-jekyllized) [![Code Climate](https://codeclimate.com/github/sondr3/generator-jekyllized/badges/gpa.svg)](https://codeclimate.com/github/sondr3/generator-jekyllized)

### Work in progress! Still unfinished.

**Stylized and opinionated Jekyll development**

Jekyllized is an opinionated [Yeoman][yeoman] generator for building
[Jekyll][jekyll] based websites. Easy scaffolding via [Yo][yo] to get started
quickly, [Bower][bower] for managing frontend packages and [Gulp][gulp] to
automate and optimize developing your site.

Based on [Jekyll][jekyll], Jekyllized is ideal for building highly optimized
static sites and prototyping sites. Quickly review changes with LiveReload,
optimize your stylesheets and images automatically and detect errors and unused
code in your project.

## Features

### Tools

- SASS using [libsass][libsass]
- [AutoPrefixer][autoprefixer] for automatic vendor prefixing
- Upload your site to either Amazon S3 or to your server with Rsync
- [Lanyon][lanyon] theme based on [Poole][poole] from [mdo][mdo]
- Jekyll with sane configurations and lots of extras

### Developing

- Have your sites automatically refreshed across multiple devices with
  [BrowserSync](browsersync)
- Detect errors and potential issues with your code using `jekyll doctor` and
  [JShint][jshint]
- Optimize your assets and site: your CSS and JS is automatically concatenated,
  both your CSS, JS and HTMl is minifiyed and all your text files are gzipped
  for optimal performance. Your images are run through imagemin to optimize
  them as well
- Cachebusting for your assets

## Getting started

## Installation

To install you need [Node.js][nodejs] (`>0.10.0`) and [Ruby][rubylang] (`> 1.9`)
for Jekyll. Install Jekyllized via NPM: `npm install -g generator-jekyllized`
and finally run `yo jekyllized` in the directory you want to install in.

## Usage

#### `gulp`

The default task, this will automatically compile and open the site in your
browser. A watch task runs in the background and detects when any files change,
recompiles them if nessecary and updates your browser with BrowserSync.

#### `gulp check`

Check the health of your JavaScript, CSS and Jekyll. You can change the settings
for what it looks for in `.jshintrc`.

#### `gulp build`

Almost the same as the default `gulp` task, but this won't start up a
preview/LiveReload server and open the browser, it will only build your site.

#### `gulp publish`

This will first run `gulp build` to make sure the changes you've made to your
site are included and then optimize all your assets (images, HTML, CSS, JS++).
If you want to display your optimized site to make sure everything is working
run `gulp serve:prod` to see the changes.

#### `gulp deploy`

This will either upload your site to Amazon S3, Rsync your files to your server
or push them to GitHub Pages.

### Individual tasks

A lot of the tasks are built up of smaller tasks that can be run individually.
For example, the `gulp publish` task first runs `gulp build` (that also runs
`jekyll:prod`, `styles` and `images`) and `clean:prod` and then runs the `html`
and `copy` commands (`html` to optimize your site and `copy` to copy over some
files that `html` misses). If you want to you can run any of these tasks without
invoking their "parent" task. If you only wanted to optimize your assets and
such, run `gulp html` and it won't run any of the tasks used with `gulp
publish`.

For all the different tasks that can be run, see the [gulpfile][gulpfile] and
look through the code. Everything is commented and you can edit, change or
remove what you want/need.

## Deploying

#### Amazon AWS
If you are using Amazon S3 make sure you change the region you want to use in
the aws-credentials.json and have created a bucket already. If you don't want to
use Cloudfront you'll have to uncommend the last line in the `gulp deploy` task.
For Rsync it should be automatic as long as your details are correct.

#### Rsync
If you are using Rsync make sure the credentials are filled out in the
rsync-credentials.json file, otherwise all you have to do is to run `gulp
deploy` and your site will be synced to your server. NOTE: For the moment your
site is not gzipped while uploading, this is going to be fixed in the future.

#### GitHub Pages
If you are using GitHub Pages note that currently only personal repositories are
supported (`username.github.io`), however if you want to use it for project
repositories there are some things you need to do:

* Change the branch that the `gulp deploy` pushes to
* Change the [URL settings][jekyll-pages] for Jekyll. Note that the fourth step
  isn't required as Jekyllized will automatically serve your local site on
  `localhost:4000`

### Bower

**Currently not implemented**

## Roadmap

- Write more documentation
- Implement Bower functionality
- And more things

### [Changelog][changelog]

[jekyll]: https://jekyllrb.com
[yeoman]: http://yeoman.io
[yo]: https://github.com/yeoman/yo
[bower]: http://bower.io/
[gulp]: http://gulpjs.com/
[libsass]: https://github.com/hcatlin/libsass
[autoprefixer]: https://github.com/ai/autoprefixer
[poole]: https://github.com/poole
[lanyon]: https://github.com/poole/lanyon
[mdo]: https://github.com/mdo
[jshint]: http://www.jshint.com/
[nodejs]: http://nodejs.org/
[rubylang]: http://www.ruby-lang.org/
[gulpfile]: https://github.com/sondr3/generator-jekyllized/blob/master/app/templates/gulpfile.js
[changelog]: https://github.com/sondr3/generator-jekyllized/blob/master/CHANGELOG.md
[browsersync]: https://github.com/shakyShane/browser-sync
[jekyll-pages]: http://jekyllrb.com/docs/github-pages/
