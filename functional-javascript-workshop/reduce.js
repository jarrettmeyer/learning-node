function reduce(array, fn, initial) {

  function reduceInternal(index, value) {
    if (index >= array.length) {
      return value;
    }
    var next = fn(value, array[index], index, array);
    return reduceInternal(index + 1, next);
  }

  return reduceInternal(0, initial);
}
module.exports = reduce;
