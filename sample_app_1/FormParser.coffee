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
      for pair in pairs
        parts = pair.split(/\=/)
        if parts.length > 1
          @obj[parts[0]] = parts[1]
      callback(@obj)
    )

module.exports = FormParser