var assert = require("assert");
var Task = require("../../models/Task");

describe("Task", function () {
  var task;

  describe("constructor", function () {
    it("can initialize an empty task", function (done){
      task = new Task();
      assert.ok(task);
      assert.ok(task.description === undefined);
      assert.ok(task.assignedTo === undefined);
      assert.ok(task.isCompleted === undefined);
      done();
    });
    it("can initialize a task with an empty object", function (done) {
      task = new Task({});
      assert.ok(task);
      assert.ok(task.description === undefined);
      assert.ok(task.assignedTo === undefined);
      assert.ok(task.isCompleted === undefined);
      done();
    });
    it("can initialize a task with values", function (done) {
      var source = {
        description: "This is a test",
        assignedTo: "John Doe",
        isCompleted: true
      };
      task = new Task(source);
      assert.ok(task.description === "This is a test");
      assert.ok(task.assignedTo === "John Doe");
      assert.ok(task.isCompleted === true);
      done();
    });
  });
});

