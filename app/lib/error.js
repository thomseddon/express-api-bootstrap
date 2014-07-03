
/**
 * Expose
 */

module.exports = Err;

/**
 * Err
 *
 * @param {Number} code
 * @param {String} description
 */

function Err (code, description) {
  if (!(this instanceof Err)) return new Err(code, description);

  this.code = code;
  this.description = description;

  var stack = new Error().stack.split('\n');
  stack.splice(1, 2);
  this.stack = stack;
}
