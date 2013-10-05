fs = require "fs"
http = require "http"

defaults = {
  contentFolder: "./content",
  encoding: "utf8",
  port: 8080
}

paths = {
  "/": { "file": "index.html", "Content-type": "text/html", "method": "GET" },
  "/index.html": { "file": "index.html", "Content-type": "text/html", "method": "GET" },
  "/stylesheets/style.css": { "file": "stylesheets/style.css", "Content-type": "text/css", "method": "GET" }
}

app = {

  return200Content: (url, response, data) ->
    response.writeHead(200, { "Content-type": paths[url]["Content-type"] })
    response.end(data)

  return404Error: (url, response) ->
    console.error("Sending 404 for url: #{url}")
    response.writeHead(404, { "Content-type": "text/html" })
    response.end("Page not found: #{url}")

  return500Error: (error, response) ->
    response.writeHead(500, { "Content-type": "text/html" })
    response.end("Server error: #{error}")

  serverActivity: (request, response) ->
    url = request.url
    method = request.method
    console.log "----- #{new Date()}: incoming #{method} request for #{url}."
    if paths[url] && paths[url]["method"]
      file = "#{defaults.contentFolder}/#{paths[url]["file"]}"
      console.log("Serving file: #{file}.")
      fs.readFile(file, defaults.encoding, (error, data) ->
        if error
          app.return500Error(error, response)
        else
          app.return200Content(url, response, data)
      )
    else
      app.return404Error(url, response)

  start: (port) ->
    port ?= defaults.port
    console.log("Starting server on port #{port}")
    server = http.createServer(app.serverActivity)
    server.listen(port)
    return

}


module.exports = app

