/* sqlite.js */

var sqlite = require('sqlite3').verbose();

/// DEBUG
var util = require('util');
var D = function(o) { console.log(util.inspect(o, { depth: 2, colors: true })); }

var SQL = {
  init: 'CREATE TABLE IF NOT EXISTS user ('
      + ' id   INTEGER PRIMARY KEY,'
      + ' org  TEXT,'
      + ' json TEXT'
      + ')'
};

module.exports = function(conf, callback) {
  var db = new sqlite.Database(conf.sqlite_file);

  db.run(SQL.init);

  callback(null, {
    fetchUser: fetch,
    storeUser: store
  });

  /**
   * Store a user profile to database.
   *
   * @param {Object} Database handle
   * @param {Type} Description
   * @returns {Type} Description
   */
  function store(profile, callback) {
    console.log("store()");
    D(profile);
    var id = profile.id || profile;
    callback(null, id);
  }

  /**
   * Find and fetch a matching user profile from database.
   *
   * @param {Object} Database handle
   * @param {Type} Description
   * @returns {Type} Description
   */
  function fetch(id, callback) {
    console.log("fetch()");
    D(id);

    callback(null, {
      id: id,
      name: 'Herra Huu :-)'
    });
  }
};
