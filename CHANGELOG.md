## 0.1.0
* There's now a very, very, very basic theme to do something from. ([#25](https://github.com/sondr3/generator-jekyllized/issues/25))
* Running tests now work. ([#24](https://github.com/sondr3/generator-jekyllized/issues/24))
* Added a bunch of badges to the README. Yay, badges, badges, badgers, badgers.

## 0.0.9 (January 28, 2014)
* Major restructuring and fixing of the Gruntfile and Index.js. This removes the functionality for the deploy options and changes the assets directories so you can't change them.
* Added Bitdeli, Travis CI and Waffle.io to the README. ([#23](https://github.com/sondr3/generator-jekyllized/issues/23)) & ([#21](https://github.com/sondr3/generator-jekyllized/issues/21)) & ([#20](https://github.com/sondr3/generator-jekyllized/issues/20))
* Google Analytics is included by default. ([#17](https://github.com/sondr3/generator-jekyllized/issues/17))
* Removed all mentions of javascriptPreprocessor in the code. ([#18](https://github.com/sondr3/generator-jekyllized/issues/18)) & ([#17](https://github.com/sondr3/generator-jekyllized/issues/17))
* Following up on [#16](https://github.com/sondr3/generator-jekyllized/issues/16), also removed all code for choosing between SASS and Compass etc. This will later run on libsass. ([#15](https://github.com/sondr3/generator-jekyllized/issues/15))
* Removed all code for jekyllPygments, it is now installed by default.
* Started a major cleanup of code throughout all the codebase to remove all functionality for choosing a default Markdown engine. ([#16](https://github.com/sondr3/generator-jekyllized/issues/16))

## 0.0.5 (January 25, 2014)
* Minor tweaking and renaming of index.js and Gruntfile.js variables and the site now compiles! Jekyll still doesn't really work properly, but it's a start.
* Fixed some of the naming in HTML files to correct the errors given when generating the site.
* Removed most of the code for choosing the templates as well as renamed the default template. ([#14](https://github.com/sondr3/generator-jekyllized/issues/14)).
* Fixed the error in issue 13 as well as updated it so that ```path.join``` no longer throws an error. ([#13](https://github.com/sondr3/generator-jekyllized/issues/13))
* Removed the H5BP template as this app won't be using more than one highly opinionated template. ([#14](https://github.com/sondr3/generator-jekyllized/issues/14)).
* Removed the inquirer.js requirement and updated the GA code to reflect this change. See the commit [276483c](https://github.com/sondr3/generator-jekyllized/commit/276483c61597a77dd27b17eca8936c9e0099aa1f) as well as the issue ([#9](https://github.com/sondr3/generator-jekyllized/issues/9)).
* Added index.md file to the app so you have something to work from.
* Added _README.md file to the template directory. Needs to be written for the user.
* A new application logic to copy over the necessary files for the app.
* Minor restructuring of the index.js file.
* Rewrote the descriptions that needed an update. ([#11](https://github.com/sondr3/generator-jekyllized/issues/11))
* Fix the pathing issues with cssExDir, jsExDir etc. ([#10](https://github.com/sondr3/generator-jekyllized/issues/10))
* Added support for installing Google Analytics during the installation. ([#9](https://github.com/sondr3/generator-jekyllized/issues/9))
* Moved assets into their own folder by default. ([#8](https://github.com/sondr3/generator-jekyllized/issues/8)) & ([#3](https://github.com/sondr3/generator-jekyllized/issues/3))
* Updated the README so people know that this will be a buggy ride
* Renamed all of the css, javascript and such names into longer, easier to read names ([#7](https://github.com/sondr3/generator-jekyllized/issues/7))
* Renamed projectname into appname so it generates correctly. ([#2](https://github.com/sondr3/generator-jekyllized/issues/2))

## 0.0.2 (January 24, 2014)
* Restructured the index.js file so it asks for information about the project first and then the owner. ([#1](https://github.com/sondr3/generator-jekyllized/issues/1))
* Added fields for a short biography, Twitter, Google Plus and tagline for the project and owner
* Renamed some of the fields for easier understanding 

## 0.0.1 (January 23, 2014)
* Forked from generator-playbook and generator-jekyllrb
* Update all the names and version numbers in all the files