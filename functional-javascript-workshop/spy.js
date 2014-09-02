module.exports = function Spy(target, method) {

  var fn = target[method];

  // We need to store a reference object so each target+method
  // gets its own counter.
  var counter = {
    count: 0
  };

  target[method] = function () {
    counter.count += 1;
    return fn.apply(this, arguments);
  };

  return counter;

};
