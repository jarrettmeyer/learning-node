qs = require("querystring")

class FormParser
  constructor: (request) ->
    @request = request
    @body = ""
    @obj = {}

  getObject: (callback) ->
    @request.on("data", (chunk) =>
      @body += chunk
    )
    @request.on("end", () =>
      pairs = @body.split(/&/)
      @obj = qs.parse(@body)
      callback(@obj)
    )

module.exports = FormParser