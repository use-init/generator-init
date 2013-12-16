'use strict';

var util        = require('util');
var fs          = require('fs');
var path        = require('path');
var initHelpers = require('../lib/initgenerator.js');
var yeoman      = require('yeoman-generator');

var PageGenerator = module.exports = function PageGenerator() {
  // By calling `NamedBase` here, we get the argument
  // to the subgenerator call as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.pagesJson = function pagesJson() {
  var pgs     = {};
  var pgsPath = path.join(process.cwd(), 'pages.json');

  if (fs.existsSync(pgsPath)) {
    pgs = JSON.parse(fs.readFileSync(pgsPath, 'utf-8'));
    initHelpers.writePagesJson.call(this, pgs);
  } else {
    initHelpers.writePagesJson.call(this, pgs);
  }
};

PageGenerator.prototype.htmlSnippet = function htmlSnippet() {
  this.copy('index.html', 'templates/' + this.name + '.html');
};
