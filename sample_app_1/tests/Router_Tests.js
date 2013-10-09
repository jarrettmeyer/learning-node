var assert = require("assert");
var Router = require("../Router");

var emptyFunction = function () { };

describe("Router", function () {

  describe("#constructor", function () {
    it("has no matches", function (done) {
      var router = new Router();
      assert.ok(router.matches);
      assert.equal(0, Object.keys(router.matches).length);
      done();
    });
  });

  describe("#isMatch", function () {
    it("can match a regular expression", function (done) {
      var testRoutes = [
        "POST /tasks/1",
        "POST /tasks/12",
        "POST /tasks/1a2b",
        "POST /tasks/aaaabbbbccccdddd"
      ];
      var pattern = /POST \/tasks\/[a-z0-9]{1,16}/;
      var router = new Router();
      for (var i = 0, len = testRoutes.length; i < len; i += 1) {
        var testRoute = testRoutes[i];
        var result = router.isMatch(testRoute, pattern);
        assert.ok(result);
      }
      done();
    });

    it("can match a string", function (done) {
      var pattern = "GET /index.html";
      var router = new Router();
      var result = router.isMatch("GET /index.html", pattern);
      assert.ok(result);
      done();
    });
  });

  describe("#match", function () {
    it("adds a match to the router", function (done) {
      var router = new Router();
      router.match("GET /index.html", emptyFunction);
      var keys = Object.keys(router.matches);
      assert.equal(1, keys.length);
      assert.equal("GET /index.html", keys[0]);
      done();
    });
  });

  describe("#onRequest", function () {
    it("can match GET /", function (done) {
      var router = new Router();
      var isMatched = false;
      router.match("GET /", function (request, response) {
        isMatched = true;
      });
      var request = {
        method: "GET",
        url: "/"
      };
      var response = {};
      router.onRequest(request, response);
      assert.ok(isMatched);
      done();
    });
  });

  describe("#returnBinaryContent", function () {
    it("appends 'binary' to end call", function (done) {
      var isBinary = false;
      var router = new Router();
      var fakeRequest =  { };
      var fakeResponse = {
        writeHead: function () {},
        end: function(data, test) {
          isBinary = (test === "binary");
        }
      };
      setTimeout(function () {
        router.returnBinaryContent(fakeRequest, fakeResponse, "./content/assets/images/pencil.png", "image/png");
        assert.ok(isBinary);
      }, 500);
      done();
    });
  });
});
