'use strict';
var util   = require('util');
var path   = require('path');
var fs     = require('fs');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.getAuthor = function getAuthor(){
	this.author = this.readFileAsString('AUTHORS');
};

ModuleGenerator.prototype.date = function date(){
	var d = new Date();
	this.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

ModuleGenerator.prototype.module = function module() {
  this.copy('module.js', 'js/modules/' + this.name + '.js');
};

ModuleGenerator.prototype.test = function test() {
  this.template('example.spec.js', 'test/specs/' + this.name + '.spec.js');
};

ModuleGenerator.prototype.loadSpecs = function loadSpecs() {
  var specsToLoad, specFileContent, specTpl;
  var specs       = [];
  var specsPath   = path.join(process.cwd(), 'test/specs');

  if (fs.existsSync(specsPath)) {
    specs = fs.readdirSync(specsPath);
    specs = specs.map(function cutFileending(specFile) {
      return specFile.replace('.js', '');
    });
    specsToLoad     = '"' + specs.join('", "') + '"';
    specTpl         = path.join(this.sourceRoot(), 'spec.js');
    specFileContent = this.readFileAsString(specTpl);
    specFileContent = specFileContent.replace('<%= specs %>', specsToLoad);

    this.write(path.join(process.cwd(), 'test/spec.js'), specFileContent);
  }
};
