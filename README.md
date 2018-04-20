# execa-wrap

> Wraps [execa][execa] and makes output suitable for snapshot testing

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]
[![Build status](https://ci.appveyor.com/api/projects/status/k0x59r7f4qem7nvb?svg=true)](https://ci.appveyor.com/project/RandallKent/execa-wrap)
[![renovate-app badge][renovate-badge]][renovate-app]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save execa-wrap
```

## Use

From the tests, include both this module and
[snap-shot-it](https://github.com/bahmutov/snap-shot-it)

```js
const execaWrap = require('execa-wrap')
const snapshot = require('snap-shot-it')
describe('execa-wrap', () => {
  it('ls', () => {
    return execaWrap('ls', ['src']).then(snapshot)
  })
})
```
```text
$ cat __snapshots__/execa-wrap-spec.js
exports['execa-wrap ls 1'] = `
  command: ls src
  code: 0
  failed: false
  killed: false
  signal: null
  timedOut: false

  stdout:
  -------
  execa-wrap-spec.js
  index.js
  -------
  stderr:
  -------

  -------
  `
```

You probably want to cleanup the output before the snapshot step. For example, you might
want to remove timings, stack traces, etc.

If the program fails, the output and everything else will be processed the same way.
Thus you can test the programs returning non-zero exit codes by just attaching resolved
promise callback

```js
const execaWrap = require('execa-wrap')
execaWrap('failing-command', ['its', 'arguments'])
  .then(output => {
    // output will be text like above but with
    // details like exit code and stderr
  })
```

You can pass other options to [execa][execa], for example environment variables

```js
const execaWrap = require('execa-wrap')
execaWrap('failing-command', ['its', 'arguments'], {
  env: {
    FOO: 'foo'
  }
})
```

### Filtering properties

If you are not interested in every returned property, you can filter and get only some
properties. For example, let us grab `command` and `stdout`

```js
execaWrap('ls', ['src'], {filter: ['cmd', 'stdout']})
// command: ls src
// stdout
// ------
```

For a single filter, just use a string or single item array

```js
execaWrap('ls', ['src'], {filter: 'cmd'})
// command: ls src
```

## Debug

To see internal log messages, run with `DEBUG=execa-wrap` environment variable

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/execa-wrap/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/execa-wrap.svg?downloads=true
[npm-url]: https://npmjs.org/package/execa-wrap
[ci-image]: https://travis-ci.org/bahmutov/execa-wrap.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/execa-wrap
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
[execa]: https://github.com/sindresorhus/execa
