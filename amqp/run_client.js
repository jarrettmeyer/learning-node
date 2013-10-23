#!/usr/bin/env node

// Requires
var Client = require("./client").Client;

// A helper function to generate random values.
var getValue = function () {
  return parseInt(Math.floor(Math.random() * 50) + 1, 10);
};

// Create a new client.
var client = new Client();

// Connect to the AMQP server.
client.connect("amqp://localhost", "nodejs.demo.addition", function (error, client) {

  // If there was an error, let's see it.
  if (error) {
    throw error;
  }

  // Set some x & y values.
  var x = getValue();
  var y = getValue();

  // Send a message and wait for a reply.
  // Disconnect when the reply comes back.
  client.send({ x: x, y: y }, function (reply) {
    console.log(" [x] The sum of " + x + " and " + y + " is " + reply.sum);
    client.disconnect();
  });

});
