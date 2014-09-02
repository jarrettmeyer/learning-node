module.exports = function (fn, n) {
  if (typeof n !== 'number') {
    n = fn.length;
  }

  function getCurriedFunction(prev) {
    return function (arg) {
      var args = prev.concat(arg);
      if (args.length < n) {
        return getCurriedFunction(args);
      } else {
        return fn.apply(this, args);
      }
    };
  }

  return getCurriedFunction([]);
};
