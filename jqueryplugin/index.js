'use strict';
var util   = require('util');
var yeoman = require('yeoman-generator');

var JquerypluginGenerator = module.exports = function JquerypluginGenerator() {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(JquerypluginGenerator, yeoman.generators.NamedBase);

JquerypluginGenerator.prototype.boilerplate = function boilerplate() {
  this.template('jquery.plugin.js', 'js/plugins/jquery.' + this.name + '.js');
};
