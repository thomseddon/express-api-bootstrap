
/**
 * Module dependencies
 */

var path = require('path');
var fs = require('fs');

/**
 * Expose
 */

module.exports = expose;

/**
 * Expose
 */

function expose (filename) {
  var root = {};
  var self = path.basename(filename);
  var dir = path.dirname(filename);

  fs.readdirSync(dir).forEach(function (file) {
    if (file === self) return;
    root[file.split('.')[0]] = require(path.join(dir, file));
  });

  return root;
}
