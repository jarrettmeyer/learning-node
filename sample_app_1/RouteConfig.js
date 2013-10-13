var ArgumentUndefinedError = require("./ArgumentUndefinedError");

/**
 * Allows routes to be configured sepratately from the rest of the application.
 * @param {Router} router
 */
var RouteConfig = function (router) {

  if (!router) {
    throw new error.ArrgumentError("router");
  }

  // Variable initialization
  var self = this;
  self.router = router;

  // Route Configuration

  /**
   * Overrides the default toString() function, providing something actually useful.
   */
  self.toString = function () {
    return "Route Configuration. Number of routes: " + self.router.getNumberOfRoutes();
  };

};

module.exports = RouteConfig;
