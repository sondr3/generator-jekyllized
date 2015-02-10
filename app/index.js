"use strict";
var path = require("path");
var chalk = require("chalk");
var yeoman = require("yeoman-generator");
var yosay = require("yosay");
var shelljs = require("shelljs");

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option("skip-install", {
      desc: "Whether dependencies should be installed",
      defaults: false
    });

    this.option("skip-install-message", {
      desc: "Whether commands run should be shown",
      defaults: false
    });

    var dependenciesInstalled = ["bundle", "ruby"].every(function (depend) {
      return shelljs.which(depend);
    });

    if (!dependenciesInstalled) {
      this.log("MISSING DEPENDENCIES:" +
        "\nEither " + chalk.white("Ruby") + " or " + chalk.white("Bundler") + " is not installed or missing from $PATH." +
        "\nMake sure that they are either installed or added to $PATH.");
      shelljs.exit(1);
    }

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
  },

  projectPrompting: function () {
    var cb = this.async();

    this.log(yosay("Time to supercharge your Jekyll development, time to get Jekyllized!"));

    this.log(chalk.yellow("\nTell me a little about your project >>"));

    var prompts = [{
      name: "projectName",
      message: "What is the name of your project?"
    }, {
      name: "projectDescription",
      message: "Describe your project for me:"
    }, {
      name: "projectTagline",
      message: "What is the tagline for your project?"
    }, {
      name: "projectURL",
      message: chalk.red("If you are using GitHub Pages use username.github.io") + "\nWhat will the URL for your project be?"
    }];

    this.prompt(prompts, function (props) {
      this.projectName        = props.projectName;
      this.projectDescription = props.projectDescription;
      this.projectTagline     = props.projectTagline;
      this.projectURL         = props.projectURL;

      cb();
    }.bind(this));
  },

  authorPrompting: function () {
    var cb = this.async();

    this.log(chalk.yellow("\nNow it\"s time to tell me about you. >>"));

    var prompts = [{
      name: "authorName",
      message: "What is your name?",
    }, {
      name: "authorEmail",
      message: "What is your email?",
    }, {
      name: "authorBio",
      message: "Write a short description of yourself:"
    }, {
      name: "authorTwitter",
      message: "Your Twitter URL:"
    }];

    this.prompt(prompts, function (props) {
      this.authorName      = props.authorName;
      this.authorEmail     = props.authorEmail;
      this.authorBio       = props.authorBio;
      this.authorTwitter   = props.authorTwitter;

      cb();
    }.bind(this));
  },

  jekyllPrompting: function () {
    var cb = this.async();

    this.log(chalk.yellow("\nNow on to set some Jekyll settings: >>") +
            chalk.red("\nYou can change all of this later in the _config.yml file"));

    var prompts = [{
      name: "jekyllPermalinks",
      type: "list",
      message: "Permalink style" + (chalk.red(
                     "\n  pretty: /:year/:month/:day/:title/" +
                     "\n  date:   /:year/:month/:day/:title.html" +
                     "\n  none:   /:categories/:title.html")) + "\n",
      choices: ["pretty", "date", "none"]
    }, {
      name: "jekyllPaginate",
      message: "How many posts do you want to show on your front page?" + chalk.red("\nMust be a number or all"),
      default: 10,
      validate: function (input) {
        if (/^[0-9]*$/.test(input)) {
          return true;
        }
        if (/^all*$/i.test(input)) {
          return true;
        }
        return "Must be a number or all";
      }
    }];

    this.prompt(prompts, function (props) {
      this.jekyllPermalinks   = props.jekyllPermalinks;
      this.jekyllPaginate     = props.jekyllPaginate;

      cb();
    }.bind(this));
  },

  uploadPrompting: function () {
    var cb = this.async();

    this.log(chalk.yellow("\nNow we only need some details about how to upload your site: >>") +
            chalk.red("\nNOTE: Take whatever time you need to get these right/fill them in later in eithers credentials file."));

    var prompts = [{
      name: "uploadChoices",
      type: "list",
      message: "How would you like to host/upload your site?",
      choices: [{
        name: "Amazon S3 + Cloudfront",
        value: "amazonCloudfrontS3",
      }, {
        name: "Rsync",
        value: "rsync",
      }, {
        name: "Github Pages",
        value: "githubPages",
      }, {
        name: "None",
        value: "noUpload"
      }]
    }, {
      name: "amazonKey",
      message: chalk.yellow("\n\nNow we just need to fill out the detailes needed to configure your site for Amazon S3 and Cloudfront: >>") +
        chalk.red("\nNOTE: Take your time and get the correct settings from Amazon, or alternatively") +
        chalk.red("\njust fill them in blankly and fill out the aws-credentials.json later.") +
        "\nWhat is your key to AWS?",
      when: function (answers) {
        return answers.uploadChoices === "amazonCloudfrontS3";
      }
    }, {
      name: "amazonSecret",
      message: "What is your AWS secret?",
      when: function (answers) {
        return answers.uploadChoices === "amazonCloudfrontS3";
      }
    }, {
      name: "amazonBucket",
      message: "What do you want your S3 bucket to be called?",
      when: function (answers) {
        return answers.uploadChoices === "amazonCloudfrontS3";
      }
    }, {
      name: "amazonDistID",
      message: "What is the Cloudfront distribution ID?",
      when: function (answers) {
        return answers.uploadChoices === "amazonCloudfrontS3";
      }
    }, {
      name: "rsyncUsername",
      message: chalk.yellow("\n\nNow we just need to fill out the detailes needed to upload your site via Rsync: >>") +
        chalk.red("\nNOTE: Take your time and get the correct settings for your server, or alternatively") +
        chalk.red("\njust fill them in blankly and fill out the rsync-credentials.json later.") +
        "\nWhat is the username of the user you will be uploading with?",
      when: function (answers) {
        return answers.uploadChoices === "rsync";
      }
    }, {
      name: "rsyncHostname",
      message: chalk.red("\n(eg. example.com or 192.168.1.1)") +
        "\nWhat is the hostname?",
      when: function (answers) {
        return answers.uploadChoices === "rsync";
      }
    }, {
      name: "rsyncDestination",
      message: chalk.red("\n(eg. /srv/www/site/public_html)") +
        "\nWhere do you want to save the files?",
      when: function (answers) {
        return answers.uploadChoices === "rsync";
      }
    }];

    this.prompt(prompts, function (props) {
      var features = props.uploadChoices;

      var hasFeature = function (feat) {
        return features.indexOf(feat) !== -1;
      };

      this.amazonCloudfrontS3 = hasFeature("amazonCloudfrontS3");
      this.rsync              = hasFeature("rsync");
      this.githubPages        = hasFeature("githubPages");
      this.noUpload           = hasFeature("noUpload");

      this.amazonKey      = props.amazonKey;
      this.amazonSecret   = props.amazonSecret;
      this.amazonBucket   = props.amazonBucket;
      this.amazonDistID   = props.amazonDistID;

      this.rsyncUsername      = props.rsyncUsername;
      this.rsyncHostname      = props.rsyncHostname;
      this.rsyncDestination   = props.rsyncDestination;

      cb();
    }.bind(this));
  },

  scaffolding: function () {
    this.copy("Gemfile", "Gemfile");
    this.copy("bowerrc", ".bowerrc");
    this.copy("_bower.json", "bower.json");
    this.template("_package.json", "package.json");
    this.template("_config.yml", "_config.yml");
    this.template("_config.build.yml", "_config.build.yml");
    this.template("_README.md", "README.md");
    this.template("gulpfile.js", "gulpfile.js");
    this.copy("gitignore", ".gitignore");
    this.copy("gitattributes", ".gitattributes");
    this.copy("jshintrc", ".jshintrc");
    this.copy("editorconfig", ".editorconfig");
    this.directory("app", "src");

    if (this.amazonCloudfrontS3) {
      this.template("conditionals/_aws-credentials.json", "aws-credentials.json");
    }
    else if (this.rsync) {
      this.template("conditionals/_rsync-credentials.json", "rsync-credentials.json");
    }
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options["skip-install"],
      skipMessage: this.options["skip-install-message"]
    });
  }
});
