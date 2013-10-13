var assert = require("assert");
var ArgumentUndefinedError = require("../ArgumentUndefinedError");

describe("ArgumentUndefinedError", function () {

  describe("#argumentName", function () {

    it("saves the argument", function (done) {
      var ae = new ArgumentUndefinedError("variable");
      assert.equal("variable", ae.argumentName);
      done();
    });

  });

  describe("#toString", function () {

    it("produces the expected message", function (done) {
      var ae = new ArgumentUndefinedError("variable");
      assert.equal("Undefined argument: variable", ae.message);
      done();
    });;

  });

});
