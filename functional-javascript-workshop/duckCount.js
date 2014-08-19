function duckCount() {
  var ducks = Array.prototype.slice.call(arguments).filter(function (element) {
    return Object.prototype.hasOwnProperty.call(element, "quack");
  });

  return ducks.length;
}
module.exports = duckCount;
