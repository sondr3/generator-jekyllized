'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  initializing: function() {
    this.composeWith('jekyllized:editorconfig', {}, {
      local: require.resolve('../editorconfig')
    });

    this.composeWith('jekyllized:jshint', {}, {
      local: require.resolve('../jshint')
    });

    this.composeWith('jekyllized:jscs', {}, {
      local: require.resolve('../jscs')
    });

    this.composeWith('jekyllized:git', {}, {
      local: require.resolve('../git')
    });

    this.composeWith('jekyllized:package', {}, {
      local: require.resolve('../package')
    });
  }
});
