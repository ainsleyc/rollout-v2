'use strict';

var Rollout = require('../');
var assert = require('should');
var util = require('util');

var MockStorage = (function () {
  var MockStorage = function () {
    this._data = {
      right_a: {
        value: '100||',
        expected: {
          err: null,
          active: true
        }
      },
      right_b: {
        value: '50||',
        expected: {
          err: null,
          active: true
        }
      },
      right_c: {
        value: '0||',
        expected: {
          err: null,
          active: false
        }
      },
      right_d: {
        value: '-1||',
        expected: {
          err: null,
          active: false
        }
      },
      right_e: {
        value: '||',
        expected: {
          err: null,
          active: false
        }
      },
      right_f: {
        value: 'asdf',
        expected: {
          err: null,
          active: false
        }
      },
      wrong_a: {
        value: null,
        expected: {
          err: "TypeError: Cannot read property 'split' of null",
          active: false
        }
      },
      wrong_b: {
        value: undefined,
        expected: {
          err: "TypeError: Cannot read property 'split' of undefined",
          active: false
        }
      },
      wrong_c: {
        value: {},
        expected: {
          err: "TypeError: data.split is not a function",
          active: false
        }
      },
      wrong_d: {
        value: 1,
        expected: {
          err: "TypeError: data.split is not a function",
          active: false
        }
      }
    };
  };

  MockStorage.prototype.keys = function () {
    return Object.keys(this._data);
  };

  MockStorage.prototype.expected = function (key) {
    return this._data[key].expected;
  };

  MockStorage.prototype.get = function (key, cb) {
    try {
      var parsedKey = key.replace('feature:', '');
      var data = this._data[parsedKey].value;
      cb(null, data);
    } catch (e) {
      cb(e, false);
    }
  };

  return MockStorage;
})();

describe('rollout', function () {
  var storage = new MockStorage();
  var rollout = new Rollout(storage);

  storage.keys().forEach(function (key) {
    it('should get rollout correctly for key: ' + util.inspect(key), function () {
      var expected = storage.expected(key);

      rollout.active(key, function (err, active) {
        if (expected.err) {
          assert(err.toString()).equal(expected.err);
        } else {
          assert(err).equal(expected.err);
        }

        assert(active).equal(expected.active);
      });
    });
  });

  var problemKeys = [
    'UNKNOWN KEY'
  ];

  problemKeys.forEach(function (key) {
    it('should get rollout correctly for key: ' + util.inspect(key), function () {
      rollout.active(key, function (err, active) {
        assert(err.toString()).equal("TypeError: Cannot read property 'value' of undefined");
        assert(active).equal(false);
      });
    });
  });
});
