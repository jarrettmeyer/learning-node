var fs = require("fs");
var http = require("http");
var FormParser = require("./FormParser");
var Router = require("./Router");
var Task = require("./models/Task");
var TaskCollection = require("./models/TaskCollection");

var App = function () {
  var self = this;
  self.router = new Router();
  self.datafile = "./data/tasks.json";

  self.initializeRoutes = function () {
    self.router.match("GET /", function (request, response) {
      self.router.returnContent(request, response, "./content/index.html");
    });
    self.router.match("GET /javascripts/script.js", function (request, response) {
      self.router.returnContent(request, response, "./content/assets/javascripts/script.js", "text/javascript");
    });
    self.router.match("GET /javascripts/jquery.js", function (request, response) {
      self.router.returnContent(request, response, "./content/assets/javascripts/jquery-2.0.3.min.js", "text/javascript");
    });
    self.router.match("GET /javascripts/jquery-2.0.3.min.map", function (request, response) {
      self.router.returnEmpty(request, response);
    });
    self.router.match("GET /javascripts/knockout.js", function (request, response) {
      self.router.returnContent(request, response, "./content/assets/javascripts/knockout-2.3.0.js", "text/javascript");
    });
    self.router.match("GET /stylesheets/style.css", function (request, response) {
      self.router.returnContent(request, response, "./content/assets/stylesheets/style.css", "text/css");
    });
    self.router.match("GET /tasks", function (request, response) {
      self.readTasksFromFile(function (tasks) {
        self.router.returnJson(request, response, tasks);
      });
    });
    self.router.match("POST /tasks", function (request, response) {
      var formParser = new FormParser(request);
      formParser.getObject(function (data) {
        var task = new Task(data);
        self.taskCollection.add(task);
        self.writeTasksToFile();
        self.router.returnJson(request, response, task);
      });
    });
  };

  self.readTasksFromFile = function (callback) {
    fs.readFile(self.datafile, "utf8", function (error, data) {
      if (error) {
        console.error(error);
        return;
      }
      var tasks = JSON.parse(data);
      callback(tasks);
    });
  };

  self.writeTasksToFile = function () {
    var content = JSON.stringify(self.taskCollection.tasks);
    fs.writeFile(self.datafile, content, function (error, data) {
      if (error) {
        console.error("Error when writing tasks to data file. File: " + self.datafile);
        console.error("Error: " + error);
      }
    });
  };

  self.start = function (port) {
    var server = http.createServer(self.router.onRequest);
    server.listen(port);
  };

  self.initializeRoutes();
  self.readTasksFromFile(function (tasks) {
    self.taskCollection = new TaskCollection(tasks);
  });
};

module.exports = App;