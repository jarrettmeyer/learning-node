var fs = require('fs');
var url = require('url');

exports.embed = function(request, response) {
  var urlParts = url.parse(request.url, true);
  var requestedPath = __dirname + '/../public' + urlParts.query['path'];
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  fs.createReadStream(requestedPath, { 'encoding': 'utf8' }).pipe(response);
};
