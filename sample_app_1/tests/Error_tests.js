var assert = require("assert");
var error = require("../error");

describe("error.ArgumentError", function () {

  describe("#toString", function () {

    it("produces the expected message", function (done) {
      var ae = new error.ArgumentError("variable");
      assert.equal("Undefined argument: variable", ae);
      done();
    });;

  });

});