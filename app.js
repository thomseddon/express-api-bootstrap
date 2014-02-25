
/**
 * Module Dependencies
 */

var errorHandler = require('./lib/errorHandler');
var routes = require('./lib/routes');
var express = require('express');
var database = require('congo');
// var chatty = require('chatty'); // node-syslog is broken

/**
 * Init express
 */

var app = module.exports = express();

/**
 * Configuration
 */

app.configure(function () {
  app.disable('x-powered-by');
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

  // chatty.configure({ ident: 'this.domain.com' });

  database.configure({
    host: process.env.MONGO_HOST || 'localhost',
    name: process.env.MONGO_DB || 'test',
    port: 27017,
    reconnect: true,
    pool: 10,
    collections: ['tests']
  });
});

app.configure('production', function () {
  // app.use(express.logger({ stream: chatty.stream() }));
});

app.configure('development', function () {
  app.use(express.logger('dev'));
  // chatty.configure({ console: true });
});

/**
 * Routes
 */

app.get('/v1/tests/:id', routes.test.get);
app.get('/v1/tests', routes.test.list);

/**
 * Error Handling
 */

app.all('*', function (req, res, next) { next(404); });
app.use(errorHandler);