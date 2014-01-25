'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var globule = require('globule');
var shelljs = require('shelljs');

var JekyllizeGenerator = module.exports = function JekyllizeGenerator(args, options, config) {
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
      choices: ['Sass', 'None']
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
    },
    {
      name: 'googleAnalytics',
      type: 'confirm',
      message: 'Include Google Analytics?',
    },
  ];

  console.log(chalk.yellow('\nWire tools and preprocessors.') + ' ☛');

  this.prompt(prompts, function (props) {

    // Multiple choice 'None' to false
    this.cssPreprocessor          = props.cssPreprocessor         === 'None' ? false : props.cssPreprocessor.toLowerCase();
    this.javascriptPreprocessor   = props.javascriptPreprocessor  === 'None' ? false : props.javascriptPreprocessor.toLowerCase();
    this.autoPrefixer             = props.autoPrefixer;
    this.googleAnalytics          = props.googleanalytics;

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
    this.cssExDirectory           = props.cssDirectory.split('/').pop();
    this.javascriptsExDirectory   = props.javascriptDirectory.split('/').pop();
    this.imgagesExDirectory       = props.imageDirectory.split('/').pop();
    this.fontsExDirectory         = props.fontsDirectory.split('/').pop();

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
    message: 'Post permalink style' + 
    (chalk.red(
      '\n    date:    /:categories/:year/:month/:day/:title.html' + 
      '\n    pretty:  /:categories/:year/:month/:day/:title/' +
      '\n    none:    /:categories/:title.html')),
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

// Make sure the Ruby dependencies are installed and works
JekyllizeGenerator.prototype.rubyDependencies = function rubyDependencies() {
  this.template('Gemfile');
  this.conflicter.resolve(function (err) {
    if (err) {
      return this.emit('error', err);
    }
    shelljs.exec('bundle install');
  });
};

// Generate and copy over the necessary files to the application
JekyllizeGenerator.prototype.copyFiles = function copyFiles() {
  this.directory('app', 'app');
  this.copy('Gemfile', 'Gemfile');
  this.copy('csslintrc', '.csslintrc');
  this.copy('gitignore', '.gitignore');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_config.yml', '_config.yml');
  this.template('_config.build.yml', '_config.build.yml');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_README.md', 'README.md');
};

JekyllizeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc')
}

JekyllizeGenerator.prototype.jekyllInit = function jekyllInit() {
  // Create the default Jekyll site in a temp folder
  shelljs.exec('bundle exec jekyll new ' + this.jekyllTmp);
};

JekyllizeGenerator.prototype.templates = function templates() {
  this.template('conditional/template/default.html', 'app/_layouts/default.html');
  this.template('conditional/template/index.md', 'app/index.md');

  if (this.googleAnalytics) {
    this.copy('conditional/template/google-analytics.html', 'app/_includes/google-analytics.html');
  };
};

/*JekyllizeGenerator.prototype.pygments = function pygments() {
  // Pygments styles
  if (this.jekyllPygments) {
    this.copy(path.join(this.jekyllTmp, 'css/syntax.css'), path.join('app', this.cssDirectory, 'syntax.css'));
  }
};*/

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
  if (this.jsPre === 'coffeescript') {
    this.mkdir('app/assets/_coffee');
    this.copy('conditional/coffee/README.md', 'app/assets/_coffee/README.md');
    this.copy('conditional/coffee/app.coffee', 'app/assets/_coffee/app.coffee');
  }
};
