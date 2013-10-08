var assert = require("assert");
var Task = require("../../models/Task");
var TaskCollection = require("../../models/TaskCollection");
var taskCollection;

describe("TaskCollection", function () {
  describe("#add", function () {
    taskCollection = new TaskCollection();
    it("adds a new task to the collection", function (done) {
      taskCollection.add(new Task());
      assert.equal(1, taskCollection.length);
      done();
    });
    it("assigns an id to the new task", function (done) {
      var task = new Task();
      taskCollection.add(task);
      assert.ok(task.id);
      assert.ok(task.id.match(/[a-z0-9]{16}/));
      done();
    });
    it("does not overwrite an id", function (done) {
      var task = new Task({ id: "test" });
      taskCollection.add(task);
      assert.equal("test", task.id);
      done();
    });
  });
  describe("#constructor", function () {
    it("creates an empty collection", function (done) {
      taskCollection = new TaskCollection();
      assert.equal(0, taskCollection.length);
      done();
    });
  });
  describe("#get", function (){
    it("can fetch a task by id", function (done){
      taskCollection = new TaskCollection();
      task = new Task({ id:"test" });
      taskCollection.add(task);
      var fetchedTask = taskCollection.get("test");
      assert.equal("test", fetchedTask.id);
      done();
    });
  });
});