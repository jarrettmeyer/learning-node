http = require "http"

defaults = {
  port: 8080
}

app = {

  serverActivity: (request, response) ->
    console.log "Incoming request for #{request.url}"
    response.writeHead(200, { "Content-type": "text/html" })
    response.end("Hello, World!")

  start: (port) ->
    port ?= defaults.port
    console.log "Starting server on port #{port}"
    server = http.createServer(app.serverActivity)
    server.listen(port)

}


module.exports = app
