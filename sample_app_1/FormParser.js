var FormParser = function (querystring, request) {

  if (!querystring) {
    throw "Undefined argument: querystring";
  }
  if (!request) {
    throw "Undefined argument: request";
  }

  var self = this;
  self.querystring = querystring;
  self.request = request;
  self.body = "";
  self.obj = {};

  self.getObject = function (callback) {
    self.request.on("data", function (chunk) {
      self.body += chunk;
    });
    self.request.on("end", function () {
      self.obj = self.querystring.parse(self.body);
      if (callback) {
        callback(self.obj);
      }
    });
  };

};

module.exports = FormParser;