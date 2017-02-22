var defaultTimeout = 1000;

function until(_latch, _message, _timeout) {
  var start = new Date().getTime();

  var latchFunction = null;
  var message = null;
  var timeout = null;

  if (arguments.length > 3) {
    throw new Error('until only takes up to 3 args');
  }

  for (var i = 0; i < arguments.length; i++) {
    switch (typeof arguments[i]) {
      case 'function':
        latchFunction = arguments[i];
        break;
      case 'string':
        message = arguments[i];
        break;
      case 'number':
        timeout = arguments[i];
        break;
    }
  }

  message = message || 'something happens';
  timeout = timeout || defaultTimeout;
  var error;

  var setError = function(err) {
    if (typeof err === 'string') {
      error = new Error(err);
    } else {
      error = err;
    }
    return false;
  };

  return new Promise(function(resolve, reject) {
    var checker = function() {
      Promise.resolve(latchFunction(setError))
        .catch(err => {
          setError(err);
          return false;
        })
        .then(result => {
          if (result) {
            return resolve(result);
          } else {
            var now = new Date().getTime();
            var delta = now - start;
            if (delta > timeout) {
              if (!error) {
                error = new Error('timed out waiting until ' + message);
              }
              error.message = 'async(' + timeout + 'ms): ' + error.message;
              return reject(error);
            } else {
              return setTimeout(checker);
            }
          }
        })
    };
    checker();
  });
}

until.setDefaultTimeout = function(ms) {
  if (!ms) {
    ms = 1000;
  }
  defaultTimeout = ms;
};

module.exports = until;
