[![build status](https://secure.travis-ci.org/didit-tech/flagpoll.png)](http://travis-ci.org/didit-tech/flagpoll)
# Flagpoll.js

Flagpoll is a utility to make polling easy. There are times when you need to
interact with external systems that require polling for status or completion.

For instance, many of the search engines require polling to determine when a
requested report is available for download.

Its advantages over raw setTimeout or clearInterval type approaches are:

* Your polling function is executed BEFORE waiting to poll again. With
  clearInterval and setTimeout, the wait happens first.
* You can focus on the code that does the actual status check. The repetition
  of your polling function is handled automatically.
* The code is easier to read and understand than code that is buried in a
  setTimeout or clearInterval.

__Note__: You must supply a maximum number of tries, so if your code needs to
poll indefinitely, this is not the library for you.

## Usage Example

    var flagpoll = require('flagpoll');

    var interval = 100; //milliseconds
    var maxTries = 10;

    var pollFunction = function(next) {
      var rand = Math.floor(Math.random()*11);
      (rand < 5) ? next('Success', {num: rand}) : next()
    };

    var callback = function(status, response) {
      console.log(status);
      console.log(response.tries);
      console.log(response.result);
    };

    flagpoll.start(pollFunction, interval, maxTries, callback);

Or, written with everything inline:

    var flagpoll = require('flagpoll');

    flagpoll.start(
      function(next) {
        var rand = Math.floor(Math.random()*11);
        (rand < 5) ? next('Success', {num: rand}) : next()
      },
      100,
      10,
      function(status, response) {
        console.log(status);
        console.log(response.tries);
        console.log(response.result);
      }
    );

Here are the rules:

* The first parameter is your poll function. It takes one parameter called
  next which is used internally to proceed to the wait phase.
  * The next function takes up to two parameters. The first is a status and
    the second is a response. If the first parameter is anything other than
    undefined or null, then polling stops and the status and the response
    are passed in to your callback function.
* The second parameter is a wait interval in milliseconds.
* The third parameter is how many times your poll function will be tried before
  giving up. In the event that the max number of tries is reached, your callback
  function is called with an Error for the status.
* The fourth parameter is your callback function that flagpoll calls either
  when the polling is successful, an error condition occurs, or the max number
  of tries is reached.
* The response passed into your callback function is an object that, at minimum,
  has a key called tries. If you passed back any results from your pollFunction,
  they will be referenced by a key called result.

## Download

You can install using Node Package Manager (npm):

    npm install flagpoll

You can also clone or fork this project.

## Documentation

### start(pollFunction, interval, maxTries, callback)

Start polling by calling pollFunction. After interval milliseconds, call
pollFunction again. Repeat this until polling is done or maxTries is reached.

__Arguments__

* pollFunction - The function that performs the checking. It must take a next
  parameter that is called with status and response parameters.
* interval - The amount of time to wait between pollFunction calls in
  milliseconds.
* maxTries - How many times the pollFunction will be called before giving up.
* callback - The function that receives the status and response parameters
  once polling is done, either because polling was successful, the maxTries
  limit was reached or because of an error condition.

## Contributors

* Tom Galazka ([galazka-tech](https://github.com/galazka-tech))
* Micah Silverman ([dogeared](https://github.com/dogeared))
