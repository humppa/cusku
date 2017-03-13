/* util.js */

var fs   = require('fs');
var path = require('path');
var util = require('util');
var yaml = require('js-yaml');

var CONFIG = '../config.yaml';

module.exports = {
  readConfig: readConfig,
  D: function(o) { console.log(util.inspect(o, { depth: 2, colors: true })); }
};

/**
 * Fill missing parts of configuration with default values.
 *
 * @param {Object} Raw configuration
 * @returns {Object} Normalized configuration object
 */
function normalizeConfig(raw) {
  var conf = raw || {};
  conf.server = conf.server || {};
  conf.server.port = conf.server.port || 3000;
  /// conf.database = conf.database || {};
  /// conf.database.filename = conf.database.filename || '';
  return conf;
}

/**
 * Read configuration from file.
 *
 * @returns {Object} Parsed configuration data
 */
function readConfig() {
  var conf = {};
  try {
    conf = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, CONFIG)));
  }
  catch (e) {
    console.log(e);
    process.exit(1);
  }
  return normalizeConfig(conf);
}

/**
 * TODO
 */
function isValid(nick) {
  if (typeof nick !== 'string') {
    return false;
  }
  if (2 > nick.length || nick.length > 32) {
    return false;
  }
  return true;
}
