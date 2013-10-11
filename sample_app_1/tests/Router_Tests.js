var assert = require("assert");
var Router = require("../Router");

var emptyFunction = function () { };

var fs = {
  readFile: function (error, data) {

  }
};

describe("Router", function () {

  describe("#constructor", function () {

    it("has no matches", function (done) {
      var router = new Router(fs);
      assert.ok(router.matches);
      assert.equal(0, Object.keys(router.matches).length);
      done();
    });

    it("should throw an error if no fs is defined", function (done) {
      try {
        new Router();
      } catch (e) {
        assert.equal("Undefined argument: fs", e);
        done();
      }
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
      var router = new Router(fs);
      for (var i = 0, len = testRoutes.length; i < len; i += 1) {
        var testRoute = testRoutes[i];
        var result = router.isMatch(testRoute, pattern);
        assert.ok(result);
      }
      done();
    });

    it("can match a string", function (done) {
      var pattern = "GET /index.html";
      var router = new Router(fs);
      var result = router.isMatch("GET /index.html", pattern);
      assert.ok(result);
      done();
    });

  });

  describe("#match", function () {

    var router;

    beforeEach(function (done) {
      router = new Router("fs");
      done();
    });

    it("adds a match to the router", function (done) {
      router.match("GET /index.html", emptyFunction);
      var keys = Object.keys(router.matches);
      assert.equal(1, keys.length);
      assert.equal("GET /index.html", keys[0]);
      done();
    });

  });

  describe("#onRequest", function () {

    var isMatched, request, response, router, simpleCallback;

    beforeEach(function (done) {
      isMatched = false;
      router = new Router("fs");
      request = { method: "GET", url: "" };
      response = {};
      simpleCallback = function (request, response) {
        isMatched = true;
      };

      router.match("GET /", simpleCallback);
      router.match("GET /tasks", simpleCallback);
      router.match(/GET \/tasks\/[a-z0-9]+$/, simpleCallback);

      done();
    });

    it("can match GET /", function (done) {
      request.url = "/";
      router.onRequest(request, response);
      assert.ok(isMatched);
      done();
    });

    it("can match GET /tasks", function (done) {
      request.url = "/tasks";
      router.onRequest(request, response);
      assert.ok(isMatched);
      done();
    });

    it("can match a regular expression", function (done) {
      request.url = "/tasks/a1b2c3d4e5f6g7h8";
      router.onRequest(request, response);
      assert.ok(isMatched);
      done();
    });

  });

  describe("#returnBinaryContent", function () {

    it("appends 'binary' to end call", function (done) {

      var isBinary = false;
      var testData;

      var fs = {
        readFile: function (filename, callback) {
          callback(null, "this is a test");
        }
      };

      var router = new Router(fs);
      var fakeRequest =  { };
      var fakeResponse = {
        writeHead: function () {},
        end: function(data, test) {
          testData = data;
          isBinary = (test === "binary");
        }
      };

      // Act
      router.returnBinaryContent(fakeRequest, fakeResponse, "./some/path", "image/png");
      assert.ok(isBinary);
      done();
    });

    it("writes expected content to end", function (done) {
      done();
    });
  });
});
