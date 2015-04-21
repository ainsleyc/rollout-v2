
var redis = require('redis');
var client = redis.createClient(10008, "10.199.6.130")
client.select(5);

var Rollout = require('./lib/rollout');

var rollout = new Rollout(client);

rollout.active("feature1", function(err, data) {
  console.log(data);
});
