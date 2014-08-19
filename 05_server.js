var queueSocket = "amqp://localhost";
var queueName = "nodejs.demo.addition";
var encoding = "utf8";

// Create a new context.
var context = require("rabbit.js").createContext(queueSocket);
console.log(" [x] Created context");

// When the context is open...
context.on("ready", function () {
  console.log(" [x] Context is ready");

  // Create a reply socket.
  var rep = context.socket("REP");
  console.log(" [x] Created reply socket");

  // The following callback will be invoked when a request is sent to the queue.
  rep.on("data", function (data) {
    console.log(" [x] Data received: %s", data);
    data = JSON.parse(data);

    // Create the response object and write it to the reply.
    // Adding setTimeout so it purposely takes a long time.
    var durationInMs = parseInt(Math.random() * 10000, 10);
    setTimeout(function () {
      var response = { id: data.id, x: data.x, y: data.y, sum: data.x + data.y };
      var content = JSON.stringify(response);
      rep.write(content, encoding);
    }, durationInMs);
  });

  // Connect the reply socket to the queue.
  rep.connect(queueName, function () {
    console.log(" [x] Connected to queue: %s", queueName);
  });
});