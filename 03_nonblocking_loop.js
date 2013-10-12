// An example of how to work with an array in a non-blocking
// loop.

// This will store our results.
var result = {
  count: 0,
  sum: 0,
  toString: function () {
    return "Count: " + result.count + ", Sum: " + result.sum;
  }
};

// Let's actually declare our addtion function here.
var addition = function (array, callback) {

  // We're using setImmediate to give control back to the Node process.
  // We will run once, then queue up the next callback.
  var additionAsync = function (value, callback) {
    result.count += 1;
    result.sum += value;
    setImmediate(function () {
      callback();
    });
  };

  // I don't think there's anything here that could throw an error,
  // but we don't actually want to throw the error regardless.
  // Instead, lets catch it and include it in the callback.
  try {
    if (array.length > 0) {
      // #shift() pops the first item off the array.
      additionAsync(array.shift(), function () {
        addition(array, callback);
      });
    } else {
      // There are no more items in the array, so fire the callback.
      callback(null, result);
    }
  } catch (e) {
    callback(e, result);
  }

};

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
addition(array, function(error, data) {
  if (error) {
    console.error("Error: " + error);
    return;
  }
  console.log("Result: " + data);
});
