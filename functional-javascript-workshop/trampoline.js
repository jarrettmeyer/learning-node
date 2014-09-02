function repeat(operation, num) {
  return function () {
    if (num <= 0) {
      return;
    }
    operation();
    num -= 1;
    return repeat(operation, num);
  }
}

function trampoline(fn) {
  while (fn && typeof fn === 'function') {
    fn = fn();
  }
}

module.exports = function(operation, num) {
  return trampoline(function () {
    return repeat(operation, num);
  });
}
