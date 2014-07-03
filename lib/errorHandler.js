
/**
 * Module dependencies
 */

var http = require('http');

/**
 * Expose
 */

module.exports = errorHandler;

/**
 * Status codes
 */

var statusCodes = http.STATUS_CODES;

/**
 * Error Handler
 */

function errorHandler (err, req, res, next) {
  // Numeric errors
  if (typeof err === 'number') {
    err = { code: err };
  }

  err = {
    code: err.code || err.status || 500,
    error: err.error,
    error_description: err.error_description || err.description || err.message
  };

  // Validate the code
  if (isNaN(parseInt(err.code, 10)) || !isFinite(err.code) || err.code < 400 ||
      err.code > 511) {
    err.code = 500;
  }

  // Extract the error code
  if (!err.error) {
    err.error = statusCodes[(err.code).toString()] || 'Internal Server Error';
  }

  if (!err.error_description) err.error_description = err.error;
  err.error = err.error.replace(/\s/g, '_').toLowerCase();

  res.jsonp(err.code, err);
}
