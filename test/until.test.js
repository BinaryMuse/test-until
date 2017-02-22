const assert = require('chai').assert;

const until = require('../');

describe('until', function() {
  it('returns a promise that resolves when the latch function returns a truthy value', function(done) {
    let val = null;
    const promise = until(() => val === 42);
    setTimeout(() => val = 42, 20);
    promise.then(() => {
      done();
    });
  });

  it('stops running the latch function after it returns true', function(done) {
    let count = 0;
    const promise = until(() => {
      count++;
      return count === 5
    })
    promise.then(() => {
      // Latch function is done; let's wait to ensure it's not called more.
      setTimeout(() => {
        if (count === 5) {
          done();
        } else {
          done(new Error('We called latch after it return true!'))
        }
      }, 5)
    })
  })

  it('allows the latch function to return a promise', function(done) {
    let val = null;
    const promise = until(() => new Promise((resolve, reject) => {
      if (val === 42) {
        resolve(true);
      } else {
        reject(false);
      }
    }));
    setTimeout(() => val = 42, 20);
    promise.then(() => {
      done();
    });
  })

  it('returns a promise that rejects if the latch function never returns true with the timeout', function(done) {
    let val = null;
    const promise = until(() => val === 42, 20);
    setTimeout(() => val = 42, 50);
    promise.catch(err => {
      assert.match(err.message, /async.*20.*timed out waiting until something happens/);
      done();
    });
  });

  it('allows mixing the order of the arguments', function(done) {
    const val = null;
    const promise = until(10, 'value equals 42', () => val === 42);
    promise.catch(err => {
      assert.match(err.message, /async.*10.*timed out waiting until value equals 42/);
      done();
    });
  });

  it('allows setting the error explicitly', function(done) {
    let val = 0;
    until(15, setError => {
      val++;
      return setError(new Error('Failure in pass ' + val));
    }).catch(err => {
      assert.equal(err.message, 'async(15ms): Failure in pass ' + val);
      assert.operator(val, '>', 0);
      done();
    });
  });

  describe('the default timeout', function() {
    beforeEach(function() {
      until.setDefaultTimeout();
    });

    it('starts at 1000ms', function(done) {
      until(() => false).catch(err => {
        assert.match(err.message, /async.*1000.*timed out/);
        done();
      });
    });

    describe('it can be set', function() {
      beforeEach(function() {
        until.setDefaultTimeout(20);
      });

      it('and is sticky', function(done) {
        until(() => false).catch(err => {
          assert.match(err.message, /async.*20.*timed out/);
          done();
        });
      });
    });
  });
});
