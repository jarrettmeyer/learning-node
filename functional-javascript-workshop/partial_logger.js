var slice = Array.prototype.slice;

function logger(namespace) {
  return function () {
    var args = [namespace].concat(slice.call(arguments));
    console.log.apply(null, args);
  };
}

module.exports = logger;
