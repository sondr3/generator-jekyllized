# generator-jekyllized [![Build Status](https://travis-ci.org/sondr3/generator-jekyllized.png?branch=master)](https://travis-ci.org/sondr3/generator-jekyllized)

[![NPM version](https://badge.fury.io/js/generator-jekyllized.png)](http://badge.fury.io/js/generator-jekyllized)

### Work in progress! Still unfinished.

**Stylized and opinionated Jekyll development**

Jekyllized is an opinionated [Yeoman][yeoman] generator for building [Jekyll][jekyll] based websites. Easy scaffolding via [Yo][yo] to get started quickly, 
[Bower][bower] for managing frontend packages and [Gulp][gulp] to automate and optimize developing your site.

Based on [Jekyll][jekyll], Jekyllized is ideal for building highly optimized static sites and prototyping sites. Quickly review changes with LiveReload, optimize your stylesheets and images automatically and detect errors and unused code in your project.

## Features

### Tools

- SASS using [libsass][libsass]
- [AutoPrefixer][autoprefixer] for automatic vendor prefixing
- [Lanyon][lanyon] theme based on [Poole][poole] from [mdo][mdo]
- Jekyll with sane configurations and lots of extras

### Developing

- Refresh and preview your site with LiveReload automatically
- Detect errors and potential issues with your code using `jekyll doctor`, [JShint][jshint] and [CSSLint][csslint]
- Automatically concatenate your files and optimize and minify your images, CSS, JavaScript and HTMl

## Getting started

## Installation

To install you need [Node.js][nodejs] (`>0.10.0`) and [Ruby][rubylang] (`> 1.9`) for Jekyll. Install Jekyllized via NPM: `npm install -g generator-jekyllized` and finally run `yo jekyllized` in the directory you want to install in.

## Usage

#### `gulp`

The default task, this will automatically compile and open the site in your browser. A watch task runs in the background and detects when any files change, recompiles them if nessecary and updates your browser with LiveReload.

#### `gulp check`

Check the health of your JavaScript, CSS and Jekyll installation. You can change the settings for what it looks for in either `.jshintrc` or `.csslintrc.`

#### `gulp build`

Almost the same as the default `gulp` task, but this won't start up a preview/LiveReload server and open the browser, it will only build your site.

#### `gulp publish`

This will run the `gulp build` task first to make sure all changes are done, then it will optimize all the files. It will concatenate your CSS and JS, minify your HTML, CSS, JS and optimize your images.

### Individual tasks

All the Gulp tasks are built up of smaller tasks, which can be run individually. For example, the `gulp check` task runs the tasks `csslint`, `jslint` and `doctor`. If you wanted to check for Jekyll problems intead of checking for everything else you only run `gulp doctor`.

For all the different tasks that can be run, see the [gulpfile][gulpfile] and look through the code. Everything is commented and you can edit, change or remove what you want/need.

### Bower

**Currently not implemented**

## Roadmap

- Write more documentation
- Implement Bower functionality
- Maybe CoffeeScript
- Probably some other stuff too

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
[csslint]: http://csslint.net/
[nodejs]: http://nodejs.org/
[rubylang]: http://www.ruby-lang.org/
[gulpfile]: https://github.com/sondr3/generator-jekyllized/blob/master/app/templates/gulpfile.js
[changelog]: https://github.com/sondr3/generator-jekyllized/blob/master/CHANGELOG.md
