/*
 * generator-init
 * https://github.com/use-init/generator-init
 *
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'app/index.js',
        '<%= mochaTest.test.src%>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tests/temp']
    },

    // Unit tests.
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Whenever the "test" task is run, first clean the "temp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['clean', 'jshint', 'mochaTest']);

};
