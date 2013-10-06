fs = require("fs")
http = require("http")

defaults =
  contentFolder:  "./content",
  encoding:       "utf8",
  port:           8080

paths =
  "GET /":                      { "file": "index.html",             "Content-type": "text/html" },
  "GET /i_dont_exist.html":     { "file": "i_dont_exist.html",      "Content-type": "text/html" },
  "GET /index.html":            { "file": "index.html",             "Content-type": "text/html" },
  "GET /javascripts/script.js": { "file": "javascripts/script.js",  "Content-type": "text/javascript" },
  "GET /stylesheets/style.css": { "file": "stylesheets/style.css",  "Content-type": "text/css" },
  "GET /tasks.js":              { "function": "getTasks",           "Content-type": "application/json" }

app =

  isFileContent: (contentType) ->
    contentType == "text/html" || contentType == "text/css" || contentType == "text/javascript"

  return200Content: (key, response, data) ->
    response.writeHead(200, { "Content-type": paths[key]["Content-type"] })
    response.end(data)

  return404Error: (key, response) ->
    console.error("Sending 404 for request: #{key}")
    response.writeHead(404, { "Content-type": "text/html" })
    response.end("Page not found: #{key}")

  return500Error: (error, response) ->
    console.error(error)
    response.writeHead(500, { "Content-type": "text/html" })
    response.end("Server error: #{error}")

  serverActivity: (request, response) ->
    key = "#{request.method} #{request.url}"
    console.log("----- #{new Date()}: incoming request #{key}.")
    if paths[key] && app.isFileContent(paths[key]["Content-type"])
      file = "#{defaults.contentFolder}/#{paths[key]["file"]}"
      console.log("Serving file: #{file}.")
      fs.readFile(file, defaults.encoding, (error, data) ->
        if error
          app.return500Error(error, response)
        else
          app.return200Content(key, response, data)
      )
    else
      app.return404Error(key, response)

  start: (port) ->
    port ?= defaults.port
    console.log("Starting server on port #{port}")
    server = http.createServer(app.serverActivity)
    server.listen(port)


module.exports = app
