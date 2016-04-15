module.exports = function(RED) {

  var bcryptjs = require('bcryptjs');

  function lookup(obj, key) {
    key = parts(key)
    var lastKey = key.pop()
    for (var i = 0, l = key.length; i < l; i++) {
      var part = key[i]
      if (!(part in obj)) obj[part] = {}
      obj = obj[part]
      if (!obj) throw new Error('dotaccess: incompatible value in ' + part)
    }
    return [obj, lastKey];
  }

  function parts(key) {
    if (Array.isArray(key)) return key
    return key.split('.')
  }

  function get(obj, key, def) {
    key = parts(key)
    for (var i = 0, l = key.length; i < l; i++) {
      var part = key[i]
      if (!(part in obj)) return def
      obj = obj[part]
    }
    return obj
  }

  function set(obj, key, value, overwrite) {
    var objectAndKey = lookup(obj, key),
      obj = objectAndKey[0],
      key = objectAndKey[1];
    if (overwrite || !(key in obj)) obj[key] = value
  }

  function bcrypt(config) {

    RED.nodes.createNode(this, config);

    var node = this;
    var rounds = config.rounds || 10;
    var field = config.field || 'payload';
    var action = config.action || 'encrypt';
    var rounds = parseInt(rounds);
    var salt = bcryptjs.genSaltSync(rounds);
    var hash;

    this.on('input', function(msg) {

      var data = get(msg, field);

      if (action === 'encrypt') {

        var newHash = bcryptjs.hashSync(data, salt);

        set(msg, field, newHash, true);

      } else if (action === 'verify') {

        if (!config.hash || config.hash == null) {
          msg.match = false;
        } else {
          var verifyHash = get(msg, config.hash);
          msg.match = bcryptjs.compareSync(data, verifyHash);
        }

      }

      return node.send(msg);

    });
  }
  RED.nodes.registerType("bcrypt", bcrypt);
}
