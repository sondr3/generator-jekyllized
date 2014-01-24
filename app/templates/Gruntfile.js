// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// Directory reference:
//   css: <%= cssDirectory %><% if (cssPreprocessor) { %>
//   <%= cssPreprocessor %>: <%= cssPreprocessorDirectory %><% } %>
//   javascript: <%= javascriptDirectory %><% if (javascriptPreprocessor) { %>
//   <%= javascriptPreprocessor %>: <%= javascriptPreprocessorDirectory %><% } %>
//   images: <%= imageDirectory %>
//   fonts: <%= fontsDirectory %>

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {<% if (cssPreprocessor === 'sass' || cssPreprocessor === 'compass' ) { %>
      <%= cssPreprocessor %>: {
        files: ['<%%= yeoman.app %>/<%= cssPreprocessorDirectory %>/**/*.{scss,sass}'],
        tasks: ['<%= cssPreprocessor %>:server'<% if (autoPre) { %>, 'autoPrefixer:server'<% } %>]
      },
      autoPrefixer: {
        files: ['<%%= yeoman.app %>/<%= cssDirectory %>/**/*.css'],
        tasks: ['copy:stageCss', 'autoPrefixer:server']
      },<% } %><% if (javascriptPreprocessor === 'coffeescript') { %>
      coffee: {
        files: ['<%%= yeoman.app %>/<%= javascriptPreprocessorDirectory %>/**/*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
      },<% } %>
      jekyll: {
        files: [
          '<%%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%%= yeoman.app %>/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',<% if (autoPre) { %>
          '.tmp/<%= cssDirectory %>/**/*.css',<% } else { %>
          '{.tmp,<%%= yeoman.app %>}/<%= cssDirectory %>/**/*.css',<% } %>
          '{.tmp,<%%= yeoman.app %>}/<%%= js %>/**/*.js',
          '<%%= yeoman.app %>/<%= imageDirectory %>/**/*.{gif,jpg,jpeg,png,svg,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%%= yeoman.dist %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '.tmp',
            '.jekyll',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= yeoman.dist %>/*',
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },<% if (cssPreprocessor === 'sass') { %>
    sass: {
      options: {
        bundleExec: true,
        debugInfo: false,
        lineNumbers: false,
        loadPath: 'app/_bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= cssPreprocessorDirectory %>',
          src: '**/*.{scss,sass}',
          dest: '.tmp/<%= cssDirectory %>',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true,
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= cssPreprocessorDirectory %>',
          src: '**/*.{scss,sass}',
          dest: '.tmp/<%= cssDirectory %>',
          ext: '.css'
        }]
      }
    },<% } %><% if (cssPreprocessor === 'compass') { %>
    compass: {
      options: {
        // If you're using global Sass gems, require them here.
        // require: ['singularity', 'jacket'],
        bundleExec: true,
        sassDir: '<%%= yeoman.app %>/<%= cssPreprocessorDirectory %>',
        cssDirectory: '.tmp/<%= cssDirectory %>',
        imagesDir: '<%%= yeoman.app %>/<%= imageDirectory %>',
        javascriptsDir: '<%%= yeoman.app %>/<%= javascriptDirectory %>',
        relativeAssets: false,
        httpImagesPath: '/<%= imageDirectory %>',
        httpGeneratedImagesPath: '/<%= imageDirectory %>/generated',
        outputStyle: 'expanded',
        raw: 'extensions_dir = "<%%= yeoman.app %>/_bower_components"\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%%= yeoman.dist %>/<%= imageDirectory %>/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          generatedImagesDir: '.tmp/<%= imageDirectory %>/generated'
        }
      }
    },<% } %><% if (autoPre) { %>
    autoPrefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>/<%= cssDirectory %>',
          src: '**/*.css',
          dest: '<%%= yeoman.dist %>/<%= cssDirectory %>'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/<%= cssDirectory %>',
          src: '**/*.css',
          dest: '.tmp/<%= cssDirectory %>'
        }]
      }
    },<% } %><% if (javascriptPreprocessor === 'coffeescript') { %>
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= javascriptPreprocessorDirectory %>',
          src: '**/*.coffee',
          dest: '.tmp/<%= javascriptDirectory %>',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },<% } %>
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%%= yeoman.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: '<%%= yeoman.dist %>',
      },
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/<%= cssDirectory %>/**/*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            '<%= imageDirectory %>/**/*',
            '<%= fontsDirectory %>/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/**}'<% if (h5bpJs) { %>,<% } %>
            // Explicitly add any files your site needs for distribution here.
            <% if (!h5bpJs) { %>//<% } %>'_bower_components/jquery/jquery.js',
            <% if (!h5bpJs) { %>//<% } %>'favicon.ico',
            <% if (!h5bpJs) { %>//<% } %>'apple-touch*.png'
          ],
          dest: '<%%= yeoman.dist %>'
        }]
      }<% if (autoPre) { %>,
      // Copy CSS into .tmp directory for autoPrefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/<%= cssDirectory %>',
          src: '**/*.css',
          dest: '.tmp/<%= cssDirectory %>'
        }]
      }<% } %>
    },
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%%= yeoman.dist %>/<%= javascriptDirectory %>/**/*.js',
            '<%%= yeoman.dist %>/<%= cssDirectory %>/**/*.css',
            '<%%= yeoman.dist %>/<%= imageDirectory %>/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%%= yeoman.dist %>/<%= fontsDirectory %>/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },<% if (deploy) { %>
    buildcontrol: {
      dist: {
        options: {
          remote: '<%= deployRemote %>',
          branch: '<%= deployBranch %>',
          commit: true,
          push: true
        }
      }
    },<% } %><% if (javascriptPreprocessor === 'coffeescript') { %>
    coffeelint: {
      options: {
        'max_line_length': {
          'level': 'ignore'
        }
      },
      check: ['<%%= yeoman.app %>/<%= javascriptPreprocessorDirectory %>/*.coffee']
    },<% } %>
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/<%= javascriptDirectory %>/**/*.js',
        'test/spec/**/*.js'
      ]
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%%= yeoman.app %>/<%= cssDirectory %>/**/*.css',
          '<%%= yeoman.app %>/<%= cssPreprocessorDirectory %>/**/*.scss'
        ]
      }
    },
    concurrent: {
      server: [<% if (cssPreprocessor === 'sass') { %>
        'sass:server',<% } %><% if (cssPreprocessor === 'compass') { %>
        'compass:server',<% } %><% if (javascriptPreprocessor === 'coffeescript') { %>
        'coffee:dist',<% } %><% if (autoPre) { %>
        'copy:stageCss',<% } %>
        'jekyll:server'
      ],
      dist: [<% if (cssPreprocessor === 'sass') { %>
        'sass:dist',<% } %><% if (cssPreprocessor === 'compass') { %>
        'compass:dist',<% } %><% if (javascriptPreprocessor === 'coffeescript') { %>
        'coffee:dist',<% } %>
        'copy:dist'
      ]
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',<% if (autoPre) { %>
      'autoPrefixer:server',<% } %>
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  // No real tests yet. Add your own.
  grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',<% if (cssPreprocessor === 'sass') { %>
    'sass:server',<% } %><% if (cssPreprocessor === 'compass') { %>
    'compass:server',<% } %><% if (javascriptPreprocessor === 'coffeescript') { %>
    'coffeelint:check',
    'coffee:dist',<% } %>
    'jshint:all',
    'csslint:check'
  ]);

  grunt.registerTask('build', [
    'clean',
    // Jekyll cleans files from the target directory, so must run first
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',<% if (autoPre) { %>
    'autoPrefixer:dist',<% } %>
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'filerev',
    'usemin',
    'htmlmin'
    ]);<% if (deploy) { %>

  grunt.registerTask('deploy', [
    'check',
    'test',
    'build',
    'buildcontrol'
    ]);<% } %>

  grunt.registerTask('default', [
    'check',
    'test',
    'build'
  ]);
};
