var assert = require("assert");
var App = require("../App");

function assertRoute(url) {
  var app = new App();
  var route = app.router.findMatch(url);
  assert.ok(typeof route === "function");
}

describe("App", function () {

  describe("#constructor", function () {

    it("can create a new instance", function (done) {
      var app = new App();
      assert.ok(app);
      done();
    });

    it("has a route for 'GET /'", function (done) {
      assertRoute("GET /");
      done();
    });

    it("has a route for 'GET /tasks'", function (done) {
      assertRoute("GET /tasks");
      done();
    });

    it("has a route for 'POST /tasks'", function (done) {
      assertRoute("POST /tasks");
      done();
    });

    it("has a route for 'POST /tasks/1", function (done) {
      assertRoute("POST /tasks/1");
      done();
    });

    it("has a route for 'POST /tasks/123", function (done) {
      assertRoute("POST /tasks/123");
      done();
    });

    it("should declare a new instance of task storage", function (done) {
      var app = new App();
      assert.ok(app.taskStorage);
      done();
    });

    it("allows for an alternate definition of task storage", function (done) {
      var testTaskStorage = {
        getTasks: function () { },
        isTest: true
      };
      var app = new App(testTaskStorage);
      assert.ok(app.taskStorage.isTest);
      done();
    });

  });
});