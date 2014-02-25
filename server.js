
/**
 * Module dependencies
 */

var app = require('./app.js');

/**
 * Start server
 */

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log('Listening on ' + port);
});
