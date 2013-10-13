var fs = require("fs");
var querystring = require("querystring");
var FormParser = require("./FormParser");
var Task = require("./models/Task");
var TaskCollection = require("./models/TaskCollection");
var TaskStorage = require("./TaskStorage");
var UrlParser = require("./UrlParser");

var TaskActions = function (router) {

  if (!router) {
    throw new Error("Undefined argument: " + router);
  }

  var self = this;
  self.router = router;
  self.taskCollection = null;
  self.taskStorage = new TaskStorage(fs);

  self.completeTask = function (request, response) {
    var id = (new UrlParser(request.url)).getIdFromUrl();
    var task = self.taskCollection.get(id);
    task.isCompleted = true;
    self.taskStorage.saveTasks(self.taskCollection.tasks);
    self.router.returnEmpty(request, response);
  };

  self.createTask = function (request, response) {
    var formParser = new FormParser(querystring, request);
    formParser.getObject(function (data) {
      var task = new Task(data);
      self.taskCollection.add(task);
      self.taskStorage.saveTasks(self.taskCollection.tasks);
      self.router.returnJson(request, response, task);
    });
  };

  self.editTask = function (request, response) {
    var formParser = new FormParser(querystring, request);
    formParser.getObject(function (data) {
      var task = new Task(data);
      self.taskCollection.update(task.id, task);
      self.taskStorage.saveTasks(self.taskCollection.tasks);
      self.router.returnJson(request, response, task);
    });
  };

  self.getAllTasks = function (request, response) {
    self.taskStorage.getTasks(function (error, tasks) {
      self.router.returnJson(request, response, tasks);
    });
  };

  // Run the following when the TaskActions object is created.
  self.taskStorage.getTasks(function (error, tasks) {
    self.taskCollection = new TaskCollection(tasks);
  });

};

module.exports = TaskActions;
