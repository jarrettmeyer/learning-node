fs = require("fs")

class Router
  self = this

  constructor: (request, response) ->
    @request = request
    @response = response
    @matches = {}

  findMatch: (requestedUrl) ->
    for pattern in Object.keys(@matches)
      if requestedUrl == pattern || requestedUrl.match(pattern)
        return @matches[pattern]
    return null

  match: (requestedUrlPattern, callback) ->
    @matches[requestedUrlPattern] = callback

  onRequest: (request, response) ->
    method = request.method
    url = request.url
    requestedUrl = "#{method} #{url}"
    console.log("Trying to find match for: #{requestedUrl}.")
    match = @findMatch(requestedUrl)
    if match
      match(request, response)
    else
      @return404Error(requestedUrl, response)

  return200Content: (request, response, filename, contentType) ->
    contentType ?= "text/html"
    console.log("Serving file #{filename} as #{contentType}.")
    fs.readFile(filename, "utf8", (error, data) ->
      if error
        console.error("Unable to read file: #{filename}.")
        response.writeHead(500, { "Content-type": "text/html" })
        response.end(error)
      else
        response.writeHead(200, { "Content-type": contentType })
        response.end(data)
    )

  return404Error: (requestedUrl, response) ->
    console.error("Sending 404 for request: #{requestedUrl}.")
    response.writeHead(404, { "Content-type": "text/html" })
    response.end("Page not found: #{requestedUrl}")

module.exports = Router