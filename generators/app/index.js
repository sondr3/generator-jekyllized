'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('travis', {
      type: Boolean,
      required: false,
      defaults: true,
      description: 'Include travis config'
    });
  },

  initializing: function () {
    if (this.option.travis) {
      this.composeWith('jekyllized:travis', {}, {
        local: require.resolve('../travis')
      });
    }
  }
});
