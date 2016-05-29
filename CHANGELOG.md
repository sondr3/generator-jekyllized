<a name="1.0.0-rc.1"></a>
## 1.0.0-rc.1
> 2016-05-29

Release the first release candidate for `generator-jekyllized` that isn't hidden
behind a tag, so it will be listed as the latest release. Also did a minor fix
for the `rebuild` task in the gulpfile.

#### Changelog:
* [[`497e716c18`](https://github.com/sondr3/generator-jekyllized/commit/497e716c18)] - Update README, release candidate and minor gulp fix
* [[`15116be9d0`](https://github.com/sondr3/generator-jekyllized/commit/15116be9d0)] - Overlooked something during the merge
* [[`6e851d078f`](https://github.com/sondr3/generator-jekyllized/commit/6e851d078f)] - Merge branch 'beta'

<a name="1.0.0-beta.23"></a>
## 1.0.0-beta.23
> 2016-05-29

Fixed the syntax for gulp-imagemin as it made the gulpfile error out, and also
updated the function to validate the URL to be smaller.

#### Changelog:
* [[`3a142ef021`](https://github.com/sondr3/generator-jekyllized/commit/3a142ef021)] - Fix syntax for gulp-imagemin
* [[`3a39933bcc`](https://github.com/sondr3/generator-jekyllized/commit/3a39933bcc)] - Simplify validate function

<a name="1.0.0-beta.22"></a>
## 1.0.0-beta.22
> 2016-05-28

This is for the most part a pure backend update release and nothing too major
happened to the generator itself besides updating a few packages. Other than
that I moved to using AVA instead of Mocha for testing and had a heyday trying
to get that to work, it was quite the party. But it all works well, and quite a
lot faster as well.

#### Changelog:
* [[`65a05d6050`](https://github.com/sondr3/generator-jekyllized/commit/65a05d6050)] - Update license year \[ci skip\]
* [[`d2479127ea`](https://github.com/sondr3/generator-jekyllized/commit/d2479127ea)] - Didn't read the documentation...
* [[`ca13406b2d`](https://github.com/sondr3/generator-jekyllized/commit/ca13406b2d)] - Readd welcome message, update skip-install message
* [[`63f97fbadc`](https://github.com/sondr3/generator-jekyllized/commit/63f97fbadc)] - Ignore some assert functions
* [[`5acea649c9`](https://github.com/sondr3/generator-jekyllized/commit/5acea649c9)] - Update packages, fix testing for versions
* [[`0415f99ef5`](https://github.com/sondr3/generator-jekyllized/commit/0415f99ef5)] - Fix checking dependencies, update AVA
* [[`19ea9665c3`](https://github.com/sondr3/generator-jekyllized/commit/19ea9665c3)] - Fix tests, update yeoman-generator
* [[`fa9e6b166a`](https://github.com/sondr3/generator-jekyllized/commit/fa9e6b166a)] - Nope, not working still...
* [[`07658812f4`](https://github.com/sondr3/generator-jekyllized/commit/07658812f4)] - Third time's the charm
* [[`c3eab364a5`](https://github.com/sondr3/generator-jekyllized/commit/c3eab364a5)] - Second try
* [[`8b03cea0e3`](https://github.com/sondr3/generator-jekyllized/commit/8b03cea0e3)] - Apparently you must tell it to install node packages as well
* [[`3c201a7f45`](https://github.com/sondr3/generator-jekyllized/commit/3c201a7f45)] - Install bundler when testing
* [[`deac0babc5`](https://github.com/sondr3/generator-jekyllized/commit/deac0babc5)] - Don't install dependencies
* [[`7e5b80a8f1`](https://github.com/sondr3/generator-jekyllized/commit/7e5b80a8f1)] - ***Revert*** "back from all the testing of the tests"
* [[`abe1489574`](https://github.com/sondr3/generator-jekyllized/commit/abe1489574)] - ***Revert*** "Try using --serial for AVA on Travis"
* [[`a3c1dd3ce4`](https://github.com/sondr3/generator-jekyllized/commit/a3c1dd3ce4)] - Fix syntax error
* [[`0971a893c8`](https://github.com/sondr3/generator-jekyllized/commit/0971a893c8)] - Even more testing the tests
* [[`64425a1497`](https://github.com/sondr3/generator-jekyllized/commit/64425a1497)] - Test testing
* [[`9b180fa433`](https://github.com/sondr3/generator-jekyllized/commit/9b180fa433)] - Try using --serial for AVA on Travis
* [[`069ba32849`](https://github.com/sondr3/generator-jekyllized/commit/069ba32849)] - Rename a test because having two of them got confusing
* [[`e5463ac2d6`](https://github.com/sondr3/generator-jekyllized/commit/e5463ac2d6)] - Try running AVA in serial
* [[`4a85a4f7e7`](https://github.com/sondr3/generator-jekyllized/commit/4a85a4f7e7)] - Update packages
* [[`b8db04b189`](https://github.com/sondr3/generator-jekyllized/commit/b8db04b189)] - Give me Travis updates on Gitter
* [[`6c9b516adb`](https://github.com/sondr3/generator-jekyllized/commit/6c9b516adb)] - Refactor testing of uploading a bit
* [[`fa3b95c818`](https://github.com/sondr3/generator-jekyllized/commit/fa3b95c818)] - Add gitter badge, remove some other badges
* [[`1ac45b380f`](https://github.com/sondr3/generator-jekyllized/commit/1ac45b380f)] - Remove gulpfile and unused files from root as well
* [[`a78b9cc6a1`](https://github.com/sondr3/generator-jekyllized/commit/a78b9cc6a1)] - Remove unused files
* [[`830b5dfee6`](https://github.com/sondr3/generator-jekyllized/commit/830b5dfee6)] - I dun goofed
* [[`b710300749`](https://github.com/sondr3/generator-jekyllized/commit/b710300749)] - Removed node v4 by accident
* [[`e77a1e5d50`](https://github.com/sondr3/generator-jekyllized/commit/e77a1e5d50)] - Move to using AVA for tests

<a name="1.0.0-beta.21"></a>
## 1.0.0-beta.21
> 2016-05-22

Forgot to remove a mention of a old gulp task.

#### Changelog:
* [[`b46b1e57f8`](https://github.com/sondr3/generator-jekyllized/commit/b46b1e57f8)] - Remove mention of clean:metadata

<a name="1.0.0-beta.20"></a>
## 1.0.0-beta.20
> 2016-05-22

Big bugfix release, fixed how `jekyllized` processes the Jekyll site. It now
copies the `src` of your Jekyll site to `.tmp` and does it's processing there so
it doesn't infect your git history. It will also now properly reload your site
when changing your posts.

Also removed the `jekyll-archives` gem because it wasn't being used for anything
nor is it being updated. And, finally, updated the packages for the generator.

#### Changelog:
* [[`f27129fa5b`](https://github.com/sondr3/generator-jekyllized/commit/f27129fa5b)] - Remove asking for Github and Twitter
* [[`a28a5eaf30`](https://github.com/sondr3/generator-jekyllized/commit/a28a5eaf30)] - Fix regeneration of sites
* [[`cfc3eb17f1`](https://github.com/sondr3/generator-jekyllized/commit/cfc3eb17f1)] - Make it properly skip install when testing
* [[`3a2cc26659`](https://github.com/sondr3/generator-jekyllized/commit/3a2cc26659)] - ES2015, Travis and Syntax changes
* [[`96374df57f`](https://github.com/sondr3/generator-jekyllized/commit/96374df57f)] - Copy to a temporary directory, ES2015 updates
* [[`4a6b983d64`](https://github.com/sondr3/generator-jekyllized/commit/4a6b983d64)] - Remove jekyll-archives
* [[`5892ae79e9`](https://github.com/sondr3/generator-jekyllized/commit/5892ae79e9)] - Update packages

<a name="1.0.0-beta.19"></a>
## 1.0.0-beta.19
> 2016-04-23

Added validation to the URL because Jekyll requires them to at least include
`//`, so now URLs must include either `HTTP` or `HTTPS`.

#### Changelog:
* [[`ee3264d1b5`](https://github.com/sondr3/generator-jekyllized/commit/ee3264d1b5)] - Fix URLs needing HTTP(s)

<a name="1.0.0-beta.18"></a>
## 1.0.0-beta.18
> 2016-04-17

Downgrade the version of `jekyll-feed`. Needed because Jekyll has changed how it
requires URLs to be written in `_config.yml` and doesn't support URLs without
`http://`. I'm going on vacation and don't have the time to fix it before my
flight leaves :D

#### Changelog:
* [[`62c4255b0a`](https://github.com/sondr3/generator-jekyllized/commit/62c4255b0a)] - Fix error with jekyll-feed for now

<a name="1.0.0-beta.17"></a>
## 1.0.0-beta.17
> 2016-04-15

Updated the BrowserSync config in the gulpfile to the newer syntax.

#### Changelog:
* [[`6365af1330`](https://github.com/sondr3/generator-jekyllized/commit/6365af1330)] - Update to latest BrowserSync config

<a name="1.0.0-beta.16"></a>
## 1.0.0-beta.16
> 2016-04-15

Fixed the issue where the generator would refuse to install because it couldn't
resolve the dependency on `yargs` because I didn't add it as a dependency but
added it as a devdependency instead. Whoops.

#### Changelog:
* [[`94d0c54b42`](https://github.com/sondr3/generator-jekyllized/commit/94d0c54b42)] - Fix not installing properly

<a name="1.0.0-beta.15"></a>
## 1.0.0-beta.15
> 2016-04-15

Added support for updating your gulpfile and package.json with your specified
uploading settings, so you can now stay up to date pretty easily! Neat.

#### Changelog:
* [[`dc32d51696`](https://github.com/sondr3/generator-jekyllized/commit/dc32d51696)] - Add support for updating your gulpfile

<a name="1.0.0-beta.14"></a>
## 1.0.0-beta.14
> 2016-04-14

Fixed a typo in the cache-headers for Amazon S3, thanks @xHN35RQ.

#### Changelog:
* [[`8ca22fe71c`](https://github.com/sondr3/generator-jekyllized/commit/8ca22fe71c)] - max-age, not max-axe... sadly

<a name="1.0.0-beta.13"></a>
## 1.0.0-beta.13
> 2016-04-14

Fixed a issue where Jekyll wouldn't generate when run with LSI turned on, so
this was disabled as it isn't used for anything. And fixed the uploading for
AWS.

#### Changelog:
* [[`a67e69c083`](https://github.com/sondre/generator-jekyllized/commit/a67e69c083)] - Fix uploading for AWS
* [[`d16c4944ef`](https://github.com/sondre/generator-jekyllized/commit/d16c4944ef)] - Remove LSI

<a name="1.0.0-beta.12"></a>
## 1.0.0-beta.12
> 2016-04-01

Updated to the latest theme of Jekyll and it's CSS and removed Octopress as it
wasn't used at all. Added support for the Github field in Jekyll as well and
rewrote parts of the REAMEs for the project. Mostly cosmetic changes.

#### Changelog:
* [[`605026a5d2`](https://github.com/sondr3/generator-jekyllized/commit/605026a5d2)] - New beta release, update README and settings
* [[`c770bd97a8`](https://github.com/sondr3/generator-jekyllized/commit/c770bd97a8)] - Remove Octopress
* [[`a332153118`](https://github.com/sondr3/generator-jekyllized/commit/a332153118)] - Add Github information, minor fixes to generator
* [[`ca98d6b0df`](https://github.com/sondr3/generator-jekyllized/commit/ca98d6b0df)] - Forgot to add the new Github/Twitter files. Whoops
* [[`5f2f19dd43`](https://github.com/sondr3/generator-jekyllized/commit/5f2f19dd43)] - Update to latest Jekyll theme and settings
* [[`c1a9e25193`](https://github.com/sondr3/generator-jekyllized/commit/c1a9e25193)] - Installation instructions
* [[`dd314da58f`](https://github.com/sondr3/generator-jekyllized/commit/dd314da58f)] - New beta release

<a name="1.0.0-beta.11"></a>
## 1.0.0-beta.11
> 2016-03-30

Fix injecting JS as well, forgot that JS as well is injected into the browser.

#### Changelog:
* [[`a60aa79ed2`](https://github.com/sondr3/generator-jekyllized/commit/a60aa79ed2)]: Fix injecting for JS as well
* [[`7bdf3908b5`](https://github.com/sondr3/generator-jekyllized/commit/7bdf3908b5)]: Update how versions works

<a name="1.0.0-beta.10"></a>
## 1.0.0-beta.10
> 2016-03-30

This was a test release to figure out how to use tags instead of specific
versions when publishing to NPM. `generator-jekyllized` is now available under
the `generator-jekyllized@next` version instead of various `beta.xx` releases.

<a name="1.0.0-beta.9"></a>
## 1.0.0-beta.9
> 2016-03-29

Fixes a couple of bugs and updates packages and documentation, nothing major.

#### Changelog:

* [[`13e74ebf04`](https://github.com/sondr3/generator-jekyllized/commit/13e74ebf04)]: New beta release
* [[`92dc47368b`](https://github.com/sondr3/generator-jekyllized/commit/92dc47368b)]: Update packages
* [[`2db01cec21`](https://github.com/sondr3/generator-jekyllized/commit/2db01cec21)]: Verify that dependencies are installed
* [[`3c6bc46569`](https://github.com/sondr3/generator-jekyllized/commit/3c6bc46569)]: Update README on dependencies, closes #116
* [[`f8399d6cf3`](https://github.com/sondr3/generator-jekyllized/commit/f8399d6cf3)]: Add jekyll-seo-tag and update accordingly
* [[`a9ca289ff7`](https://github.com/sondr3/generator-jekyllized/commit/a9ca289ff7)]: Merge pull request #117 from chbachman/beta
* [[`1fbc5a21b5`](https://github.com/sondr3/generator-jekyllized/commit/1fbc5a21b5)]: Fix CSS Reloading
* [[`3ae95eabc7`](https://github.com/sondr3/generator-jekyllized/commit/3ae95eabc7)]: Prevent CSSNano from AutoPrefixing so as to not overwrite your own settings

<a name="1.0.0-beta.8"></a>
## 1.0.0-beta.8
> 2016-02-08

Managed to write the syntax wrong in one of the gulptasks which broke everything
and I made the gems listed in the Gemfile line up alphabetically because I like
it that way. Also updated the README that gets generated with your project for
the new commands.

#### Changelog:

* [[`cae8478`](https://github.com/sondr3/generator-jekyllized/commit/cae847815cdc0050e4cf9aeb8526180116a2dcc1)]:
Fix syntax error, alphabetize Gemfile, update docs

<a name="1.0.0-beta.7"></a>
## 1.0.0-beta.7
> 2016-02-07

Updated the packages, fixed some spacing and color issues when running the
generator and removed the Bower subgenerator as it did absolutely nothing
anymore. Also stopped supporting ancient versions of Node and such.

#### Changelog:

* [[`c5852fa`](https://github.com/sondr3/generator-jekyllized/commit/c5852fa7e286fc646934183064ab5980c28e8abc)]:
Add command to clean images and update docs.
* [[`1a20f35`](https://github.com/sondr3/generator-jekyllized/commit/1a20f356a5350502e2ff1acd6045cbc2bc7f61ee)]:
Update permalink settings and fix spacing/color on questions.
* [[`dd749de`](https://github.com/sondr3/generator-jekyllized/commit/dd749de4c00f910329325ddf439b630a8226e04d)]:
Remove bower subgenerator.
* [[`00598f8`](https://github.com/sondr3/generator-jekyllized/commit/00598f868c45957a129e37418e0a89fc3297f1e6)]:
Update packages.
* [[`0632d9f`](https://github.com/sondr3/generator-jekyllized/commit/0632d9fcc936ae138d4e865e0ee25dea7ae07070)]:
Move away from ancient Node versions.

<a name="1.0.0-beta.6"></a>
## 1.0.0-beta.6

> 2016-01-14

Fixed a typo in the `aws-configuration.json` file.

#### Changelog:

* [[`cfa66e8`](https://github.com/sondr3/generator-jekyllized/commit/f8a1cb5757400f5505bf4733d0f0db31e4d05256)]:
Fix typo in AWS config file.

<a name="1.0.0-beta.5"></a>
## 1.0.0-beta.5

> 2016-01-14

Updated the packages and applied some of the changes that were required from
them and moved from a deprecated gulp-plugin to the not deprecated one.

#### Changelog:

* [[`ccd7718`](https://github.com/sondr3/generator-jekyllized/commit/a5a1a92cfdc3863cec55fee93d96482aec14c0de)]:
Update packages and apply the needed changes.
* [[`a5a1a92`](https://github.com/sondr3/generator-jekyllized/commit/887dab1cd011c35c24053a7d263fa31119505cd3)]:
Move from deprecated gulp-plugin.

<a name="1.0.0-beta.4"></a>
## 1.0.0-beta.4

> 2015-12-04

Fix a couple of typos and the output path for fonts. Huge thanks to @S1SYPHOS
for spotting them and sending a pull request.

#### Changelog:

* [[`833f9b6`](https://github.com/sondr3/generator-jekyllized/commit/833f9b6e5ff9d85c62455852bf6ccdb76c10d36d)]:
Fix typos and the output folder for fonts

<a name="1.0.0-beta.3"></a>
## 1.0.0-beta.3

> 2015-11-19

Add documentation when running the generator and a line in `config.yml` about how
to format your Twitter handle.

#### Changelog:

* [[`055685a`](https://github.com/sondr3/generator-jekyllized/commit/055685a93935dd100056ad443e9b7ed3723e9ad9)]:
Twitter documentation and new beta

<a name="1.0.0-beta.2"></a>
## 1.0.0-beta.2

> 2015-11-18

Fixed an error with Babel not properly working since it now needs a `.babelrc` file.

#### Changelog:

* [[`9472305`](https://github.com/sondr3/generator-jekyllized/commit/947230546c5fad2bfaf001680299d189c24f7b66)]:
Fix Babel 6.0 not working

<a name="1.0.0-beta.1"></a>
## 1.0.0-beta.1

> 2015-11-07

## BREAKING
EVERYTHING. Not really, but pretty much every part of the generator has been
touched and fixed. Moved the generator over to Gulp 4.0 and Jekyll 3.0,
because moving too fast is fun. The main change here was Gulp 4.0 makes running
tasks in series/parallel a lot, and I mean a lot, easier.

Technically this isn't breaking as it won't affect people who have previously
installed and are running a previous version but hey. Thanks to @nilsborchers,
@snrbrnjna, @SeanSith, @gjeck, @pope410211, @lvnilesh and @dcalhoun for finding
errors, fixing bugs, helping write new features and being cool people.

#### Major changes
* **Gulp:** Upgraded to Gulp 4.0 and rewrote the whole Gulpfile in ES2015, no
  line was spared the onslaught. No functions were lost but a whole lot was
  updated and made better. Progress!
* **Command line arguments:** Instead of having lots of duplicated gulp tasks
  and commands that you needed to run to build your site for either local
  development and production, you now only add `--prod` to the commands and
  voila, you are now building with production settings. Progress!
* **Jekyll:** Upgraded to Jekyll 3 with all the bells and whistles that come
  with it. Added `jekyll-archives`, `jekyll-sitemap`, `jekyll-feed` and
  `jekyll-gist` and kept `jekyll-paginate`. It will automatically create fully
  compliant sitemaps and ATOM feeds for your site as well as automatic archive
  pages for your tags and categories. Updated the `config.yml` accordingly.
* **Yeoman:** Updated to the latest version of Yeoman and split the generator
  into several smaller subgenerators, so you can update only select components
  instead of the whole thing at once. Progress!
* **Bower:** Kinda added support for Bower. Read the README for how it works.
* **Misc:** The built site now lives in `dist`, the assets live in `.tmp` while
  being built, moved from Useref to `gulp-inject`, but that change should be
  invisible unless you care about it.

#### Minor changes
* **Packages**: Updated all the packages.
* **Assets:** Fixed how most of the assets are generated:
    * **SCSS/CSS:** Now creates sourcemaps when you're not running it with
      production settings, and uses PostCSS to run AutoPrefixer. When using
      production settings it won't create sourcemaps, but will minify, gzip
      and cache bust your `style.css`.
    * **JS:** Same as with your SCSS/CSS, although it's concatenated into a
      `index.js` file.
    * **Injecting:** Moved from Useref to `gulp-inject`, this doesn't affect
      much but it changes how your assets are injected into the HTML. This is
      a background change for the most part and doesn't change the behaviour
      in any way.
    * **HTML:** Your HTML is automatically minified and has separate gzipped
      files created when you run it with production settings.
* **Jekyll:** Updated to Jekyll 3.0:
    * **`jekyll-archives`:** This gem automatically creates archive pages for
      your tags and categories. Included in this generator are templates for
      these.
    * **`jekyll-sitemap`/`jekyll-feed`:** Moved from having to maintain these
      myself to the official Jekyll gems for better support and such
    * **`jekyll-gist`:** Added to support including Gists
    * **`jekyll-paginate`:** Jekyll 3.0 doesn't include this by default, but
      it's nice to have
* **Octopress:** Included Octopress into the gem, you should read up on what it
    does because it's pretty swell!

#### Behind the scenes
* **Tests:** Continued working on tests to make errors even less likely. Yay
  tests. Also fixed timeouts thanks to @gjeck.
* **Git**: Fixed the gitignore for the new paths
* **Moar**: Made everything more awesome.

#### CHANGELOG
* [[`ea4d58504a`](https://github.com/sondr3/generator-jekyllized/commit/ea4d58504a)]: Update documentation, changelog \[ci skip\]
* [[`5ff23edd71`](https://github.com/sondr3/generator-jekyllized/commit/5ff23edd71)]: Updated deployment configuration for AWS
* [[`92b2048206`](https://github.com/sondr3/generator-jekyllized/commit/92b2048206)]: Updated comments and style in gulpfile
* [[`9df2a7d8ee`](https://github.com/sondr3/generator-jekyllized/commit/9df2a7d8ee)]: Merge branches 'command-line-arguments', 'travis' and 'yeoman-generator' into beta
* [[`34b5b16dac`](https://github.com/sondr3/generator-jekyllized/commit/34b5b16dac)]: Add support for command line flags
* [[`ae185e5821`](https://github.com/sondr3/generator-jekyllized/commit/ae185e5821)]: Remove yeoman-generator from dev-deps and keep it in deps
* [[`d570b46900`](https://github.com/sondr3/generator-jekyllized/commit/d570b46900)]: Update Travis configuration
* [[`25350c90ee`](https://github.com/sondr3/generator-jekyllized/commit/25350c90ee)]: Update dependencies
* [[`eb6dd1d850`](https://github.com/sondr3/generator-jekyllized/commit/eb6dd1d850)]: Merge pull request #102 from dcalhoun/bug/remove-gulp-changed
* [[`74afd24932`](https://github.com/sondr3/generator-jekyllized/commit/74afd24932)]: Merge pull request #101 from dcalhoun/bug/missing-gulp-newer
* [[`f4471ec004`](https://github.com/sondr3/generator-jekyllized/commit/f4471ec004)]: Remove unused dependency: gulp-changed (David Calhoun)
* [[`2139e7321b`](https://github.com/sondr3/generator-jekyllized/commit/2139e7321b)]: Add missing dependency: gulp-newer (David Calhoun)
* [[`9a8a91fb36`](https://github.com/sondr3/generator-jekyllized/commit/9a8a91fb36)]: Merge pull request #100 from dcalhoun/bundler-dependency
* [[`70fb46ae19`](https://github.com/sondr3/generator-jekyllized/commit/70fb46ae19)]: List Bundler as a dependency, alphabetize footnotes (David Calhoun)
* [[`f462a883af`](https://github.com/sondr3/generator-jekyllized/commit/f462a883af)]: Updated gulpfile, fixed autoprefixer, gulp-inject
* [[`88153c102e`](https://github.com/sondr3/generator-jekyllized/commit/88153c102e)]: Typo in package version \[ci-skip\]
* [[`a377d46472`](https://github.com/sondr3/generator-jekyllized/commit/a377d46472)]: Update packages and tests, and update Rsync logic
* [[`e7f2c8b5a5`](https://github.com/sondr3/generator-jekyllized/commit/e7f2c8b5a5)]: Forgot to include removal of Bower files etc
* [[`428c827d53`](https://github.com/sondr3/generator-jekyllized/commit/428c827d53)]: Removed Wiredep etc because it's not needed
* [[`8dd8f858a4`](https://github.com/sondr3/generator-jekyllized/commit/8dd8f858a4)]: Minor updates to the gulpfile
* [[`d72df97c92`](https://github.com/sondr3/generator-jekyllized/commit/d72df97c92)]: Update tests with new syntax
* [[`9ee6dbab6f`](https://github.com/sondr3/generator-jekyllized/commit/9ee6dbab6f)]: Fixed generation of humans.txt
* [[`8dda8792bc`](https://github.com/sondr3/generator-jekyllized/commit/8dda8792bc)]: Change to default AWS location
* [[`117cfd03d4`](https://github.com/sondr3/generator-jekyllized/commit/117cfd03d4)]: Update to test node stable and remove pre-install
* [[`ad026ccb42`](https://github.com/sondr3/generator-jekyllized/commit/ad026ccb42)]: Updated skip-install
* [[`66e686e9d5`](https://github.com/sondr3/generator-jekyllized/commit/66e686e9d5)]: Updated to latest yeoman-assert
* [[`684a734739`](https://github.com/sondr3/generator-jekyllized/commit/684a734739)]: Remove execute permissions from files
* [[`b8c4d986ef`](https://github.com/sondr3/generator-jekyllized/commit/b8c4d986ef)]: Further updates to the Gulpfile
* [[`b5de5c755e`](https://github.com/sondr3/generator-jekyllized/commit/b5de5c755e)]: Update code style, continue overhaul of gulpfile
* [[`c9a1339efb`](https://github.com/sondr3/generator-jekyllized/commit/c9a1339efb)]: Overhauled the Gulpfile
* [[`1c314fe8e4`](https://github.com/sondr3/generator-jekyllized/commit/1c314fe8e4)]: Forgot to update packages in tests, whoops
* [[`ee8f2f13b0`](https://github.com/sondr3/generator-jekyllized/commit/ee8f2f13b0)]: Moved from JShint/JSCS to ESlint, updated Travis
* [[`6c32fcebb3`](https://github.com/sondr3/generator-jekyllized/commit/6c32fcebb3)]: Updated tests, changelog and packages/description
* [[`f945311174`](https://github.com/sondr3/generator-jekyllized/commit/f945311174)]: Various bugfixes and style improvements
* [[`6b5f70c5a6`](https://github.com/sondr3/generator-jekyllized/commit/6b5f70c5a6)]: Add classifier-reborn gem so related posts work
* [[`9278f73f0a`](https://github.com/sondr3/generator-jekyllized/commit/9278f73f0a)]: Add subgenerator for Bower
* [[`9b99b28be8`](https://github.com/sondr3/generator-jekyllized/commit/9b99b28be8)]: Forgot parts of the tests \[ci skip\]
* [[`2b9660b9d5`](https://github.com/sondr3/generator-jekyllized/commit/2b9660b9d5)]: Beginning of Bower
* [[`55785b530e`](https://github.com/sondr3/generator-jekyllized/commit/55785b530e)]: Updated packages
* [[`9ded303d4a`](https://github.com/sondr3/generator-jekyllized/commit/9ded303d4a)]: Reverting the test that installs dependencies
* [[`f3595118bb`](https://github.com/sondr3/generator-jekyllized/commit/f3595118bb)]: ES6, tests now test installation, updated JS checks
* [[`9f451dd548`](https://github.com/sondr3/generator-jekyllized/commit/9f451dd548)]: Fixed SCSS generation and updated Jekyll templates
* [[`0f075c8d82`](https://github.com/sondr3/generator-jekyllized/commit/0f075c8d82)]: Updated Gulpfile, packages, JShint and Jekyll
* [[`e772f0da28`](https://github.com/sondr3/generator-jekyllized/commit/e772f0da28)]: Updated packages for jekyllized and removed unused line
* [[`752f5979dd`](https://github.com/sondr3/generator-jekyllized/commit/752f5979dd)]: The boilerplate generator now creates a README
* [[`c787ca5ea5`](https://github.com/sondr3/generator-jekyllized/commit/c787ca5ea5)]: Fix errors with install and watching for changes
* [[`3256f72415`](https://github.com/sondr3/generator-jekyllized/commit/3256f72415)]: Updated packages and Jekyll tests
* [[`391f5f1d0e`](https://github.com/sondr3/generator-jekyllized/commit/391f5f1d0e)]: Updated Jekyll generator and removed some settings
* [[`b74a88b72d`](https://github.com/sondr3/generator-jekyllized/commit/b74a88b72d)]: Added subgenerator for jekyll
* [[`66e580dded`](https://github.com/sondr3/generator-jekyllized/commit/66e580dded)]: Updated tests and the test runner task
* [[`bf65d66542`](https://github.com/sondr3/generator-jekyllized/commit/bf65d66542)]: Updated packages, fixed errors on tests
* [[`24ad2df30d`](https://github.com/sondr3/generator-jekyllized/commit/24ad2df30d)]: More updates to the gulp subgenerator and tests
* [[`d314bebe12`](https://github.com/sondr3/generator-jekyllized/commit/d314bebe12)]: Probably a good idea to include the new directory
* [[`420aac0c02`](https://github.com/sondr3/generator-jekyllized/commit/420aac0c02)]: Move some subgenerators to a boilerplate generator
* [[`06677501c2`](https://github.com/sondr3/generator-jekyllized/commit/06677501c2)]: Initial commit for jekyllized:gulp
* [[`336e2693bc`](https://github.com/sondr3/generator-jekyllized/commit/336e2693bc)]: Merged package subgen with app generator
* [[`8cc242fd37`](https://github.com/sondr3/generator-jekyllized/commit/8cc242fd37)]: Updated ordering of importance, added config file
* [[`ee0b2b3a4a`](https://github.com/sondr3/generator-jekyllized/commit/ee0b2b3a4a)]: Somehow lodash vanished
* [[`dd974a2157`](https://github.com/sondr3/generator-jekyllized/commit/dd974a2157)]: Don't create a test directory \[ci-skip\]
* [[`21e356fee1`](https://github.com/sondr3/generator-jekyllized/commit/21e356fee1)]: Added subgenerator for packages and fixed a typo
* [[`729ec19acb`](https://github.com/sondr3/generator-jekyllized/commit/729ec19acb)]: Added git submodule and minor formatting changes
* [[`70eb5105bd`](https://github.com/sondr3/generator-jekyllized/commit/70eb5105bd)]: Updated code style
* [[`6b74b18e91`](https://github.com/sondr3/generator-jekyllized/commit/6b74b18e91)]: Update link to Gulp 4.0
* [[`fe9b959b86`](https://github.com/sondr3/generator-jekyllized/commit/fe9b959b86)]: Added subgenerators for jshint/jscs/editorconfig
* [[`bf0f1902fa`](https://github.com/sondr3/generator-jekyllized/commit/bf0f1902fa)]: Towards Yeoman 0.19
* [[`a083587c7c`](https://github.com/sondr3/generator-jekyllized/commit/a083587c7c)]: Updated the gulpfile and added trash to clean dirs
* [[`dff2a895e4`](https://github.com/sondr3/generator-jekyllized/commit/dff2a895e4)]: Updated tests, packages and Travis settings
* [[`d0de17a18c`](https://github.com/sondr3/generator-jekyllized/commit/d0de17a18c)]: Moved path settings to a JSON file, updated tests
* [[`a98227710b`](https://github.com/sondr3/generator-jekyllized/commit/a98227710b)]: Moved from Atom to RSS2.0 feed
* [[`953a8be7bd`](https://github.com/sondr3/generator-jekyllized/commit/953a8be7bd)]: Removed the welcome message, updated gulp-istanbul
* [[`f69533d3f2`](https://github.com/sondr3/generator-jekyllized/commit/f69533d3f2)]: Moved to jekyll-sitemaps and tweaks to the theme
* [[`67eaa12b67`](https://github.com/sondr3/generator-jekyllized/commit/67eaa12b67)]: Moved back to the default Jekyll theme
* [[`d577a8b3bb`](https://github.com/sondr3/generator-jekyllized/commit/d577a8b3bb)]: Updated all the tests and fixed the deploy task
* [[`caf91fc0b2`](https://github.com/sondr3/generator-jekyllized/commit/caf91fc0b2)]: Archives, improved generation and more
* [[`464733e700`](https://github.com/sondr3/generator-jekyllized/commit/464733e700)]: Updated documentation, directories and tests
* [[`ca13446e31`](https://github.com/sondr3/generator-jekyllized/commit/ca13446e31)]: More changes for the Gulpfile and moved JS to body
* [[`35dfe47120`](https://github.com/sondr3/generator-jekyllized/commit/35dfe47120)]: Started work on Gulp 4.0 and Jekyll 3.0

<a name="0.7.1"></a>
## 0.7.1 - Bugfix

#### Fixes
* **LiveReload:** Fix from @[thiago-om](https://github.com/thiago-om) for generating and reloading JavaScript
  files with BrowserSync.

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
