module.exports = function arrayMap(array, fn) {
  return array.reduce(function (prev, curr, i, a) {
    return prev.concat(fn(curr));
  }, []);
};
