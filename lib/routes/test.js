
/**
 * Module dependencies
 */

var async = require('async');
var error = require('../error');
var models = require('../models');

/**
 * Get
 */

exports.get = function (req, res, next) {

  var id = req.params.id;
  if (!id || !id.match(/[a-z0-9]{24}/i)) {
    return next(error(400, 'Invalid test ID'));
  }

  models.test.get({
    _id: id,
  }, function (err, test) {
    if (err) return next(err);
    if (!test) return next(404);

    res.jsonp({
      code: 200,
      meta: {},
      data: test
    });
  });
};

/**
 * List
 */

exports.list = function (req, res, next) {

  var query = {};

  if (req.query.filter) {
    var filters = req.query.filter.split(',');
    filters.forEach(function (filter) {
      var parts = filter.replace(/(^\s+|\s+$)/g, '').split(':');
      if (parts.length > 1)
        query[parts[0]] = parts[1];
    });
  }

  if (req.query.limit) {
    var limit = parseInt(req.query.limit, 10);
    if (limit >= 0)
      query.limit = limit;
  }

  if (req.query.offset) {
    var offset = parseInt(req.query.offset, 10);
    if (offset >= 0)
      query.offset = offset;
  }

  models.test.list(query, function (err, tests) {
    if (err) return next(err);

    res.jsonp({
      code: 200,
      meta: {
        total: tests.length
      },
      data: tests
    });
  });
};
