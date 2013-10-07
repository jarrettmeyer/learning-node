Router = require("../Router")


exports.canAddMatchToRouter = (test) ->
  test.expect(1)
  router = new Router()
  router.match("GET /index.html", () -> )
  key = Object.keys(router.matches)[0]
  test.equal(key, "GET /index.html")
  test.done()

exports.canCreateNewRouterInstance = (test) ->
  test.expect(1)
  router = new Router()
  test.ok(router, "The router should exist")
  test.done()

exports.routerIsCreatedWithEmptyMatchesObject = (test) ->
  test.expect(1)
  router = new Router()
  test.ok(router.matches)
  test.done()