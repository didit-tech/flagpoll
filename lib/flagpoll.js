var _ = require('underscore');
var async = require('async');

(function() {
  var flagpoll = {};
  module.exports = flagpoll;

  flagpoll.start = function(pollFunction, interval, maxRetries, callback) {
    var functions = [];
    for (var i=0; i<maxRetries; i++) {
      functions.push(function(next) {
        pollFunction(next);
      });

      functions.push(function(next) {
        setTimeout(function() { next(); }, interval);
      });
    }

    async.series(functions, function(status, response) {
      var callbackResults = {
        tries: (response.length%2 === 0) ?
          response.length/2 : (response.length+1)/2
      };
      if(typeof status === 'object')
        return callback(status, callbackResults);
      response = _.compact(response);
      if (response.length === 0) {
        callback(new Error('Max retries of ' + maxRetries + ' reached.'),
          callbackResults)
      } else {
        callbackResults.result = response[0];
        callback(status, callbackResults);
      }
    });
  }
}());


