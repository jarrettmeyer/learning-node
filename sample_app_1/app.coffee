http = require("http")
Router = require("./Router")

paths =
  "GET /":                      { "file": "index.html",             "Content-type": "text/html" },
  "GET /i_dont_exist.html":     { "file": "i_dont_exist.html",      "Content-type": "text/html" },
  "GET /index.html":            { "file": "index.html",             "Content-type": "text/html" },
  "GET /javascripts/script.js": { "file": "javascripts/script.js",  "Content-type": "text/javascript" },
  "GET /stylesheets/style.css": { "file": "stylesheets/style.css",  "Content-type": "text/css" },
  "GET /tasks.js":              { "function": "getTasks",           "Content-type": "application/json" }

class App
  constructor: () ->
    @router = new Router()
    @initializeRoutes()

  initializeRoutes: () ->
    console.log("Initializing routes.")
    @router.match("GET /", (request, response) =>
      @router.return200Content(request, response, "./content/index.html")
    )
    @router.match("GET /javascripts/script.js", (request, response) =>
      @router.return200Content(request, response, "./content/assets/javascripts/script.js", "text/javascript")
    )
    @router.match("GET /stylesheets/style.css", (request, response) =>
      @router.return200Content(request, response, "./content/assets/stylesheets/style.css", "text/css")
    )

  start: (port) ->
    @port = port
    console.log("Starting server on port #{@port}.")
    server = http.createServer((request, response) =>
      @router.onRequest(request, response)
    )
    server.listen(@port)


module.exports = App
