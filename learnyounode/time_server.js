var net = require("net");
var strftime = require("strftime");

// Read arguments...
var port = process.argv[2];

var server = net.createServer(function (socket) {

  var time = strftime("%F %H:%M", new Date());

  socket.write(time);
  socket.write("\n");
  socket.end();

});

server.listen(port);
