/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('assert');

var expected = [

  // Project files
  '.jshintrc',
  '.editorconfig',
  '.htaccess',

  // Bower
  '.bowerrc',
  'bower.json',

  // Pkg
  'package.json',

  // Git
  '.gitattributes',
  '.gitignore',

  // Travis
  '.travis.yml',

  // Robots
  'robots.txt',

  // HTML
  'templates/header.html',
  'templates/index.html',
  'templates/footer.html',
  'pages.json',

  // Karma
  'karma.conf.js',

  // Humans
  'humans.txt',

  // Grunt
  'Gruntfile.js',
  'tasks/config.js',
  'tasks/options/clean.js',
  'tasks/options/concat.js',
  'tasks/options/connect.js',
  'tasks/options/copy.js',
  'tasks/options/imagemin.js',
  'tasks/options/jshint.js',
  'tasks/options/karma.js',
  'tasks/options/modernizr.js',
  'tasks/options/replace.js',
  'tasks/options/requirejs.js',
  'tasks/options/sass.js',
  'tasks/options/watch.js',

  // Javascript
  'js/modules/module.js',
  'js/plugins/console.js',
  'js/config.js',
  'js/main.js',

  // Authors
  'AUTHORS',

  // Ico
  'apple-touch-icon-precomposed.png',
  'favicon.ico',

  // Contribuiting
  'CONTRIBUTING.md',

  // Cossdomain
  'crossdomain.xml',

  // 404
  '404.html',

  // Test
  'test/specs/example.spec.js',
  'test/spec.js',
  'test/test-main.js'

];

describe('init generator', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('init:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    var app = require('../app');
    assert(app !== undefined);
  });

  it('creates expected files for SCSS preprocessor', function (done) {

    helpers.mockPrompt(this.app, {
      'cssPreprocessor': 'Compass'
    });

    var expectedSCSS = [
      'scss/main.scss',
      'scss/elements/_typography.scss',
      'scss/helpers/_helpers.scss',
      'scss/helpers/_variables.scss',
      'scss/media/_print.scss',
      'scss/modules/_box.scss',
      'scss/page/_base.scss',
      'scss/page/_footer.scss',
      'scss/page/_header.scss',
      'scss/page/_main.scss'
    ];

    expectedSCSS.concat(expectedSCSS, expected);

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expectedSCSS);
      done();
    });

  });

  it('creates expected files for LESS preprocessor', function (done) {

    helpers.mockPrompt(this.app, {
      'cssPreprocessor': 'LESS'
    });

    var expectedLESS = [
      'less/main.less',
      'less/elements/_typography.less',
      'less/helpers/_helpers.less',
      'less/helpers/_variables.less',
      'less/media/_print.less',
      'less/modules/_box.less',
      'less/page/_base.less',
      'less/page/_footer.less',
      'less/page/_header.less',
      'less/page/_main.less'
    ];

    expectedLESS.concat(expectedLESS, expected);

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expectedLESS);
      done();
    });

  });

});

// ---- Module sub-generator

describe('module sub-generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('init:module', [
        '../../module'
      ], ['test']);
      done();
    }.bind(this));
  });

  it('creates expected files for the module sub-generator', function (done) {

    var expected = [
      'js/modules/test.js'
    ];

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

});

// ---- Jqueryplugin sub-generator

describe('jqueryplugin sub-generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('init:jqueryplugin', [
        '../../jqueryplugin'
      ], ['test']);
      done();
    }.bind(this));
  });

  it('creates expected files for the jqueryplugin sub-generator', function (done) {

    var expected = [
      'js/plugins/jquery.test.js'
    ];

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

});
