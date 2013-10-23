#!/usr/bin/env node
var Server = require("./server").Server;

// Create a new server instance. Connect and start.
var server = new Server();
server.connect("amqp://localhost", "nodejs.demo.addition", function (error, server) {
  server.start(function (data, done) {
    console.log(" [x] Inside request callback");

    // Let's make this take a while.
    var durationInMs = parseInt(Math.random() * 30000, 10);
    setTimeout(function () {
      sum = data.x + data.y;
      done({ sum: sum });
    }, durationInMs);
  });
});