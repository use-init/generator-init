'use strict';
var util   = require('util');
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
