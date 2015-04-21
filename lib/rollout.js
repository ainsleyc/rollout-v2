/*
 * rollout-v2
 * https://github.com/ainsleyc/rollout-v2
 *
 * Copyright (c) 2015 Ainsley Chong
 * Licensed under the MIT license.
 */

'use strict';

function Rollout(storage) {
  // TBD add default storage, or throw error
  this.storage = storage;
}

Rollout.prototype.active = function (feature, cb) {
  this.storage.get(this.getKey(feature), function(err, data) {
    // TBD set own errors
    if (err) { cb(err); }
    var values = data.split("||");
    var active = parseInt(values[0]) > 0
    cb(err, active); 
  });
};

Rollout.prototype.getKey = function (feature) {
  return "feature:" + feature;
};

module.exports = Rollout;
