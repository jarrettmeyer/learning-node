var repeater = function (action, count) {
  if (count <= 0) {
    return;
  }
  action();
  return repeater(action, count - 1);
};
module.exports = repeater;
