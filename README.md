# rollout-v2

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image]

### Install

``` shell
$ npm install --save rollout-v2
```

### Usage

``` javascript
var Rollout = require('rollout-v2');
var rollout = new Rollout();
rollout.active("newFeature", function (err, active) {
  console.log(err, active);
});
```

You can take a look the [test cases](https://github.com/ainsleyc/rollout-v2/tree/master/test) for more details.

### API

> (Coming soon)

### Contributing

* In lieu of a formal styleguide, take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality.
* Lint and test your code using gulp.

### License

Copyright (c) 2015 Ainsley Chong. Licensed under the MIT license.

[npm-url]: https://npmjs.org/package/rollout-v2
[npm-image]: https://badge.fury.io/js/rollout-v2.svg
[daviddm-url]: https://david-dm.org/ainsleyc/rollout-v2.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/ainsleyc/rollout-v2
