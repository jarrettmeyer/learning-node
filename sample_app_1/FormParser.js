var qs = require("querystring");

var FormParser = function (_request) {
  var self = this;

  self.request = _request;
  self.body = "";
  self.obj = {};

  self.getObject = function (callback) {
    self.request.on("data", function (chunk) {
      self.body += chunk;
    });
    self.request.on("end", function () {
      self.obj = qs.parse(self.body);
      if (callback) {
        callback(self.obj);
      }
    });
  };

};

module.exports = FormParser;