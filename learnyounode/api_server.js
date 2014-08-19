var http = require("http");
var url = require("url");
var port = Number(process.argv[2]);

function getTime(query) {
  return Date.parse(query["iso"]);
}

function parseTime(inDate) {
  var dt = new Date(inDate);
  return {
    "hour": dt.getHours(),
    "minute": dt.getMinutes(),
    "second": dt.getSeconds()
  };
}

function unixTime(inDate) {
  return {
    "unixtime": inDate
  };
}

function writeResponse(response, obj) {
  response.writeHead(200, { "content-type": "application/json" });
  response.write(JSON.stringify(obj));
  response.end();
}

var server = http.createServer(function (request, response) {

  var parsedUrl = url.parse(request.url, true);

  switch (parsedUrl.pathname) {
    case "/api/parsetime":
      var time = getTime(parsedUrl.query);
      var obj = parseTime(time);
      writeResponse(response, obj);
      break;
    case "/api/unixtime":
      var time = getTime(parsedUrl.query);
      var obj = unixTime(time);
      writeResponse(response, obj);
      break;
    default:
      response.writeHead(404, { "content-type": "text/plain" });
      response.write("404: Not Found");
      response.end();
      break;
  }

});
server.listen(port);
