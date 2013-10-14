var queueSocket = "amqp://localhost";
var queueName = "nodejs.demo.messages";
var encoding = "utf8";

var context = require("rabbit.js").createContext(queueSocket);
console.log(" [x] Created context %s", queueSocket);

context.on("ready", function () {
  console.log(" [x] Context is ready");

  var sub = context.socket("SUB");
  sub.connect(queueName, function () {
    console.log(" [x] Connected");
    sub.on("data", function (data) {
      console.log(" [x] Received data: %s", data);
    });
  });
});
