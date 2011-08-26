var testHelper = require('test_helper');
var describe = testHelper.describe(exports);
var flagpoll = require('flagpoll');

var interval = 10;
var maxRetries = 10;

describe('When polling', function(it) {
  it("it's successful after max attempts tries", function(test) {
    flagpoll.start(pollFunctionMaxTriesSuccess, interval, maxRetries, 
      function(status, response) {
        assert.equal(status, undefined);
        assert.equal(response.result, 'hello');
        assert.equal(response.tries, maxRetries);
        test.finish();
      }
    );
  });
  
  it("it fails after max attempts tries", function(test) {
    flagpoll.start(pollFunctionMaxTriesFail, interval, maxRetries, 
      function(status, response) {
        assert.equal(status.message, 'Max retries of 10 reached.');
        assert.equal(response.tries, maxRetries);
        test.finish();
      }
    );
  });
  
  it("it succeeds after 5 tries", function(test) {
    flagpoll.start(pollFunctionFiveTries, interval, maxRetries, 
      function(status, response) {
        assert.equal(status, 'Success');
        assert.equal(response.tries, 5);
        assert.equal(response.result.fiveTriesCount, 5);
        assert.equal(response.result.otherStuff, 'otherStuff');
        test.finish();
      }
    );
  });
  
  it("it fails after 7 tries because of an error", function(test) {
    flagpoll.start(pollFunctionSevenTriesFail, interval, maxRetries, 
      function(status, response) {
        assert.equal(status.message,'Polling Bombed!')
        assert.equal(response.tries, 7);
        test.finish();
      }
    );
  });
});

var pollFunctionMaxTriesSuccess = function(next) {
  next(undefined, 'hello');
};

var pollFunctionMaxTriesFail = function(next) {
  next();
}

var pollFunctionFiveTries = function(next) {
  if (!global.fiveTriesCount) {
    global.fiveTriesCount = 1;
  } else {
    global.fiveTriesCount++;
  }
  if (global.fiveTriesCount === 5) {
    next('Success', 
      {fiveTriesCount: global.fiveTriesCount, otherStuff: 'otherStuff'});
  } else {
    next();
  }
}

var pollFunctionSevenTriesFail = function(next) {
  if (!global.sevenTriesCount) {
    global.sevenTriesCount = 1;
  } else {
    global.sevenTriesCount++;
  }
  if (global.sevenTriesCount === 7) {
    next(new Error('Polling Bombed!'));
  } else {
    next();
  }
}