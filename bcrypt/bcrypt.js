module.exports = function (RED) {
  var bcryptjs = require("bcryptjs");

  function lookup(obj, key) {
    key = parts(key);
    var lastKey = key.pop();
    for (var i = 0, l = key.length; i < l; i++) {
      var part = key[i];
      if (!(part in obj)) obj[part] = {};
      obj = obj[part];
      if (!obj) throw new Error("dotaccess: incompatible value in " + part);
    }
    return [obj, lastKey];
  }

  function parts(key) {
    if (Array.isArray(key)) return key;
    return key.split(".");
  }

  function get(obj, key, def) {
    key = parts(key);
    for (var i = 0, l = key.length; i < l; i++) {
      var part = key[i];
      if (!(part in obj)) return def;
      obj = obj[part];
    }
    return obj;
  }

  function set(obj, key, value, overwrite) {
    var objectAndKey = lookup(obj, key),
      obj = objectAndKey[0],
      key = objectAndKey[1];
    if (overwrite || !(key in obj)) obj[key] = value;
  }

  function bcrypt(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    /**
     * The action to perform [hash, compare]
     */
    var action = config.action || "encrypt";

    /**
     *  The plaintext field to encrypt or to verify against
     */
    var field = config.field || "payload";

    /**
     * Hash for comparison
     */
    var hash = config.hash || "payload";

    /**
     * What to do with the hash
     */
    var assignment = config.assignment || "replace";

    /**
     * Assign the hash to a different field
     */
    var target =
      assignment === "replace" ? config.field : config.target || "payload";

    /**
     * Field to assign the boolean result of the comparison
     */
    var match = config.match || "match";

    /**
     * Number of ouputs to emit
     */
    var outputs = config.outputs || 1;

    /**
     * Number of rounds to use for the salt
     */
    var rounds = parseInt(config.rounds || 10);

    this.on("input", function (msg) {
      var data = String(get(msg, field));

      /**
       * HASHING
       */
      if (action === "encrypt") {
        var salt = bcryptjs.genSaltSync(rounds);
        var newHash = bcryptjs.hashSync(data, salt);

        if (assignment === "replace") {
          set(msg, field, newHash, true);
        } else {
          set(msg, target, newHash, true);
        }

        /**
         * COMPARISON
         */
      } else if (action === "verify") {
        if (!hash || hash == null) {
          set(msg, match, false, true);

          return outputs === 1 ? node.send(msg) : node.send([null, msg]);
        } else {
          var verifyHash = get(msg, hash);

          if (!verifyHash) {
            set(msg, match, false, true);

            return outputs === 1 ? node.send(msg) : node.send([null, msg]);
          }

          var isMatch = bcryptjs.compareSync(data, verifyHash);

          set(msg, match, isMatch, true);

          if (isMatch) {
            return outputs === 1 ? node.send(msg) : node.send([msg, null]);
          } else {
            return outputs === 1 ? node.send(msg) : node.send([null, msg]);
          }
        }
      }
      return node.send(msg);
    });
  }
  RED.nodes.registerType("bcrypt", bcrypt);
};
