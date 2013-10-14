var uuid = require("node-uuid").v4;
var queueSocket = "amqp://localhost";
var queueName = "nodejs.demo.addition";
var encoding = "utf8";
var x = parseInt(process.argv[2], 10);
var y = parseInt(process.argv[3], 10);

var context = require("rabbit.js").createContext(queueSocket);
console.log(" [x] Created context");

context.on("ready", function () {
  console.log(" [x] Context is ready");

  // Create the request socket.
  var req = context.socket("REQ");
  console.log(" [x] Created request socket");

  // This callback will be invoked when a reply comes
  // back from the queue.
  req.on("data", function (message) {
    console.log(" [x] Received response: %s", message);

    var data = JSON.parse(message);
    console.log("     id: %s", data.id);
    console.log("     x: %s, y: %s", data.x, data.y);
    console.log("     sum: %s", data.sum);

    // Close the context.
    context.close();
    console.log(" [x] Context was closed");
  });

  // Connect to the queue.
  req.connect(queueName, function () {
    console.log(" [x] Connected to queue: %s", queueName);

    // Write the request to the queue.
    var data = { id: uuid(), x: x, y: y };
    var content = JSON.stringify(data);
    req.write(content, encoding);
    console.log(" [x] Sent request: x: %s, y: %s", data.x, data.y);
  });
});
