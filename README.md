# generator-jekyllized [![Build Status](https://travis-ci.org/sondr3/generator-jekyllized.png?branch=master)](https://travis-ci.org/sondr3/generator-jekyllized)

[![NPM version](https://badge.fury.io/js/generator-jekyllized.png)](http://badge.fury.io/js/generator-jekyllized) [![Coverage Status](https://coveralls.io/repos/sondr3/generator-jekyllized/badge.png)](https://coveralls.io/r/sondr3/generator-jekyllized) [![Code Climate](https://codeclimate.com/github/sondr3/generator-jekyllized/badges/gpa.svg)](https://codeclimate.com/github/sondr3/generator-jekyllized)

### Development is happening on the [beta][beta] branch!

Waiting for Jekyll 3.0 and Gulp 4.0 to land, take a look if you want to! It's
also published on NPM under a 0.8-beta branch so you can start using it today,
however be warned that Gulp 3.x and Gulp 4.0 does not play nice together right
now!

**Stylized and opinionated Jekyll development**

Jekyllized is a small and opinionated [Yeoman][yeoman] generator for
[Jekyll][jekyll]-based sites. Quick and painless scaffolding with [Yo][yo] to
kickstart development, easy frontend package managment with [Bower][bower] and
supercharged with [Gulp][gulp] to automate common development tasks like
concating your CSS and JS, minify your assets, optimze images and upload to
[Amazon S3][aws], [Github Pages][ghpages] or just plain ol' Rsync.

Built on [Jekyll][jekyll] you get a modern and mature base to build upon; either
it is your personal blog or quickly prototyping sites Jekyllized is there to
help you. Quickly review changes with [BrowserSync][browsersync], automagically
optimize your CSS, JS, HTML and images, automatic vendor prefixing with
[AutoPrefixer][autoprefixer] and much more.

## Features

### Tools

* [libsass][libsass] for lightning fast generation of Sass files
* [AutoPrefixer][autoprefixer] for automatic vendor prefixing
* Support for either Amazon S3, GitHub Pages or Rsync for deployment
* [Lanyon][lanyon] theme based on [Poole][poole] from [mdo][mdo]
* Jekyll with sane configurations and a proper Atom feed and sitemap.xml

### When developing

* Have your sites automatically refreshed across multiple devices with
  [BrowserSync](browsersync)
* Detect errors and potential issues with your code using `jekyll doctor` and
  [JShint][jshint]
* Automagical optimization of your assets when you are ready to deploy your
  site. Your CSS and JS is concatenated and is minified together with your HTML
  and gzipped for maximal performance.
* Your images is run through imagemin to minify them as well.
* Support for sourcemaps for ease of debugging for both your JS and CSS
* Cachebusting for your assets that is automatically updated in your HTML

### Jekyll

* Jekyll is configured with [Redcarpet][redcarpet] that adds a ton of extra functionality to
  writing Markdown (footnotes etc) and lots of sane settings
* Automatic generation of year/month/category/tags archives
* Fully valid Atom 1.0 feed and sitemap

## Getting started

## Requirements
- [Node.js][nodejs] (`>0.10.0`)
- [Yeoman](yo) (`>0.9.6`)
- [Ruby][rubylang] (`>1.9`)
- [Bundler](bundler) (`>1.10`)

## Installation

To install you need [Node.js][nodejs] (`>0.10.0`), the latest version of `yo`
(`npm install -g yo`), [Ruby][rubylang] (`> 1.9`) and [Bundler](bundler) for Jekyll. Install
Jekyllized via NPM: `npm install -g generator-jekyllized` and finally run `yo
jekyllized` in the directory you want to install in.

## Usage

#### `gulp`

The default task, you will probably use this most of the time short of deploying
your site. This will regenerate your Jekyll site, update your CSS and JS,
optimize your images and start a [BrowserSync][browsersync] session and open
your browser. While editing your files it will either inject the changes
(CSS/JS) or reload the site (changes to Jekyll documents). All this happens
automatically so you can keep working.

BrowserSync can also tunnel your
development via [localtunnel][localtunnel] so you can view it on your tablet,
phone or let other people view it as well. By default clicks and scrolling is
also broadcast so when you go to the `About` page all other browsers listening
in on the session will as well.

#### `gulp build`

Identical to the default `gulp` task but won't start a BrowserSync session.

#### `gulp optimize`

Use this when you are done with developing and you're ready to deploy your site.
This command will first clean out the `dist` directory and then rebuild your
site using the build settings. Once the site is generated all your assets are
optimized (concatinated/minified/gzipped etc) and cachebust them and inject them
to your HTML.

#### `gulp deploy`

Use this command when you are ready to deploy your site. It'll upload to either
Amazon S3, Rsync or GitHub Pages depending on what you chose when first running
Jekyllized.

#### `gulp check`

Check the health of your JavaScript files and Jekyll.

#### Various tasks

###### `gulp rebuild`/`gulp clean`
`gulp rebuild` runs `gulp clean` to delete your `dist` directory and then
deletes `.jekyll-metadata` so it forces Jekyll to fully rebuild your site. If
you only want to delete the `dist` folder you can run `gulp clean` but this will
mess up Jekyll's incremental regeneration.

###### `gulp styles`/`gulp javascript`
Regenerates your CSS/JS files.

## Deploying
For either Amazon S3 or Rsync you either fill in the deployment details during
the initial scaffolding when running the generator or you can just edit their
corresponding files (`aws/rsync-credentials.json`) later.

#### Amazon AWS
This will upload your changed files to Amazon S3, so you don't have to worry
about wasting bandwidth. It'll also gzip your files and upload them with the
proper headers so it will show the gzipped files properly and tell the browser
it'll be cached forever. It'll also update CloudFront so if this isn't needed
you can comment out the last line in the `deploy` function.

#### Rsync
Upload your files to your server with Rsync. As with uploading to Amazon S3 this
will also only upload the changed files and have them gzipped. However it can't
add the proper headers for your files so make sure you do it on Apache/Nginx
yourself.

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

* Write more documentation
* Implement Bower functionality
* And more things

### [Changelog][changelog]

[autoprefixer]: https://github.com/ai/autoprefixer
[aws]: http://aws.amazon.com/s3/
[beta]: https://github.com/sondr3/generator-jekyllized/tree/beta
[bower]: http://bower.io/
[browsersync]: https://github.com/shakyShane/browser-sync
[bundler]: http://bundler.io
[changelog]: https://github.com/sondr3/generator-jekyllized/blob/master/CHANGELOG.md
[ghpages]: https://pages.github.com/
[gulp]: http://gulpjs.com/
[gulpfile]: https://github.com/sondr3/generator-jekyllized/blob/master/app/templates/gulpfile.js
[jekyll-pages]: http://jekyllrb.com/docs/github-pages/
[jekyll]: https://jekyllrb.com
[jshint]: http://www.jshint.com/
[lanyon]: https://github.com/poole/lanyon
[libsass]: https://github.com/hcatlin/libsass
[localtunnel]: http://localtunnel.me/
[mdo]: https://github.com/mdo
[nodejs]: http://nodejs.org/
[poole]: https://github.com/poole
[redcarpet]: https://github.com/vmg/redcarpet
[rubylang]: http://www.ruby-lang.org/
[yeoman]: http://yeoman.io
[yo]: https://github.com/yeoman/yo
