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

  console.log('\n' + 
              chalk.blue('     ____        ___                 ___ ___')  + chalk.yellow('                            ___\n') + 
              chalk.blue('     `MM         `MM                 `MM `MM')  + chalk.yellow(' 68b                        `MM\n') +
              chalk.blue('      MM          MM                  MM  MM')  + chalk.yellow(' Y89                         MM\n') +
              chalk.blue('      MM   ____   MM   __ ____    ___ MM  MM')  + chalk.yellow(' ___ _________  ____     ____MM\n') +
              chalk.blue('      MM  6MMMMb  MM   d` `MM(    )M` MM  MM')  + chalk.yellow(' `MM MMMMMMMMP 6MMMMb   6MMMMMM\n') +
              chalk.blue('      MM 6M`  `Mb MM  d`   `Mb    d`  MM  MM')  + chalk.yellow('  MM /    dMP 6M`  `Mb 6M`  `MM\n') +
              chalk.blue('      MM MM    MM MM d`     YM.  ,P   MM  MM')  + chalk.yellow('  MM     dMP  MM    MM MM    MM\n') +
              chalk.blue('      MM MMMMMMMM MMdM.      MM  M    MM  MM')  + chalk.yellow('  MM    dMP   MMMMMMMM MM    MM\n') +
              chalk.blue('(8)   MM MM       MMPYM.     `Mbd`    MM  MM')  + chalk.yellow('  MM   dMP    MM       MM    MM\n') +
              chalk.blue('((   ,M9 YM    d9 MM  YM.     YMP     MM  MM')  + chalk.yellow('  MM  dMP    /YM    d9 YM.  ,MM\n') +
              chalk.blue(' YMMMM9   YMMMM9 _MM_  YM._    M     _MM__MM')  + chalk.yellow('__MM_dMMMMMMMM YMMMM9   YMMMMMM_\n') +
              chalk.blue('                              d`            ')  + chalk.yellow('\n') +
              chalk.blue('                          (8),P             ')  + chalk.yellow('\n') +
              chalk.blue('                           YMM              ')  + chalk.yellow('\n')
    );

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
  // console.log(this.yeoman);
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

// The directories will default to /assets/ for better structure in the app
/*JekyllizeGenerator.prototype.askForStructure = function askForStructure() {
  var cb = this.async();
  var slashFilter = function (input) {
    return input.replace(/^\/*|\/*$/g, '');
  };
  var prompts = [
    {
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
  ];

  console.log(chalk.yellow('\nSet up some directories.') + ' ☛' +
    '\nSee note about nested directories in the README.');

  this.prompt(prompts, function (props) {

    this.cssDirectory                     = props.cssDirectory;
    this.javascriptDirectory              = props.javascriptDirectory;
    this.imageDirectory                   = props.imageDirectory;
    this.fontsDirectory                   = props.fontsDirectory;

    // Split asset directories on slashes
    this.cssExDirectory           = props.cssDirectory.split('/').pop();
    this.javascriptsExDirectory   = props.javascriptDirectory.split('/').pop();
    this.imagesExDirectory        = props.imageDirectory.split('/').pop();
    this.fontsExDirectory         = props.fontsDirectory.split('/').pop();

    cb();
  }.bind(this));
};*/

/*JekyllizeGenerator.prototype.askForDeployment = function askForDeployment() {
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
};*/

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

    this.jekyllPermalinks     = props.jekyllPermalinks;
    this.jekyllPageinate      = /^all$/i.test(props.jekyllPageinate) ? false : props.jekyllPageinate;

    cb();
  }.bind(this));
};

// Generate and copy over the necessary files to the application
JekyllizeGenerator.prototype.scaffold = function scaffold() {
  this.directory('app', 'app');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');  
  this.copy('Gemfile', 'Gemfile');
  this.copy('jshintrc', '.jshintrc');
  this.copy('csslintrc', '.csslintrc');
  this.copy('editorconfig', '.editorconfig');
  this.template('_config.yml', '_config.yml');
  this.template('_config.build.yml', '_config.build.yml');
  this.template('_README.md', 'README.md');
};

// Make sure the Ruby dependencies are installed and works
JekyllizeGenerator.prototype.rubyDependencies = function rubyDependencies() {
  console.log(chalk.yellow('\nRunning ', chalk.blue('bundle install'), chalk.yellow(' to install the required gems.')));
  this.conflicter.resolve(function (err) {
    if (err) {
      return this.emit('error', err);
    }
    shelljs.exec('bundle install');
  });
};

JekyllizeGenerator.prototype.jekyllInit = function jekyllInit() {
  // Create the default Jekyll site in a temp folder
  shelljs.exec('bundle exec jekyll new');
};

JekyllizeGenerator.prototype.templates = function templates() {
  if (this.googleAnalytics) {
    this.copy('conditional/template/_includes/_googleanalytics.html', 'app/_includes/_googleanalytics.html');
  };
};

/*JekyllizeGenerator.prototype.coffeescript = function coffeescript() {
  this.mkdir('app/assets/_coffee');
  this.copy('conditional/coffee/README.md', 'app/assets/_coffee/README.md');
  this.copy('conditional/coffee/app.coffee', 'app/assets/_coffee/app.coffee');
};*/