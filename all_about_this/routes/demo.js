var url = require('url');

exports.demo = function(request, response) {
  var urlParts = url.parse(request.url);
  var id = urlParts.pathname.split('/')[2];
  response.render('demo/index', {
    id: id
  });
};
