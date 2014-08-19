// Requires.
var http = require("http");
var fs = require("fs");

// Arguments.
var port = Number(process.argv[2]);
var file = process.argv[3];

var server = http.createServer(function (request, response) {

  response.writeHead(200, { "content-type": "text/plain" });
  fs.createReadStream(file, { encoding: "utf8" }).pipe(response);

});
server.listen(port);
