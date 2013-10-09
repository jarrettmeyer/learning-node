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

  self.hasId = function (id) {
    var keys = Object.keys(self.tasks);
    for (var i = 0, len = keys.length; i < len; i += 1) {
      if (keys[i] === id) {
        return true;
      }
    }
    return false;
  };

  self.setLength = function () {
    var keys = Object.keys(self.tasks);
    self.length = keys.length;
  };

  self.update = function (id, task) {
    if (id !== task.id) {
      throw "ID for task is not valid.";
    }
    if (!self.hasId(id)) {
      throw "Could not find ID: " + id;
    }
    self.tasks[id] = task;
    self.setLength();
    return task;
  };

  self.setLength();
};

module.exports = TaskCollection;