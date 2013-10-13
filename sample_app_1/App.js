var fs = require("fs");
var http = require("http");
var Router = require("./Router");
var RouteConfig = require("./RouteConfig");
var TaskActions = require("./TaskActions");

var App = function () {

  var self = this;
  self.router = new Router(fs);
  self.routeConfig = new RouteConfig(self.router);

  self.start = function (port) {
    self.routeConfig.configure(self);
    var server = http.createServer(self.router.onRequest);
    server.listen(port);
  };

};

module.exports = App;
