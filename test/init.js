
var fixtures = require('./fixtures');
var database = require('congo');
var should = require('should');
var async = require('async');

if (!process.env.MONGO_DB)
  process.env.MONGO_DB = 'test_test';

beforeEach(function (done) {

  var clean = function (done) {
    database.get(function (err, db) {
      if (err) return done(err);

      db.dropDatabase(function () {
        db.close();
        done();
      });
    });
  };

  var insert = function (done) {
    database.get(function (err, db) {
      if (err) return done(err);

      var inserts = [];
      for (var collection in fixtures) {
        for (var fixture in fixtures[collection]) {
          inserts.push({
            collection: collection,
            fixture: fixtures[collection][fixture].raw
          });
        }
      }

      async.eachSeries(inserts, function (insert, done) {
        db[insert.collection].save(insert.fixture, done);
      }, function (err) {
        db.close();
        done(err);
      });
    });
  };

  async.series([clean, insert], done);
});
