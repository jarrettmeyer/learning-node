var assert = require("assert");
var UrlParser = require("../UrlParser");

describe("UrlParser", function () {

  describe("#getIdFromUrl", function (){
    it("should get the ID from the URL string", function (done) {

      // Create some test data.
      var tests = {
        "/tasks/123": "123",
        "/tasks/234/complete": "234"
      };
      var testKeys = Object.keys(tests);

      // Loop through the test data.
      for (var i = 0, len = testKeys.length; i < len; i += 1) {

        var url = testKeys[i];
        var expected = tests[url];

        var urlParser = new UrlParser(url);
        var result = urlParser.getIdFromUrl();

        assert.equal(expected, result);
      }
      done();
    });
  });

});