var TaskActions = require("./TaskActions");

/**
 * Allows routes to be configured sepratately from the rest of the application.
 * @param {Router} router
 */
var RouteConfig = function (router, taskActions) {

  if (!router) {
    throw new Error("Undefined argument: router");
  }

  // Variable initialization
  var self = this;
  self.router = router;
  self.taskActions = new TaskActions(self.router);

  /**
   * Configure routes
   */
  self.configure = function (app) {

    // Root bindings...
    self.router.match("GET /", function (request, response) {
      self.router.returnContent(request, response, "./content/index.html");
    });

    // Image bindings...
    self.router.match("GET /images/accept.png", function (request, response) {
      self.router.returnBinaryContent(request, response, "./content/assets/images/accept.png", "image/png");
    });
    self.router.match("GET /images/cross.png", function (request, response) {
      self.router.returnBinaryContent(request, response, "./content/assets/images/cross.png", "image/png");
    });
    self.router.match("GET /images/pencil.png", function (request, response) {
      self.router.returnBinaryContent(request, response, "./content/assets/images/pencil.png", "image/png");
    });

    // JavaScript bindings...
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

    // Style sheet bindings...
    self.router.match("GET /stylesheets/style.css", function (request, response) {
      self.router.returnContent(request, response, "./content/assets/stylesheets/style.css", "text/css");
    });

    // Tasks bindings...
    self.router.match("GET /tasks", function (request, response) {
      self.taskActions.getAllTasks(request, response);
    });
    self.router.match("POST /tasks", function (request, response) {
      self.taskActions.createTask(request, response);
    });
    self.router.match(/POST \/tasks\/[a-z0-9]+$/, function (request, response) {
      self.taskActions.editTask(request, response);
    });
    self.router.match(/POST \/tasks\/[a-z0-9]+\/complete$/, function (request, response) {
      self.taskActions.completeTask(request, response);
    });
    self.router.match(/DELETE \/tasks\/[a-z0-9]+$/, function (request, response) {
      self.taskActions.deleteTask(request, response);
    });
  };

  /**
   * Overrides the default toString() function, providing something actually useful.
   */
  self.toString = function () {
    return "Route Configuration. Number of routes: " + self.router.getNumberOfRoutes();
  };

};

module.exports = RouteConfig;
