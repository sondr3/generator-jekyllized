'use strict'
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var globule = require('globule');
var shelljs = require('shelljs');

var JekyllizedGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
            return shelljs.which(depend);
        });

        if (!dependenciesInstalled) {
            this.log('MISSING DEPENDENCIES:' +
                '\nEither ' + chalk.white('Ruby') + ' or ' + chalk.white('Bundler') + ' is not installed or missing from $PATH.' +
                '\nMake sure that they are either installed or added to $PATH.');
            shelljs.exit(1);
        };

        this.testFramework = this.options['test-framework'] || 'mocha';
        this.options['test-framework'] = this.testFramework;

        this.hookFor(this.testFramework, {
            as: 'app',
            options: {
                'skip-install': this.options['skip-install']
            }
        });

        this.gitInfo = {
            ownerName: this.user.git.username,
            ownerEmail: this.user.git.email
        };

        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    },

    projectPrompting: function () {
        var cb = this.async();

        this.log(this.yeoman);
        this.log('\n' + 
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

        this.log(chalk.magenta('\nIt\'s time to get Jekyllized!'));
        this.log(chalk.yellow('\nTell me a little about your project »'));

        var prompts = [{
            name: 'projectName',
            message: 'What is the name of your project?'
        }, {
            name: 'projectDescription',
            message: 'Describe your project for me:'
        }, {
            name: 'projectTagline',
            message: 'What is the tagline for your project?'
        }, {
            name: 'projectUrl',
            message: 'What will the URL for your project be?'
        }];

        this.prompt(prompts, function (props) {
            this.projectName        = props.projectName;
            this.projectDescription = props.projectDescription;
            this.projectTagline     = props.projectTagline;
            this.projectUrl         = props.projectUrl;

            cb();
        }.bind(this));
    },

    ownerPrompting: function () {
        var cb = this.async();

        this.log(chalk.yellow('\nNow it\'s time to tell me about you. »'));

        var prompts = [{
            name: 'ownerName',
            message: 'What is your name?',
            default: this.gitInfo.ownerName
        }, {
            name: 'ownerEmail',
            message: 'What is your email?',
            default: this.gitInfo.ownerEmail
        }, {
            name: 'ownerBio',
            message: 'Write a short description of yourself:'
        }, {
            name: 'ownerTwitter',
            message: 'Your Twitter URL:'
        }];

        this.prompt(prompts, function (props) {
            this.ownerName      = props.ownerName;
            this.ownerEmail     = props.ownerEmail;
            this.ownerBio       = props.ownerBio;
            this.ownerTwitter   = props.ownerTwitter;

            cb();
        }.bind(this));
    },

    jekyllPrompting: function () {
        var cb = this.async();

        this.log(chalk.yellow('Now on to set some Jekyll settings: »') +
                '\nYou can change all of this later in the _config.yml file');

        var prompts = [{
            name: 'jekyllPermalinks',
            type: 'list',
            message: 'Permalink style' +
                (chalk.red(
                           '\n  pretty: /:categories:/:year/:month/:day/:title/' +
                           '\n  date:   /:categories/:year/:month/:day/:title.html' +
                           '\n  none:   /:categories/:title.html')),
            choices: ['pretty', 'date', 'none']
        }, {
            name: 'jekyllPaginate',
            message: 'How many posts do you want to show on your front page?',
            default: 10,
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

        this.prompt(prompts, function (props) {
            this.jekyllPermalinks   = props.jekyllPermalinks;
            this.jekyllPaginate     = /^all$/i.test(props.jekyllPaginate) ? false: props.jekyllPaginate;

            cb();
        }.bind(this));
    },

    assetPrompting: function () {
        var cb = this.async();

        var slashFilter = function (input) {
            return input.replace(/^\/*|\/*$/g, '');
        };

        this.log(chalk.yellow('\nNow it\'s time to configure your asset structure. »'));

        var prompts = [{
            name: 'cssDirectory',
            message: 'Where do you want your CSS to live?',
            default: '/assets/stylesheets',
            filter: slashFilter
        }, {
            name: 'scssDirectory',
            message: 'Where do you want your SCSS to live?',
            default: 'assets/scss',
            filter: slashFilter
        }, {
            name: 'javascriptDirectory',
            message: 'Where do you want your JavaScript to live?',
            default: 'assets/javascript',
            filter: slashFilter
        }, {
            name: 'imagesDirectory',
            message: 'Where do you want your images to live?',
            default: 'assets/images',
            filter: slashFilter
        }, {
            name: 'fontsDirectory',
            message: 'Where do you want your fonts to live?',
            default: 'assets/fonts',
            filter: slashFilter
        }];

        this.prompt(prompts, function (props) {
            this.cssDirectory           = props.cssDirectory;
            this.scssDirectory          = props.scssDirectory;
            this.javascriptDirectory    = props.javascriptDirectory;
            this.imagesDirectory        = props.imagesDirectory;
            this.fontsDirectory         = props.fontsDirectory;

            cb();
        }.bind(this));
    },

    writing: {

        gulpfile: function () {
            this.template('_gulpfile.js', 'gulpfile.js');
        },

        packageJSON: function () {
            this.template('_package.json', 'package.json');
        },

        config: function () {
            this.template('_config.yml', '_config.yml');
            this.template('_config.build.yml', '_config.build.yml');
        },

        readme: function () {
            this.template('_README.md', 'README.md');
        },

        git: function () {
            this.copy('gitignore', '.gitignore');
            this.copy('gitattributes', 'gitattributes');
        },

        gemfile: function () {
            this.copy('Gemfile', 'Gemfile');
        },

        bower: function () {
            this.copy('bowerrc', '.bowerrc');
            this.copy('_bower.json', 'bower.json');
        },

        jshint: function () {
            this.copy('jshintrc', '.jshintrc');
        },

        editorconfig: function () {
            this.copy('editorconfig', '.editorconfig');
        }
    },

    rubyDependencies: function () {
        this.log(chalk.yellow('\nRunning '), chalk.blue('bundle install'), chalk.yellow(' to install the required gems'));
        this.conflicter.resolve(function (error) {
            if (error) {
                return this.emit('error', error);
            }
            shelljs.exec('bundle install');
        });
    },

    install: function () {
        if (['jekyllized:app', 'jekyllized'].indexOf(this.options.namespace) >= 0) {
            this.installDependencies({ skipInstall: this.options['skip-install'] });
        }
    }
});

module.exports = JekyllizedGenerator;
