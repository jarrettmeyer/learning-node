var fs = require("fs");

var Router = function () {
  var self = this;
  self.matches = {};

  self.findMatch = function (url) {
    var keys = Object.keys(self.matches);
    for (var i = 0, len = keys.length; i < len; i += 1) {
      var pattern = keys[i];
      if (self.isMatch(url, pattern)) {
        return self.matches[pattern];
      }
    }
    return null;
  };

  self.isMatch = function (url, pattern) {
    if (typeof pattern === "string" && url === pattern) {
      return true;
    }
    if (typeof pattern === "object" && url.match(pattern)) {
      return true;
    }
    return false;
  };

  self.match = function (pattern, callback) {
    self.matches[pattern] = callback;
  };

  self.onRequest = function (request, response) {
    var method = request.method;
    var url = request.url;
    var requestedPattern = method + " " + url;
    //console.log("Trying to find route match for: " + requestedPattern);
    var match = self.findMatch(requestedPattern);
    if (match) {
      match(request, response);
    } else {
      self.return404Error(requestedPattern, response);
    }
  };

  self.returnContent = function (request, response, filename, contentType) {
    if (!contentType) {
      contentType = "text/html";
    }
    fs.readFile(filename, "utf8", function (error, data) {
      if (error) {
        response.writeHead(500, { "Content-type": "text/html" });
        response.end(error);
        return;
      }
      response.writeHead(200, { "Content-type": contentType });
      response.end(data);
    });
  };

  self.returnEmpty = function (request, response) {
    response.writeHead(200, { "Content-type": "text/html" });
    response.end("");
  };

  self.returnJson = function (request, response, data) {
    var content = JSON.stringify(data);
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(content);
  };

  self.return404Error = function (requestedPattern, response) {
    console.error("Sending 404 for requested pattern: " + requestedPattern);
    response.writeHead(404, { "Content-type": "text/html" });
    response.end("Page not found: " + requestedPattern);
  };
};

module.exports = Router;