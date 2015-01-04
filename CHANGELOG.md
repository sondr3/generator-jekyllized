<a name="0.7.0"></a>
## 0.7.0 - GitHub Pages

#### Changes
* **GitHub Pages:** You can now upload your site to your personal repository on
  GitHub, but for now there's no support for project repositories, see the
  README for how to fix that.
* **Jekyll:** Added extensions to Redcarpet so it'll render Markdown with some
  additional settings and smartypants the HTML as well. Also included support
  for excerpts in posts. If you want to use it simply put `<!--more-->` in
  your posts where you want the excerpt to stop.
* **Packages:** Updated the NPM packages to be more up to date

#### Behind the scenes
* **Tests:** Updates and added a bunch more tests to make sure things actually
  work and run properly before publishing it, hopefully this should make dumb
  errors less likely. Also made a helper file so we can assert that tasks in the
  gulpfile exist where they should. Added a test that checks for Jekyll settings
  as well.
* **Index:** Updated the main index file to be up to par with the newer
  versions.

<a name="0.6.5"></a>
## 0.6.6 - Bugfixes
Somehow I missed that the gulpfile shouldn't be copied but should be used as a
template instead, this completely messed up running gulp because there were some
leftover instances of if-statements that should be removed when actually running
the generator. Whelp.

<a name="0.6.0"></a>
## 0.6.0 - Cache busting and Amazon S3/Cloudfront or Rsync support

This update is for ways to deploy your site, you can now deploy your site via
Amazon S3 with Cloudfront support as well or via Rsync to your own server. Also
included is support for cache-busting so you won't have to invalidate files on
Cloudfront all the time as well as some minr fixes for the generation of a
couple of files.

#### IMPORTANT!
* **Gzip:** Your content is gzipped when you run `gulp publish` so make sure
  your server is configured for this properly when using Rsync. If you are
  using Amazon S3 and Cloudfront it will automatically give your files the
  corrent content-encoding header.

#### Changes
* **Amazon S3 and Cloudfront:** You can now upload your site to Amazon S3 and
  it'll apply the correct headers and gzip your files. Also updates the
  default root object in your Cloudfront distribution.
* **Rsync:** You can also choose to use Rsync to upload your site instead, works
  pretty much the same. Your files are gzipped before uploading so configure
  your server accordingly!
* **Conditionals:** Both the package.json and gulpfile.js are now filled only
  with the packages and commands you need so as to not bloat them.
* **Cache busting:** CSS and JavaScript files are now cache busted when running
  `gulp publish` so you don't need to invalidate assets on Cloudfront,
  this is done with [gulp-rev-all](https://github.com/smysnk/gulp-rev-all) so
  even if a file that your CSS references changes so does the cache. Nice.

#### Fixes
* **HTML minificaton:** Now actually minifies HTML. Forgot to actually pass the
  commands to minify whitespace and comments. Oops.
* **Generator:** Forgot to add a dot in front of the gitattributes file
* **package.json:** Removed some unused packages.

<a name="0.5.2"></a>
### 0.5.2 (2014-08-21)
Bugfix from [David Pett](https://github.com/davidpett) because I messed up the
dependencies/dev-dependencies in the package.json file.

<a name="0.5.1"></a>
### 0.5.1 (2014-08-17)
Forgot to include some of the new changes to the gulpfile before pushing it to
NPM. Oops.

<a name="0.5.0"></a>
## 0.5.0 (2014-08-17)

Complete overhaul of the Gulpfile, upgraded to use the newest version of Jekyll
(2.3.x as of writing this) and some changes to how the generator works.

#### Changes
* **Gulpfile:** Major overhaul, added BrowserSync for live previews, changes to
  how the tasks are run and removed a lot of unneeded tasks
* **Generator:** Complete rewrite, now also doesn't ask for directories anymore
  and now should install all the needed packages from Bower and NPM on install
* **Other:** Changed some of the tests to go with the rewrite of the generator,
  redid some of the folder structuring

<a name="0.4.1"></a>
### 0.4.1 (2014-04-09)


#### Bug Fixes

* **generator:** fixed the error
  ([79b05225](https://github.com/sondr3/generator-jekyllized/commit/79b05225e68950a227f0c0d82556be007b221110))
* **gulp:** Remove gulp-conventional-changelog
  ([1dc25404](https://github.com/sondr3/generator-jekyllized/commit/1dc25404bebc1da88d04aad336d579c2a7742685))

<a name="0.4.0"></a>
## 0.4.0 (2014-03-08)


#### Features

* **jekyll:** Major update for Jekyll
  ([05d928ae](https://github.com/sondr3/generator-jekyllized/commit/05d928ae14035a480a52c346ea877aac3023886b))


<a name="0.3.0"></a>
## 0.3.0 (2014-03-07)


#### Bug Fixes

* **generator:** fixed the error
  ([a1fe2096](https://github.com/sondr3/generator-jekyllized/commit/a1fe2096553b67194952f8e78d80d07ce27068e4))
* **templates:** Should not be versioned
  ([7c9ec67b](https://github.com/sondr3/generator-jekyllized/commit/7c9ec67b343897be936cc12953d771eace2ff70f))


#### Features

* **coffeescript:** CoffeeScript not included
  ([cc139a7f](https://github.com/sondr3/generator-jekyllized/commit/cc139a7f9578bfc5c31317c3e6adeefe46abfbd3))
* **deploy:** Removed deploy option from jekyllized
  ([ab397f04](https://github.com/sondr3/generator-jekyllized/commit/ab397f04178c2d081d313a49d9e419f805a4d0f7))
* **generator:** Update for index.js
  ([4b9ae250](https://github.com/sondr3/generator-jekyllized/commit/4b9ae25037cbf8d6d0f46f7ce9065cbf9c47641f))
* **googleanalytics:** Removed from jekyllized
  ([9ed48f1a](https://github.com/sondr3/generator-jekyllized/commit/9ed48f1ab525ed0989062864c111ddde407d4b0d))
* **googleplus:** Google Plus question removed
  ([e9463119](https://github.com/sondr3/generator-jekyllized/commit/e946311941b4b26e35f301fb0ea8eee358351cfd))
* **tools:** Doesn't ask for tools
  ([e71ccb13](https://github.com/sondr3/generator-jekyllized/commit/e71ccb135a7444d3e30825e46aaa24da6a309a72))

## 0.2.0
* Removed Grunt in favor of Gulp. For more of this see
  ([#40](https://github.com/sondr3/generator-jekyllized/issues/40)),
  ([#39](https://github.com/sondr3/generator-jekyllized/issues/39)),
  ([#31](https://github.com/sondr3/generator-jekyllized/issues/31)) and
  ([#30](https://github.com/sondr3/generator-jekyllized/issues/30))
* Lots of minor bug fixes. Using checklists now work, using .split('/') on the
  assets directories now works and some other minor tweaks.
* Reworked some of the logic for copying files to work with the new version of
  Yeoman Generator
* Updated the needed version of dependencies.
* Added a custom welcome message
  ([#27](https://github.com/sondr3/generator-jekyllized/issues/27))
* Added a .npmignore so that when publishing to NPM only the needed files are
  included

## 0.1.0
* There's now a very, very, very basic theme to do something from.
  ([#25](https://github.com/sondr3/generator-jekyllized/issues/25))
* Running tests now work.
  ([#24](https://github.com/sondr3/generator-jekyllized/issues/24))
* Added a bunch of badges to the README. Yay, badges, badges, badgers, badgers.

## 0.0.9 (January 28, 2014)
* Major restructuring and fixing of the Gruntfile and Index.js. This removes the
  functionality for the deploy options and changes the assets directories so
  you can't change them.
* Added Bitdeli, Travis CI and Waffle.io to the README.
  ([#23](https://github.com/sondr3/generator-jekyllized/issues/23)) &
  ([#21](https://github.com/sondr3/generator-jekyllized/issues/21)) &
  ([#20](https://github.com/sondr3/generator-jekyllized/issues/20))
* Google Analytics is included by default.
  ([#17](https://github.com/sondr3/generator-jekyllized/issues/17))
* Removed all mentions of javascriptPreprocessor in the code.
  ([#18](https://github.com/sondr3/generator-jekyllized/issues/18)) &
  ([#17](https://github.com/sondr3/generator-jekyllized/issues/17))
* Following up on
  [#16](https://github.com/sondr3/generator-jekyllized/issues/16), also
  removed all code for choosing between SASS and Compass etc. This will later
  run on libsass. ([#15](https://github.com/sondr3/generator-jekyllized/issues/15))
* Removed all code for jekyllPygments, it is now installed by default.
* Started a major cleanup of code throughout all the codebase to remove all
  functionality for choosing a default Markdown engine.
  ([#16](https://github.com/sondr3/generator-jekyllized/issues/16))

## 0.0.5 (January 25, 2014)
* Minor tweaking and renaming of index.js and Gruntfile.js variables and the
  site now compiles! Jekyll still doesn't really work properly, but it's a
  start.
* Fixed some of the naming in HTML files to correct the errors given when
  generating the site.
* Removed most of the code for choosing the templates as well as renamed the
  default template. ([#14](https://github.com/sondr3/generator-jekyllized/issues/14)).
* Fixed the error in issue 13 as well as updated it so that `path.join` no
  longer throws an error.
  ([#13](https://github.com/sondr3/generator-jekyllized/issues/13))
* Removed the H5BP template as this app won't be using more than one highly
  opinionated template.
  ([#14](https://github.com/sondr3/generator-jekyllized/issues/14)).
* Removed the inquirer.js requirement and updated the GA code to reflect this
  change. See the commit
  [276483c](https://github.com/sondr3/generator-jekyllized/commit/276483c61597a77dd27b17eca8936c9e0099aa1f)
  as well as the issue
  ([#9](https://github.com/sondr3/generator-jekyllized/issues/9)).
* Added index.md file to the app so you have something to work from.
* Added _README.md file to the template directory. Needs to be written for the
  user.
* A new application logic to copy over the necessary files for the app.
* Minor restructuring of the index.js file.
* Rewrote the descriptions that needed an update.
  ([#11](https://github.com/sondr3/generator-jekyllized/issues/11))
* Fix the pathing issues with cssExDir, jsExDir etc.
  ([#10](https://github.com/sondr3/generator-jekyllized/issues/10))
* Added support for installing Google Analytics during the installation.
  ([#9](https://github.com/sondr3/generator-jekyllized/issues/9))
* Moved assets into their own folder by default.
  ([#8](https://github.com/sondr3/generator-jekyllized/issues/8)) &
  ([#3](https://github.com/sondr3/generator-jekyllized/issues/3))
* Updated the README so people know that this will be a buggy ride
* Renamed all of the css, javascript and such names into longer, easier to read
  names ([#7](https://github.com/sondr3/generator-jekyllized/issues/7))
* Renamed projectname into appname so it generates correctly.
  ([#2](https://github.com/sondr3/generator-jekyllized/issues/2))

## 0.0.2 (January 24, 2014)
* Restructured the index.js file so it asks for information about the project
  first and then the owner.
  ([#1](https://github.com/sondr3/generator-jekyllized/issues/1))
* Added fields for a short biography, Twitter, Google Plus and tagline for the
  project and owner
* Renamed some of the fields for easier understanding

## 0.0.1 (January 23, 2014)
* Forked from generator-playbook and generator-jekyllrb
* Update all the names and version numbers in all the files
