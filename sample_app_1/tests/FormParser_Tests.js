var assert = require("assert");
var querystring = require("querystring");
var FormParser = require("../FormParser");

describe("FormParser", function () {

  var fakeRequest = {
    on: function (key, callback) {
      switch (key) {
        case "data":
          callback("name=John+Doe&age=30&notes=This+is+a+sample+user+of+the+application.+It+is+provided+solely+for+testing+purposes.");
          break;
        case "end":
          callback();
          break;
      }
    }
  };

  describe("#getObject", function () {
    it("returns the expected object", function (done) {
      var formParser = new FormParser(querystring, fakeRequest);
      formParser.getObject(function (o){
        assert.equal("John Doe", o.name);
        assert.equal(30, o.age);
        done();
      });
    });
  });
});