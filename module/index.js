'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.module = function module() {
  this.copy('module.js', 'js/modules/' + this.name + '.js');
};

ModuleGenerator.prototype.test = function test() {
  this.copy('example.spec.js', 'test/specs/' + this.name + '.spec.js');
};
