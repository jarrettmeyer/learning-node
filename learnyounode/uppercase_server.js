var http = require('http');

var port = Number(process.argv[2]);

var server = http.createServer(function (request, response) {

  if (request.method !== "POST") {
    return response.end("Not a POST request.");
  }

  var body = "";

  request.on("data", function (chunk) {
    body += chunk.toString();
  });

  request.on("end", function () {
    var content = body.toUpperCase();
    response.writeHead(200, { "content-type": "text/plain" });
    response.write(content);
    response.end();
  });

});
server.listen(port);
