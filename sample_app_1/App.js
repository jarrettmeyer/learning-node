var fs = require("fs");
var querystring = require("querystring");
var http = require("http");
var FormParser = require("./FormParser");
var Router = require("./Router");
var Task = require("./models/Task");
var TaskCollection = require("./models/TaskCollection");
var TaskStorage = require("./TaskStorage");
var UrlParser = require("./UrlParser");
var vars = require('./vars');

var App = function () {

  var self = this;
  self.router = new Router(fs);
  self.taskStorage = new TaskStorage(fs, vars);

  self.initializeRoutes = function () {
    self.router.match("GET /", function (request, response) {
      self.router.returnContent(request, response, "./content/index.html");
    });
    self.router.match("GET /images/pencil.png", function (request, response) {
      self.router.returnBinaryContent(request, response, "./content/assets/images/pencil.png", "image/png");
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
      self.taskStorage.getTasks(function (error, tasks) {
        self.router.returnJson(request, response, tasks);
      });
    });
    self.router.match("POST /tasks", function (request, response) {
      var formParser = new FormParser(querystring, request);
      formParser.getObject(function (data) {
        var task = new Task(data);
        self.taskCollection.add(task);
        self.taskStorage.saveTasks(self.taskCollection.tasks);
        self.router.returnJson(request, response, task);
      });
    });
    self.router.match(/POST \/tasks\/[a-z0-9]+$/, function (request, response) {
      var formParser = new FormParser(querystring, request);
      formParser.getObject(function (data) {
        var task = new Task(data);
        self.taskCollection.update(task.id, task);
        self.taskStorage.saveTasks(self.taskCollection.tasks);
        self.router.returnJson(request, response, task);
      });
    });
    self.router.match(/POST \/tasks\/[a-z0-9]+\/complete$/, function (request, response) {
      var id = (new UrlParser(request.url)).getIdFromUrl();
      var task = self.taskCollection.get(id);
      task.isCompleted = true;
      self.taskStorage.saveTasks(self.taskCollection.tasks);
      self.router.returnEmpty(request, response);
    });
  };

  self.start = function (port) {
    var server = http.createServer(self.router.onRequest);
    server.listen(port);
  };

  self.initializeRoutes();
  self.taskStorage.getTasks(function (error, tasks) {
    self.taskCollection = new TaskCollection(tasks);
  });
};

module.exports = App;