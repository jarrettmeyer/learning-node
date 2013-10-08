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
      var router = new Router();
      var result = router.isMatch("POST /tasks/1", /POST \/tasks\/[a-z0-9]{1,16}/);
      assert.ok(result);
      done();
    });

    it("can match a string", function (done) {
      var router = new Router();
      var result = router.isMatch("GET /index.html", "GET /index.html");
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
});
