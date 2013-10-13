var ArgumentUndefinedError = function (argumentName) {

  var self = this;
  self.argumentName = argumentName;
  self.message = "Undefined argument: " + self.argumentName;

};

ArgumentUndefinedError.prototype = new Error();
ArgumentUndefinedError.prototype.constructor = ArgumentUndefinedError;
ArgumentUndefinedError.prototype.name = "ArgumentUndefinedError ";

module.exports = ArgumentUndefinedError;
