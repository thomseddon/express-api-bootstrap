
var path = require('path');
var fs = require('fs');

/**
 * Test
 */

exports.tests = {};

var testBrief = function (test) {
  return {
    id: test._id.toString(),
    name: test.name
  };
};

var testFull = testBrief;

fs.readdirSync(__dirname + '/tests').forEach(function (file) {
  var name = path.basename(file, '.js');
  var fixture = require('./tests/' + file);

  exports.tests[name] = {
    raw: fixture,
    brief: testBrief(fixture),
    full: testFull(fixture)
  };
});
