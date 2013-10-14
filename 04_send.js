var queueSocket = "amqp://localhost";
var queueName = "nodejs.demo.messages";
var message = process.argv.splice(2).join(" ") || "n/a";
var encoding = "utf8";

var context = require("rabbit.js").createContext(queueSocket);
console.log(" [x] Created context %s", queueSocket);

context.on("ready", function () {
  console.log(" [x] Context is ready");

  var pub = context.socket("PUB");
  pub.connect(queueName, function () {
    console.log(" [x] Connected to queue");
    var data = JSON.stringify({ message: message });
    pub.write(data, encoding);
    console.log(" [x] Sent message: %s", message);
    context.close();
    console.log(" [x] Closed context");
  });

});
