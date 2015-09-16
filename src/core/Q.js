getJasmineRequireObj().Q = function() {

  if (typeof(require) === 'function') {
    return require('q');
  }

};
