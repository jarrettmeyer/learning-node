var Router = function (fs) {

  // Pre-conditions.
  if (!fs) {
    throw "Undefined argument: fs";
  }

  // Variable declarations.
  var self = this;
  self.fs = fs;
  self.matches = {};

  self.findMatch = function (url) {
    var keys = Object.keys(self.matches);
    for (var i = 0, len = keys.length; i < len; i += 1) {
      var pattern = keys[i];
      if (self.isRegExp(pattern)) {
        pattern = self.toRegExp(pattern);
      }
      if (self.isMatch(url, pattern)) {
        return self.matches[pattern];
      }
    }
    return null;
  };

  self.isMatch = function (url, pattern) {
    //console.log("Testing URL " + url + " against pattern " + pattern + ".");
    if (typeof pattern === "string" && url === pattern) {
      return true;
    }
    if (typeof pattern === "object" && url.match(pattern)) {
      return true;
    }
    return false;
  };

  self.isRegExp = function (value) {
    return value[0] === "/" && value[value.length - 1] === "/";
  };

  self.match = function (pattern, callback) {
    self.matches[pattern] = callback;
  };

  self.onRequest = function (request, response) {
    var method = request.method;
    var url = request.url;
    var requestedPattern = method + " " + url;
    //console.log("Incoming request for: " + requestedPattern);
    var match = self.findMatch(requestedPattern);
    if (match) {
      match(request, response);
    } else {
      self.return404Error(requestedPattern, response);
    }
  };

  self.returnBinaryContent = function (request, response, filename, contentType) {
    self.fs.readFile(filename, function (error, data) {
      if (error) {
        console.error(error);
        response.writeHead(500, { "Content-type": "text/html" });
        response.end(error);
        return;
      }
      response.writeHead(200, { "Content-type": contentType });
      response.end(data, "binary");
    });
  };

  self.returnContent = function (request, response, filename, contentType) {
    if (!contentType) {
      contentType = "text/html";
    }
    self.fs.readFile(filename, "utf8", function (error, data) {
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

  self.toRegExp = function (string) {
    string = string.substring(1, string.length - 1);
    return new RegExp(string);
  };
};

module.exports = Router;