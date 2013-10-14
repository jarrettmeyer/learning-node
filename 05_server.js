var queueSocket = "amqp://localhost";
var queueName = "nodejs.demo.addition";
var encoding = "utf8";

var context = require("rabbit.js").createContext(queueSocket);
console.log(" [x] Created context");

context.on("ready", function () {
  console.log(" [x] Context is ready");

  var rep = context.socket("REP");
  console.log(" [x] Created reply socket");

  rep.on("data", function (data) {
    console.log(" [x] Data received: %s", data);
    data = JSON.parse(data);

    var response = {
      id: data.id,
      x: data.x,
      y: data.y,
      sum: data.x + data.y
    };
    var content = JSON.stringify(response);
    rep.write(content, encoding);
  });

  rep.connect(queueName, function () {
    console.log(" [x] Connected to queue: %s", queueName);
  });
});