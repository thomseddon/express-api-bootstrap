
/**
 * Module dependencies
 */

var database = require('congo');
var async = require('async');

/**
 * Format
 */

var format = function (test, full) {

  return {
    id: test._id.toString(),
    name: test.name
  };
};

/**
 * Get
 */

exports.get = function (config, done) {

  if (!config || !(config._id || config.slug))
    return done(400);

  if (config._id)
    config._id = new database.ObjectID(config._id);

  database.get(function (err, db) {
    if (err) return done(err);

    db.tests
      .findOne(config, function (err, test) {
        db.close();
        done(err, format(test));
      });
  });
};


/**
 * List
 */

exports.list = function (config, done) {

  var query = {
    deleted: false
  };

  config = config || {};

  if (config.type) query.type = config.type;

  database.get(function (err, db) {
    if (err) return done(err);

    db.tests
      .find(query)
      .limit(config.limit || 0)
      .skip(config.offset || 0)
      .toArray(function (err, tests) {
        db.close();
        if (err) return done(err);

        done(null, tests.map(format));
      });
  });
};

