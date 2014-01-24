'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var globule = require('globule');
var shelljs = require('shelljs');

var JekyllizeGenerator = module.exports = function JekyllizedGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
    return shelljs.which(depend);
  });

  // Exit if Ruby dependencies aren't installed
  if (!dependenciesInstalled) {
    console.log('Seems like you are missing some dependencies.' +
      '\nDouble check that ' + chalk.white('Ruby') + ' and the ' + chalk.white('Bundler gem') + ' are installed and try again.');
    shelljs.exit(1);
  }

  // Find the users name and email from Git 
  this.gitInfo = {
    ownerName: this.user.git.username,
    ownerEmail: this.user.git.email
  }

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JekyllizeGenerator, yeoman.generators.Base);

// Promts
JekyllizeGenerator.prototype.askForProject = function askForProject() {
  var cb = this.async();
  var prompts = [
    {
      name: 'projectname',
      message: 'What is the name of the project?'
    },
    {
      name: 'description',
      message: 'Description of your project:'
    },
    {
      name: 'tagline',
      message: 'What is the tagline of your project?'
    }
  ];

  // Fill in information about the project itself
  console.log(this.yeoman);
  console.log(chalk.yellow.bold('\nJekyllize will install and configure a Jekyll site after your liking.'))
  console.log(chalk.yellow('\nTell us a little about the project.') + ' →');

  this.prompt(prompts, function (props) {

    this.projectname  = props.projectname;
    this.description  = props.description;
    this.tagline      = props.tagline;

    cb();
  }.bind(this));
}

JekyllizeGenerator.prototype.askforOwner = function askforOwner() {
  var cb = this.async();
  var prompts = [
    {
      name: 'ownerName',
      message: 'What is your name?',
      default: this.gitInfo.ownerName
    },
    {
      name: 'ownerEmail',
      message: 'What is your email?',
      default: this.gitInfo.ownerEmail
    },
    {
      name: 'ownerBio',
      message: 'A short description of yourself'
    },
    {
      name: 'ownerTwitter',
      message: 'Your Twitter profile'
    },
    {
      name: 'ownerGoogle_plus',
      message: 'Your full Google Plus URL (used for Google Authorship)'
    }
  ];

  // This is to fill out the information about the owner
  console.log(chalk.yellow('\nNow tell us about yourself.') + ' →');

  this.prompt(prompts, function (props) {

    this.ownerName        = props.ownerName;
    this.ownerEmail       = props.ownerEmail;
    this.ownerBio         = props.ownerBio;
    this.ownerTwitter     = props.ownerTwitter;
    this.ownerGoogle_plus = props.ownerGoogle_plus;

    cb();
  }.bind(this));
}

JekyllizeGenerator.prototype.askForTools = function askForTools() {
  var cb = this.async();
  var prompts = [
  {
    name: 'cssPreprocessor',
    type: 'list',
    message: 'CSS preprocessor',
    choices: ['Compass', 'Sass', 'None']
  },
  {
    name: 'autoPrefixer',
    type: 'confirm',
    message: 'Use autoPrefixer?'
  },
  {
    name: 'javascriptPreprocessor',
    type: 'list',
    message: 'Javascript preprocessor',
    choices: ['None', 'Coffeescript'],
  }];

  console.log(chalk.yellow('\nWire tools and preprocessors.') + ' ☛');

  this.prompt(prompts, function (props) {

    // Multiple choice 'None' to false
    this.cssPreprocessor          = props.cssPreprocessor         === 'None' ? false : props.cssPreprocessor.toLowerCase();
    this.javascriptPreprocessor   = props.javascriptPreprocessor  === 'None' ? false : props.javascriptPreprocessor.toLowerCase();
    this.autoPrefixer             = props.autoPrefixer;

    cb();
  }.bind(this));
};

// The directories will default to /assets/ for better structure in the app
JekyllizeGenerator.prototype.askForStructure = function askForStructure() {
  var cb = this.async();
  var cssPreprocessor = this.cssPreprocessor;
  var javascriptPreprocessor  = this.javascriptPreprocessor;
  var slashFilter = function (input) {
    return input.replace(/^\/*|\/*$/g, '');
  };
  var prompts = [{
    name: 'cssDirectory',
    message: 'CSS directory',
    default: '/assets/stylesheets',
    filter: slashFilter
  },
  {
    name: 'javascriptDirectory',
    message: 'Javascript directory',
    default: '/assets/javascript',
    filter: slashFilter
  },
  {
    name: 'imageDirectory',
    message: 'Image directory',
    default: '/assets/images',
    filter: slashFilter
  },
  {
    name: 'fontsDirectory',
    message: 'Webfont directory',
    default: '/assets/fonts',
    filter: slashFilter
  },
  {
    name: 'cssPreprocessorDirectory',
    message: 'CSS preprocessor directory',
    default: '/assets/_scss',
    filter: slashFilter,
    when: function () {
      return cssPreprocessor;
    }
  },
  {
    name: 'javascriptPreprocessorDirectory',
    message: 'Javascript preprocessor directory',
    default: '/assets/_src',
    filter: slashFilter,
    when: function () {
      return javascriptPreprocessor;
    }
  }];

  console.log(chalk.yellow('\nSet up some directories.') + ' ☛' +
    '\nSee note about nested directories in the README.');

  this.prompt(prompts, function (props) {

    this.cssDirectory                     = props.cssDirectory;
    this.javascriptDirectory              = props.javascriptDirectory;
    this.imageDirectory                   = props.imageDirectory;
    this.fontsDirectory                   = props.fontsDirectory;
    this.cssPreprocessorDirectory         = props.cssPreprocessorDirectory;
    this.javascriptPreprocessorDirectory  = props.javascriptPreprocessorDirectory;

    // Split asset directories on slashes
    this.cssExDirectory   = props.cssDirectory.split('/').pop();
    this.jsExDirectory    = props.javascriptDirectory.split('/').pop();
    this.imgExDirectory   = props.imageDirectory.split('/').pop();
    this.fontsExDirectory = props.fontsDirectory.split('/').pop();

    cb();
  }.bind(this));
};

JekyllizeGenerator.prototype.askForTemplates = function askForTemplates() {
  var cb = this.async();
  var prompts = [{
    name: 'templateType',
    type: 'list',
    message: 'Site template',
    choices: ['Default Jekyll', 'HTML5 ★ Boilerplate'],
  },
  {
    name: 'h5bpCss',
    type: 'confirm',
    message: 'Add H5★BP CSS files?',
    when: function (answers) {
      return answers.templateType === 'HTML5 ★ Boilerplate';
    }
  },
  {
    name: 'h5bpJs',
    type: 'confirm',
    message: 'Add H5★BP javascript files?',
    when: function (answers) {
      return answers.templateType === 'HTML5 ★ Boilerplate';
    }
  },
  {
    name: 'h5bpIco',
    type: 'confirm',
    message: 'Add H5★BP favorite and touch icons?',
    when: function (answers) {
      return answers.templateType === 'HTML5 ★ Boilerplate';
    }
  },
  {
    name: 'h5bpDocs',
    type: 'confirm',
    message: 'Add H5★BP documentation?',
    when: function (answers) {
      return answers.templateType === 'HTML5 ★ Boilerplate';
    }
  },
  {
    name: 'h5bpAnalytics',
    type: 'confirm',
    message: 'Include Google Analytics?',
    when: function (answers) {
      return answers.templateType === 'HTML5 ★ Boilerplate';
    }
  }];

  console.log(chalk.yellow('\nChoose a template.') + ' ☛');

  this.prompt(prompts, function (props) {

    if (props.templateType === 'Default Jekyll') {
      this.templateType = 'default';
    }
    else if (props.templateType === 'HTML5 ★ Boilerplate') {
      this.templateType = 'h5bp';
    }

    this.h5bpCss       = props.h5bpCss;
    this.h5bpJs        = props.h5bpJs;
    this.h5bpIco       = props.h5bpIco;
    this.h5bpDocs      = props.h5bpDocs;
    this.h5bpAnalytics = props.h5bpAnalytics;

    cb();
  }.bind(this));
};

JekyllizeGenerator.prototype.askForDeployment = function askForDeployment() {
  var cb = this.async();
  var prompts = [{
    name: 'deploy',
    message: 'Use grunt-build-control for deployment?',
    type: 'confirm'
  },
  {
    name: 'deployRemote',
    message: 'Remote to deploy to',
    default: '../',
    when: function (answers) {
      return answers.deploy;
    }
  },
  {
    name: 'deployBranch',
    message: 'Branch to deploy to',
    default: 'gh-pages',
    when: function (answers) {
      return answers.deploy;
    }
  }];

  console.log(chalk.yellow('\nChoose deployment options.') + ' ☛');

  this.prompt(prompts, function (props) {

    this.deploy       = props.deploy;
    this.deployRemote = props.deployRemote;
    this.deployBranch = props.deployBranch;

    cb();
  }.bind(this));
};

JekyllizeGenerator.prototype.askForJekyll = function askForJekyll() {
  var cb = this.async();
  var prompts = [{
    name: 'jekyllPermalinks',
    type: 'list',
    message: 'Post permalink style',
    choices: ['date', 'pretty', 'none']
  },
  {
    name: 'markdownEngine',
    type: 'list',
    message: 'Markdown library',
    choices: ['redcarpet', 'maruku', 'rdiscount', 'kramdown']
  },
  {
    name: 'jekyllPygments',
    type: 'confirm',
    message: 'Use the Pygments code highlighting library?'
  },
  {
    name: 'jekyllPageinate',
    message: 'Number of posts to show on the home page',
    default: 'all',
    validate: function (input) {
      if (/^[0-9]*$/.test(input)) {
        return true;
      }
      if (/^all*$/i.test(input)) {
        return true;
      }
      return 'Must be a number or \'all\'';
    }
  }];

  console.log(chalk.yellow('\nAnd finally, configure Jekyll.') + ' ☛' +
              '\nYou can change all of these options in _config.yml.');

  this.prompt(prompts, function (props) {

    this.jekyllPygments       = props.jekyllPygments;
    this.markdownEngine       = props.markdownEngine;
    this.jekyllPermalinks     = props.jekyllPermalinks;
    this.jekyllPageinate      = /^all$/i.test(props.jekyllPageinate) ? false : props.jekyllPageinate;

    cb();
  }.bind(this));
};

// Generate App
JekyllizeGenerator.prototype.git = function git() {
  this.template('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

JekyllizeGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

JekyllizeGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

JekyllizeGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

JekyllizeGenerator.prototype.gemfile = function gemfile() {
  this.template('Gemfile');
};

JekyllizeGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

JekyllizeGenerator.prototype.csslint = function csslint() {
  this.template('csslintrc', '.csslintrc');
};

JekyllizeGenerator.prototype.editor = function editor() {
  this.copy('editorconfig', '.editorconfig');
};

JekyllizeGenerator.prototype.rubyDependencies = function rubyDependencies() {
  var execComplete;

  console.log('\nRunning ' + chalk.yellow.bold('bundle install') + ' to install the required gems.');

  this.conflicter.resolve(function (err) {
    if (err) {
      return this.emit('error', err);
    }

    execComplete = shelljs.exec('bundle install');

    if (execComplete.code === 0) {
      bundle = true;
    }
  });
};

JekyllizeGenerator.prototype.jekyllInit = function jekyllInit() {
  // Create the default Jekyll site in a temp folder
  shelljs.exec('bundle exec jekyll new ' + this.jekyllTmp);
};

JekyllizeGenerator.prototype.templates = function templates() {
  // Format date for posts
  var date = new Date();
  var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  // Scaffold Jekyll dirs
  this.mkdir('app/_layouts');
  this.mkdir('app/_posts');
  this.mkdir('app/_includes');
  this.mkdir('app/_plugins');
  this.mkdir(path.join('app', this.cssDirectory));
  this.mkdir(path.join('app', this.javascriptDirectory));
  this.mkdir(path.join('app', this.imageDirectory));
  this.mkdir(path.join('app', this.fontsDirectory));

  // Jekyll config files
  this.copy('_config.build.yml', '_config.build.yml');
  this.template('_config.yml');

  // Project posts
  this.copy(path.join(this.jekyllTmp, '_posts', formattedDate + '-welcome-to-jekyll.markdown'), path.join('app/_posts', formattedDate + '-welcome-to-jekyll.md'));
  this.template('app/_posts/yo-jekyllrb.md', 'app/_posts/' + formattedDate + '-yo-jekyllrb.md');

  // Jekyll default template
  if (this.templateType === 'default') {

    // Default Jekyll files
    this.copy(path.join(this.jekyllTmp, 'index.html'), 'app/index.html');
    this.copy(path.join(this.jekyllTmp, '_layouts/post.html'), 'app/_layouts/post.html');
    this.copy(path.join(this.jekyllTmp, 'css/main.css'), path.join('app', this.cssDirectory, 'main.css'));

    // Jekyll files tailored for Yeoman
    this.template('conditional/template-default/_layouts/default.html', 'app/_layouts/default.html');

    // Empty file for Usemin defaults
    this.write(path.join('app', this.javascriptDirectory, 'main.js'), '');
  }

  // HTML5 Boilerplate template
  else if (this.templateType === 'h5bp') {
    var cb = this.async();

    // H5BP files tailored for Yeoman and Jekyll
    this.copy('conditional/template-h5bp/index.html', 'app/index.html');
    this.copy('conditional/template-h5bp/_layouts/post.html', 'app/_layouts/post.html');
    this.template('conditional/template-h5bp/_includes/scripts.html', 'app/_includes/scripts.html');
    this.template('conditional/template-h5bp/_layouts/default.html', 'app/_layouts/default.html');

    // Google analytics include
    if (this.h5bpAnalytics) {
      this.copy('conditional/template-h5bp/_includes/googleanalytics.html', 'app/_includes/googleanalytics.html');
    }

    // Pull H5BP in from Github
    // Use a pre-release commit because there's so much good stuff in it, but
    // we should switch to an official release soon.
    this.remote('h5bp', 'html5-boilerplate', 'fbffd2322d37f920825629c385f905a05d141061', function (err, remote) {
      if (err) {
        return cb(err);
      }

      // Always include files
      remote.copy('.htaccess', 'app/.htaccess');
      remote.copy('404.html', 'app/404.html');
      remote.copy('crossdomain.xml', 'app/crossdomain.xml');
      remote.copy('LICENSE.md', 'app/_h5bp-docs/LICENSE.md');
      remote.copy('robots.txt', 'app/robots.txt');
      remote.copy('humans.txt', 'app/humans.txt');

      // CSS boilerplate
      if (this.h5bpCss) {
        remote.copy('css/main.css', path.join('app', this.cssDirectory, 'main.css'));
      }
      else {
        // Empty file
        this.write(path.join('app', this.cssDirectory, 'main.css'), '');
      }

      // Js boilerplate
      if (this.h5bpJs) {
        remote.copy('js/main.js', path.join('app', this.javascriptDirectory, 'main.js'));
        remote.copy('js/plugins.js', path.join('app', this.javascriptDirectory, 'plugins.js'));
      }
      else {
        // Empty file
        this.write(path.join('app', this.javascriptDirectory, 'main.js'), '');
      }

      // Touch and favicon
      if (this.h5bpIco) {
        remote.copy('apple-touch-icon-precomposed.png', 'app/apple-touch-icon-precomposed.png');
        remote.copy('favicon.ico', 'app/favicon.ico');
      }

      // Docs
      if (this.h5bpDocs) {
        remote.directory('doc', 'app/_h5bp-docs/code-docs');
        remote.copy('CHANGELOG.md', 'app/_h5bp-docs/CHANGELOG.md');
        remote.copy('CONTRIBUTING.md', 'app/_h5bp-docs/CONTRIBUTING.md');
        remote.copy('README.md', 'app/_h5bp-docs/README.md');
      }

      cb();
    }.bind(this));
  }
};

JekyllizeGenerator.prototype.pygments = function pygments() {
  // Pygments styles
  if (this.jekyllPygments) {
    this.copy(path.join(this.jekyllTmp, 'css/syntax.css'), path.join('app', this.cssDirectory, 'syntax.css'));
  }
};

JekyllizeGenerator.prototype.cssPreprocessorprocessor = function cssPreprocessorprocessor() {
  var files = globule.find('**/*.css', {srcBase: path.join('app', this.cssDirectory)});
  var cssDirectory = this.cssDirectory;

  if (this.cssPreprocessor) {
    this.mkdir(path.join('app', this.cssPreprocessorDirectory));
    this.template('conditional/css-pre/readme.md', path.join('app', this.cssPreprocessorDirectory, 'readme.md'));

    // Copy CSS files to preprocessor files
    files.forEach(function (file) {
      this.copy(path.join(process.cwd(), 'app', cssDirectory, file),
                path.join('app', this.cssPreprocessorDirectory, file.replace(/\.css$/, '.scss')));

      // Wait until copy is completely finished and then delete files.
      this.conflicter.resolve(function (err) {
        if (err) {
          return this.emit('error', err);
        }
        spawn('rm', [path.join('app', cssDirectory, file)], { stdio: 'inherit' });
      });
    }, this);
  }
};

JekyllizeGenerator.prototype.javascriptPreprocessorprocessor = function javascriptPreprocessorprocessor() {
  if (this.javascriptPreprocessor) {
    this.mkdir(path.join('app', this.javascriptPreprocessorDirectory));
  }

  if (this.javascriptPreprocessor === 'coffeescript') {
    this.template('conditional/coffee/readme.md', path.join('app', this.javascriptPreprocessorDirectory, 'readme.md'));
  }
};
