var assert = require("assert");
var RouteConfig = require("../RouteConfig");

describe("RouteConfig", function () {
  
  describe("#toString", function () {

    it("produces the expected string", function (done) {
      var router = {
        getNumberOfRoutes: function () { return 0; }
      };
      var rc = new RouteConfig(router);
      var result = rc.toString();
      assert.equal("Route Configuration. Number of routes: 0", result);
      done();
    });

  });

});

