getJasmineRequireObj().ReportDispatcher = function(j$) {
  function ReportDispatcher(methods) {

    var dispatchedMethods = methods || [];

    for (var i = 0; i < dispatchedMethods.length; i++) {
      var method = dispatchedMethods[i];
      this[method] = (function(m) {
        if (j$.Q) {
          return function() {
            return dispatchQ(m, arguments);
          };
        } else {
          return function() {
            dispatch(m, arguments);
          };
        }
      }(method));
    }

    var reporters = [];

    this.addReporter = function(reporter) {
      reporters.push(reporter);
    };

    return this;

    function dispatch(method, args) {
      for (var i = 0; i < reporters.length; i++) {
        var reporter = reporters[i];
        if (reporter[method]) {
          reporter[method].apply(reporter, args);
        }
      }
    }

    function dispatchQ(method, args) {
      var promises = [];
      for (var i = 0; i < reporters.length; i++) {
        var reporter = reporters[i];
        if (reporter[method]) {
          promises.push(reporter[method].apply(reporter, args));
        }
      }
      return j$.Q.all(promises);
    }
  }

  return ReportDispatcher;
};

