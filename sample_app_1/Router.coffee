fs = require("fs")

class Router
  constructor: (request, response) ->
    @request = request
    @response = response
    @matches = {}

  findMatch: (requestedUrl) ->
    for pattern in Object.keys(@matches)
      if @isMatch(requestedUrl, pattern)
        return @matches[pattern]
    return null

  isMatch: (url, pattern) ->
    if (typeof pattern == "string" && url == pattern)
      return true
    if (typeof pattern == "object" && url.match(pattern))
      return true
    return false

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

  returnContent: (request, response, filename, contentType) ->
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

  returnJson: (request, response, data) ->
    console.log("Serving JSON")
    response.writeHead(200, { "Content-type": "application/json" })
    response.end(JSON.stringify(data))

  return404Error: (requestedUrl, response) ->
    console.error("Sending 404 for request: #{requestedUrl}.")
    response.writeHead(404, { "Content-type": "text/html" })
    response.end("Page not found: #{requestedUrl}")

module.exports = Router