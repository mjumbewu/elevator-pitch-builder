module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dirs: {
      src: 'src',
      build: 'build',
      tmpstyles: 'src/styles'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= dirs.src %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      handlebars: {
        files: ['<%= dirs.src %>/templates/{,*/}*.{html,txt,mustache,handlebars}'],
        tasks: ['handlebars']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= dirs.src %>/{,*/}*.html',
          '<%= dirs.tmpstyles %>/{,*/}*.{css,scss}',
          '<%= dirs.src %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= dirs.src %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= dirs.src %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= dirs.build %>',
          livereload: false
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    },

    handlebars: {
      options: {
        namespace: 'Handlebars.Templates',
        partialsUseNamespace: true,
        processName: function(filePath) {
          return filePath.replace(/src\/templates\/(.*)\.(handlebars|html|txt)/, '$1');
        }
      },
      all: {
        files: {
          '<%= dirs.src %>/js/templates.js': ['<%= dirs.src %>/templates/**/*.{handlebars,html,txt}']
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= dirs.build %>/*']
        }]
      },
      server: '.tmp'
    },

    useminPrepare: {
      options: {
        dest: '<%= dirs.build %>'
      },
      html: '<%= dirs.src %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= dirs.build %>']
      },
      html: ['<%= dirs.build %>/{,*/}*.html'],
      css: ['<%= dirs.build %>/css/{,*/}*.css']
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= dirs.src %>/styles',
        cssDir: '<%= dirs.tmpstyles %>',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= dirs.src %>/images',
        javascriptsDir: '<%= dirs.src %>/scripts',
        fontsDir: '<%= dirs.src %>/styles/fonts',
        importPath: '<%= dirs.src %>/bower_components',
        httpImagesPath: '<%= dirs.src %>/images',
        httpGeneratedImagesPath: '<%= dirs.src %>/images/generated',
        httpFontsPath: '<%= dirs.src %>/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= dirs.build %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.src %>',
          dest: '<%= dirs.build %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}',
            '{,*/}*.html',
            'styles/{,*/}*.css',
            'styles/fonts/{,*/}*.*',
            'bower_components/sass-bootstrap/fonts/*.*'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'handlebars',
        'compass:server'
      ],
      dist: [
        'handlebars',
        'compass',
        'imagemin',
        'svgmin'
      ]
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-usemin');

  // Default task(s).
  grunt.registerTask('default', ['build']);

  grunt.registerTask('build', [
    'handlebars',
    'useminPrepare',
    'concat',
//    'cssmin',
    'uglify',
    'copy:dist',
//    'filerev',
    'usemin'
  ]);

  grunt.registerTask('serve', [
    'clean:server',
    'handlebars',
    'concurrent:server',
    // 'autoprefixer',
    'connect:livereload',
    'watch'
  ]);
};
