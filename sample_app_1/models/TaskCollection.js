var IdGenerator = require("./IdGenerator");
var Task = require("./Task");

var TaskCollection = function (tasks) {
  var self = this;
  self.tasks = tasks || {};
  self.idGenerator = new IdGenerator();

  self.add = function (task) {
    if (!task.id) {
      task.id = self.idGenerator.nextId();
    }
    self.tasks[task.id] = task;
    self.setLength();
    return task;
  };

  self.get = function (id) {
    return self.tasks[id];
  };

  self.setLength = function () {
    var keys = Object.keys(self.tasks);
    self.length = keys.length;
  };

  self.setLength();
};

module.exports = TaskCollection;