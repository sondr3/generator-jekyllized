'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var globule = require('globule');
var shelljs = require('shelljs');


var JekyllizeGenerator = module.exports = function PlaybookGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
    return shelljs.which(depend);
  });

  // Exit if Ruby dependencies aren't installed
  if (!dependenciesInstalled) {
    console.log('Looks like you\'re missing some dependencies.' +
      '\nMake sure ' + chalk.white('Ruby') + ' and the ' + chalk.white('Bundler gem') + ' are installed, then run again.');
    shelljs.exit(1);
  }

  this.gitInfo = {
    name: this.user.git.username,
    email: this.user.git.email
  }

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JekyllizeGenerator, yeoman.generators.Base);

// Promts
JekyllizeGenerator.prototype.askForUser = function askForUser() {
  var cb = this.async();
  var prompts = [
      {
      name: 'projectname',
      message: 'What is the name of the project?'
    }
    {
      name: 'description',
      message: 'Description of your project'
    }
    {
      name: 'tagline',
      message: 'What is the tagline of your project?'
    }
    {
      name: 'author',
      message: 'What is your name?',
      default: this.gitInfo.name
    },
    {
      name: 'email',
      message: 'What is your email?',
      default: this.gitInfo.email
    },
  ];

  console.log(this.yeoman);
  console.log(chalk.yellow('\nTell us a little about the project.') + ' →');

  this.prompt(prompts, function (props) {

    this.authorName  = props.authorName;
    this.authorEmail = props.authorEmail;
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

JekyllizeGenerator.prototype.askForTools = function askForTools() {
  var cb = this.async();
  var prompts = [{
    name: 'cssPre',
    type: 'list',
    message: 'CSS preprocessor',
    choices: ['Compass', 'Sass', 'None']
  },
  {
    name: 'autoPre',
    type: 'confirm',
    message: 'Use Autoprefixer?'
  },
  {
    name: 'jsPre',
    type: 'list',
    message: 'Javascript preprocessor',
    choices: ['None', 'Coffeescript'],
  }];

  console.log(chalk.yellow('\nWire tools and preprocessors.') + ' ☛');

  this.prompt(prompts, function (props) {

    // Multiple choice 'None' to false
    this.cssPre  = props.cssPre === 'None' ? false : props.cssPre.toLowerCase();
    this.jsPre   = props.jsPre === 'None' ? false : props.jsPre.toLowerCase();
    this.autoPre = props.autoPre;

    cb();
  }.bind(this));
};

JekyllizeGenerator.prototype.askForStructure = function askForStructure() {
  var cb = this.async();
  var cssPre = this.cssPre;
  var jsPre  = this.jsPre;
  var slashFilter = function (input) {
    return input.replace(/^\/*|\/*$/g, '');
  };
  var prompts = [{
    name: 'cssDir',
    message: 'CSS directory',
    default: 'css',
    filter: slashFilter
  },
  {
    name: 'jsDir',
    message: 'Javascript directory',
    default: 'js',
    filter: slashFilter
  },
  {
    name: 'imgDir',
    message: 'Image directory',
    default: 'img',
    filter: slashFilter
  },
  {
    name: 'fontsDir',
    message: 'Webfont directory',
    default: 'fonts',
    filter: slashFilter
  },
  {
    name: 'cssPreDir',
    message: 'CSS preprocessor directory',
    default: '_scss',
    filter: slashFilter,
    when: function () {
      return cssPre;
    }
  },
  {
    name: 'jsPreDir',
    message: 'Javascript preprocessor directory',
    default: '_src',
    filter: slashFilter,
    when: function () {
      return jsPre;
    }
  }];

  console.log(chalk.yellow('\nSet up some directories.') + ' ☛' +
    '\nSee note about nested directories in the README.');

  this.prompt(prompts, function (props) {

    this.cssDir    = props.cssDir;
    this.jsDir     = props.jsDir;
    this.imgDir    = props.imgDir;
    this.fontsDir  = props.fontsDir;
    this.cssPreDir = props.cssPreDir;
    this.jsPreDir  = props.jsPreDir;

    // Split asset directories on slashes
    this.cssExDir   = props.cssDir.split('/').pop();
    this.jsExDir    = props.jsDir.split('/').pop();
    this.imgExDir   = props.imgDir.split('/').pop();
    this.fontsExDir = props.fontsDir.split('/').pop();

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
    name: 'jekDescript',
    message: 'Site description'
  },
  {
    name: 'jekPost',
    type: 'list',
    message: 'Post permalink style',
    choices: ['date', 'pretty', 'none']
  },
  {
    name: 'jekMkd',
    type: 'list',
    message: 'Markdown library',
    choices: ['redcarpet', 'maruku', 'rdiscount', 'kramdown']
  },
  {
    name: 'jekPyg',
    type: 'confirm',
    message: 'Use the Pygments code highlighting library?'
  },
  {
    name: 'jekPage',
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

    this.jekPyg      = props.jekPyg;
    this.jekMkd      = props.jekMkd;
    this.jekPost     = props.jekPost;
    this.jekDescript = props.jekDescript;
    this.jekPage     = /^all$/i.test(props.jekPage) ? false : props.jekPage;

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
  this.mkdir(path.join('app', this.cssDir));
  this.mkdir(path.join('app', this.jsDir));
  this.mkdir(path.join('app', this.imgDir));
  this.mkdir(path.join('app', this.fontsDir));

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
    this.copy(path.join(this.jekyllTmp, 'css/main.css'), path.join('app', this.cssDir, 'main.css'));

    // Jekyll files tailored for Yeoman
    this.template('conditional/template-default/_layouts/default.html', 'app/_layouts/default.html');

    // Empty file for Usemin defaults
    this.write(path.join('app', this.jsDir, 'main.js'), '');
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
        remote.copy('css/main.css', path.join('app', this.cssDir, 'main.css'));
      }
      else {
        // Empty file
        this.write(path.join('app', this.cssDir, 'main.css'), '');
      }

      // Js boilerplate
      if (this.h5bpJs) {
        remote.copy('js/main.js', path.join('app', this.jsDir, 'main.js'));
        remote.copy('js/plugins.js', path.join('app', this.jsDir, 'plugins.js'));
      }
      else {
        // Empty file
        this.write(path.join('app', this.jsDir, 'main.js'), '');
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
  if (this.jekPyg) {
    this.copy(path.join(this.jekyllTmp, 'css/syntax.css'), path.join('app', this.cssDir, 'syntax.css'));
  }
};

JekyllizeGenerator.prototype.cssPreprocessor = function cssPreprocessor() {
  var files = globule.find('**/*.css', {srcBase: path.join('app', this.cssDir)});
  var cssDir = this.cssDir;

  if (this.cssPre) {
    this.mkdir(path.join('app', this.cssPreDir));
    this.template('conditional/css-pre/readme.md', path.join('app', this.cssPreDir, 'readme.md'));

    // Copy CSS files to preprocessor files
    files.forEach(function (file) {
      this.copy(path.join(process.cwd(), 'app', cssDir, file),
                path.join('app', this.cssPreDir, file.replace(/\.css$/, '.scss')));

      // Wait until copy is completely finished and then delete files.
      this.conflicter.resolve(function (err) {
        if (err) {
          return this.emit('error', err);
        }
        spawn('rm', [path.join('app', cssDir, file)], { stdio: 'inherit' });
      });
    }, this);
  }
};

JekyllizeGenerator.prototype.jsPreprocessor = function jsPreprocessor() {
  if (this.jsPre) {
    this.mkdir(path.join('app', this.jsPreDir));
  }

  if (this.jsPre === 'coffeescript') {
    this.template('conditional/coffee/readme.md', path.join('app', this.jsPreDir, 'readme.md'));
  }
};
