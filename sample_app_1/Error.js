var error = {

  ArgumentError: function (argumentName) {
    var self = this;
    self.argumentName = argumentName;
    self.error = "ArgumnetError";
    self.toString = function () {
      return "Undefined argument: " + self.argumentName;
    };
  }

};

module.exports = error;
