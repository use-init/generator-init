'use strict';

var InitGeneratorUtils;
var path = require('path');
var fs   = require('fs');

function InitGeneratorUtils() {}

InitGeneratorUtils.prototype = {
  copyAllFiles: function copyAllFiles(dir) {
    var cb        = this.async();
    var pathToDir = path.join(__dirname, '../app/templates', dir);

    fs.readdir(pathToDir, function copyTasksConf(err, files) {
      if (!err) {
        files.forEach(function copyFile(file) {
          var fileToCopy = path.join(dir, file);
          this.copy(fileToCopy, fileToCopy);
        }.bind(this));
      } else {
        console.log(err);
      }
      cb();
    }.bind(this));
  },

  copyCssFiles: function copyCssFiles(cssDir) {
    var partials;
    var cssSrcPath = path.join(__dirname, '../app/templates/scss');
    var subDirs = fs.readdirSync(cssSrcPath);

    subDirs.forEach(function eachSubDir(subDir) {
      if (subDir !== 'main.scss') {
        partials = fs.readdirSync(path.join(cssSrcPath, subDir));

        partials.forEach(function eachPartial(partial) {
          var from, to;

          from = path.join('scss/', subDir, partial);
          if (cssDir !== 'scss') {
            partial = partial.replace('scss', cssDir);
          }
          to   = path.join(cssDir, subDir, partial.replace('scss', cssDir));

          this.copy(from, to);
        }.bind(this));
      }
    }.bind(this));
  }
};

module.exports = new InitGeneratorUtils();
