var assert = require("assert");
var TaskStorage = require("../TaskStorage");

describe("TaskStorage", function () {

  describe("#constructor", function () {

    it("should error if fs is not passed in as an argument", function (done) {
      try {
        var taskStorage = new TaskStorage();
        assert.fail();
      } catch (e) {
        assert.equal("Undefined argument: fs", e);
      }
      done();
    });

  });

  describe("#getTasks", function () {

    it("should callback with error if fs has an error");

    it("should callback with data when there is no error");

  });

  describe("#saveTasks", function () {

    it("should call to writeFile");

  });

});