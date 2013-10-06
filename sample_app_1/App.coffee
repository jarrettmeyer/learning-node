http = require("http")
Router = require("./Router")

class App
  constructor: () ->
    @router = new Router()
    @initializeRoutes()

  initializeRoutes: () ->
    console.log("Initializing routes.")
    @router.match("GET /", (request, response) =>
      @router.returnContent(request, response, "./content/index.html")
    )
    @router.match("GET /javascripts/script.js", (request, response) =>
      @router.returnContent(request, response, "./content/assets/javascripts/script.js", "text/javascript")
    )
    @router.match("GET /javascripts/jquery-2.0.3.min.js", (request, response) =>
      @router.returnContent(request, response, "./content/assets/javascripts/jquery-2.0.3.min.js", "text/javascript")
    )
    @router.match("GET /stylesheets/style.css", (request, response) =>
      @router.returnContent(request, response, "./content/assets/stylesheets/style.css", "text/css")
    )
    @router.match("GET /tasks", (request, response) =>
      data = []
      @router.returnJson(request, response, data)
    )

  start: (port) ->
    @port = port
    console.log("Starting server on port #{@port}.")
    server = http.createServer((request, response) =>
      @router.onRequest(request, response)
    )
    server.listen(@port)


module.exports = App
