var slice = Array.prototype.slice;

function logger(namespace) {
  console.log.apply(namespace)
}

module.exports = logger;
