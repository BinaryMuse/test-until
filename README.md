# test-until

[![Build Status](https://travis-ci.org/BinaryMuse/test-until.svg?branch=master)](https://travis-ci.org/BinaryMuse/test-until)

A utility that returns a promise that resolves when the passed function returns true. It works like Jasmine's `waitsFor`, but Promise based.

## Installation

Node.js:

`npm install --save[-dev] test-until`

## Requirements

test-until requires a global variable `Promise` which needs to be a A+ compliant promise implementation (such as is available by default in [most modern browsers](http://caniuse.com/#feat=promises)). If you need to polyfill `Promise` for any reason (such as supporting IE 11), I recommend [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).

## Usage

```javascript
var promise = until(checkFunc, message, timeout)
```

* `checkFunc` - A function that returns a truthy value once the promise should be resolved. `until` will call this function repeatedly until it returns `true` or the timeout elapses.
* `message` *(optional)* - A message to help identify failing cases. For example, setting this to `"value == 42"` will reject with an error of `"timed out waiting until value == 42"` if it times out. Defaults to `"something happens"`.
* `timeout` *(optional)* - The number of milliseconds to wait before timing out and rejecting the promise. Defaults to `1000`.

The three arguments can be supplied in any order depending on your preferences. For example, putting the message first can make the line read a little more like English:

```javascript
until('we know the answer to life, the universe, and everything', function () { return val === 42 }, 500)
```

## Example with Test Framework

Here's an example using the [Mocha](https://mochajs.org/) testing framework.

```javascript
var until = require('test-until')

describe('something', function () {
  it('tests things', function (done) {
    var val = 0
    setTimeout(function () { val = 42 }, 100)
    var promise = until(function () { val === 42 })
    promise.then(function() {
      // after 100ms, `val` will be set to `42`
      // and the promise returned from `until` will resolve
      done()
    })
  })
})
```

test-until reads and works even better with access to `async`/`await` in your tests, allowing you to wait for multiple async conditions with no callbacks in a manner that reads much like English:

```javascript
import until from 'test-until'

describe('something', function () {
  it('tests things', async function () {
    let val = 0
    let otherVal = 0
    setTimeout(() => val = 42, 100)
    setTimeout(() => otherVal = 2048, 200)
    // Awaiting a rejected promise will cause a synchronous `throw`,
    // which will reject the promise returned from the async function
    // and will fail the test.
    await until('val is 42', () => val === 42)
    await until('otherVal is 2048', () => otherVal === 2048)
  })
})
```

## Advanced Usage

### Setting the Default Timeout

Use `until.setDefaultTimeout(ms)` to set the default timeout. You can easily set this to different values in different parts of your test suite by setting it in a `beforeEach`

```javascript
import until from 'test-until'

// Set a global default timeout
beforeEach(function () {
  until.setDefaultTimeout(500)
})

describe('slow stuff', function () {
  beforeEach(function () {
    // Make it a bit longer for these tests
    until.setDefaultTimeout(1000)
  })
  // ...
})
```

Passing a falsy `ms` resets to the default of `1000`.

### Setting the Error Message from Inside the Check Function

The check function gets called with a special argument called `setError` which allows the check function to specify an error to return if the `until` call times out. This can be useful when integrating `until` with other test assertions; for example, here's a snippet that will wait for `val` to be `42` and will reject with an actual Chai assertion error if it fails.

```javascript
import until from 'test-until'
import {assert} from 'chai'

describe('something', function () {
  it('tests things', async function () {
    let val = 0
    setTimeout(() => val = 42, 100)
    await until(setError => {
      try {
        assert.equal(val, 42)
        return true
      } catch (err) {
        return setError(err) // explicitly set the error
      }
    })
  })
})
```

## Development

The test suite uses newer JavaScript features, so you need Node.js 6+ in order to run it. Run `npm test` to run the suite.
