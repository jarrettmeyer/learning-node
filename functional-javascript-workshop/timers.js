module.exports = function repeat(action, number) {
  // If we're done, then stop.
  if (number <= 0) {
    return;
  }

  // Execute the action.
  action();

  // Allow the recursion to be interrupted.
  setTimeout(function () {
    number -= 1;
    return repeat(action, number);
  }, 0);
};
