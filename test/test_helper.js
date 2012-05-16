global.should = require('should');
global.assert = require('assert');
global.inspect = require('eyes').inspector({});
global._ = require('underscore');
require('../lib/helpers/core_ext');

var sinon = require('sinon');

/**
 * BDD Hooks.
 */

var bdd = module.exports = {
  describe: function(exports) {
    return function(subject, callback) {
      var testContext = {};
      testContext.subject = subject;
      callback(bdd.it(exports, testContext));
    };
  },
  it: function(exports, testContext) {
    return function(statement, callback) {
      exports[testContext.subject + ' ' + statement] = function(done) {
        var sandbox = sinon.sandbox.create();
        sandbox.finish = function() {
          sandbox.restore();
          done();
        };
        callback(sandbox);
      };
    };
  }
};

/**
 * Terminate process on uncaught exception
 */

process.on('uncaughtException', function(err) {
  process.exit(1);
});
