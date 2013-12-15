'use strict';

var InitGenerator;
var initHelpers = require('../lib/initgenerator.js');
var util        = require('util');
var path        = require('path');
var fs          = require('fs');
var yeoman      = require('yeoman-generator');

InitGenerator = module.exports = function InitGenerator(args, options, cnf) {
  var packageJsonPath;
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  packageJsonPath = path.join(__dirname, '../package.json');
  this.pkg = JSON.parse(this.readFileAsString(packageJsonPath));
};

util.inherits(InitGenerator, yeoman.generators.Base);

InitGenerator.prototype.askFor = function askFor() {
  var prompts;
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  prompts = [{
    name: 'projectName',
    message: 'What is the name of your project?',
    default: 'My INIT project'
  },
  {
    name: 'name',
    message: 'What is your name?',
    default: 'John Doe'
  },
  {
    name: 'email',
    message: 'What is your email address? (otpional)'
  },
  {
    name: 'url',
    message: 'What is the url of your homepage? (otpional)'
  },
  {
    name: 'role',
    message: 'What is your role in this project? (optional)'
  },
  {
    name: 'twitter',
    message: 'What is your Twitter username? (optional)'
  },
  {
    name: 'githubUsername',
    message: 'What is your Github username? (optional)'
  },
  {
    type: 'list',
    name: 'cssPreprocessor',
    message: 'Which CSS preprocessor would you like to use?',
    choices: ['SCSS', 'Compass', 'Less'],
    default: 0
  }];

  this.prompt(prompts, function (props) {
    this.projectName     = props.projectName;
    this.name            = props.name;
    this.email           = props.email;
    this.url             = props.url;
    this.role            = props.role;
    this.twitter         = props.twitter;
    this.githubUsername  = props.githubUsername;
    this.cssPreprocessor = props.cssPreprocessor;

    cb();
  }.bind(this));
};

InitGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('htaccess', '.htaccess');
};

InitGenerator.prototype.img = function img() {
  this.mkdir('img');
};

InitGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

InitGenerator.prototype.pkg = function pkg() {
  this.template('_package.json', 'package.json');
};

InitGenerator.prototype.git = function git() {
  this.copy('gitattributes', '.gitattributes');
  this.copy('gitignore', '.gitignore');
};

InitGenerator.prototype.travis = function travis() {
  this.copy('travis.yml', '.travis.yml');
};

InitGenerator.prototype.robots = function robots() {
  this.copy('robots.txt', 'robots.txt');
};

InitGenerator.prototype.html = function html() {
  this.mkdir('templates');

  this.template('templates/_header.html', 'templates/header.html');
  this.copy('templates/index.html', 'templates/index.html');
  this.copy('templates/footer.html', 'templates/footer.html');

  this.copy('pages.json', 'pages.json');
};

InitGenerator.prototype.karma = function karma() {
  this.copy('karma.conf.js', 'karma.conf.js');
};

InitGenerator.prototype.humans = function humans() {
  this.template('_humans.txt', 'humans.txt');
};

InitGenerator.prototype.grunt = function grunt() {
  var optionsDir = 'tasks/options';

  this.mkdir(optionsDir);

  initHelpers.copyAllFiles.call(this, optionsDir);

  this.copy('tasks/config.js', 'tasks/config.js');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

InitGenerator.prototype.css = function css() {
  var cssDir;

  if (this.cssPreprocessor === 'SCSS' ||
      this.cssPreprocessor === 'Compass') {
    cssDir = 'scss';
    this.copy('scss/main.scss', cssDir + '/main.scss');
  } else {
    cssDir = 'less';
    this.copy('scss/main.scss', cssDir + '/main.' + cssDir);
  }

  this.mkdir(cssDir);
  initHelpers.copyCssFiles.call(this, cssDir);
};

InitGenerator.prototype.js = function js() {
  this.copy('js/modules/module.js', 'js/modules/module.js');
  this.copy('js/plugins/console.js', 'js/plugins/console.js');
  this.copy('js/config.js', 'js/config.js');
  this.copy('js/main.js', 'js/main.js');
};

InitGenerator.prototype.authors = function authors() {
  this.template('AUTHORS', 'AUTHORS');
};

InitGenerator.prototype.ico = function ico() {
  this.copy('apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');
  this.copy('favicon.ico', 'favicon.ico');
};

InitGenerator.prototype.contributing = function contributing() {
  this.template('CONTRIBUTING.md', 'CONTRIBUTING.md');
};

InitGenerator.prototype.crossdomain = function crossdomain() {
  this.copy('crossdomain.xml', 'crossdomain.xml');
};

InitGenerator.prototype.fourohfour = function fourohfour() {
  this.copy('404.html', '404.html');
};

InitGenerator.prototype.test = function test() {
  this.copy('test/specs/example.spec.js', 'test/specs/example.spec.js');
  this.copy('test/spec.js', 'test/spec.js');
  this.copy('test/test-main.js', 'test/test-main.js');
};
