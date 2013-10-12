var assert = require("assert");
var error = require("../error");

describe("error.ArgumentError", function () {

  describe("#argumentName", function () {

    it("saves the argument", function (done) {
      var ae = new error.ArgumentError("variable");
      assert.equal("variable", ae.argumentName);
      done();
    });

  });

  describe("#toString", function () {

    it("produces the expected message", function (done) {
      var ae = new error.ArgumentError("variable");
      assert.equal("Undefined argument: variable", ae);
      done();
    });;

  });

});