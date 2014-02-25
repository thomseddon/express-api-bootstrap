
var fixtures = require('./fixtures');
var request = require('supertest');
var database = require('congo');
var async = require('async');

var ObjectID = database.ObjectID;

describe('tests', function () {

  before(function () {
    request = request(require(__dirname + '/../app'));
  });

  describe('list', function () {
    it('should reurn valid response', function (done) {
      request
        .get('/v1/tests')
        .expect(200, function (err, res) {
          res.body.code.should.equal(200);

          res.body.meta.should.be.an.Object;
          res.body.meta.total.should.equal(2);

          res.body.data.should.be.an.Array;
          res.body.data.length.should.equal(2);

          res.body.data[0].should.eql(fixtures.tests.one.brief);
          res.body.data[1].should.eql(fixtures.tests.two.brief);

          done();
        });
    });

    it('should allow limiting and offsetting', function (done) {
      request
        .get('/v1/tests/?limit=1&offset=1')
        .expect(200, function (err, res) {
          res.body.code.should.equal(200);

          res.body.meta.should.be.an.Object;
          res.body.meta.total.should.equal(1);

          res.body.data.should.be.an.Array;
          res.body.data.length.should.equal(1);

          res.body.data[0].should.eql(fixtures.tests.two.brief);

          done();
        });
    });
  });

  describe('get', function () {

    it('should detect invalid id', function (done) {
      request
        .get('/v1/tests/invalid')
        .expect(400, /invalid test id/i, done);
    });

    it('should return valid response', function (done) {
      request
        .get('/v1/tests/52736ccdb49150400f0000ca')
        .expect(200, function (err, res) {
          res.body.code.should.equal(200);

          res.body.data.should.eql(fixtures.tests.one.full);

          done();
        });
    });
  });

});
