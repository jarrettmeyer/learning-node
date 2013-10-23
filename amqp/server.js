var amqp = require("amqp");

/**
 * Defines the server class.
 */
var Server = function () {

  // Local variable declarations.
  this.onRequest = null;

  /**
   * Connect to the server.
   */
  this.connect = function (url, queueName, onConnected) {
    this.queueName = queueName;
    this.onConnected = onConnected;

    var isConnectionReady = false;

    // Connect to the AMQP server.
    var connectionOptions = {
      defaultExchangeName: ""
    };
    this.connection = amqp.createConnection({ url: url }, connectionOptions);

    // Bind server events.
    this.connection.on("ready", function () {
      if (!isConnectionReady) {
        console.log(" [x] Connection ready");
        isConnectionReady = true;
        this.openQueue();
      }
    }.bind(this));

    // Bind connection error events.
    this.connection.on("error", function (error) {
      this.connection.end();
      this.onConnected(error, this);
    }.bind(this));
  };

  /**
   * Open the queue and subscribe to messages.
   */
  this.openQueue = function() {
    console.log(" [x] Opening queue '%s'", this.queueName);

    // Set queue options.
    var queueOptions = {
      durable: true,
      autoDelete: false
    };

    // Open the queue
    this.queue = this.connection.queue(this.queueName, queueOptions, function (queue) {

      // Subscribe to queue events.
      queue.subscribe({}, function (message, headers, deliveryInfo) {
        console.log(" [x] Received message...");
        console.log("       Message:        %s", JSON.stringify(message));
        console.log("       Content-type:   %s", deliveryInfo.contentType);
        console.log("       Correlation ID: %s", deliveryInfo.correlationId);
        console.log("       Reply-to Queue: %s", deliveryInfo.replyTo);

        // Set publish options.
        var publishOptions = {
          correlationId: deliveryInfo.correlationId,
          timestamp: Date.now().toString()
        };

        // Invoke the request callback when a message is received.
        // Send the response back through the reply callback.
        console.log(" [x] Invoking request callback");
        this.onRequest(message, function (reply) {
          console.log(" [x] Sending reply (" + publishOptions.correlationId + "): " + JSON.stringify(reply));
          this.connection.publish(deliveryInfo.replyTo, reply, publishOptions);
        }.bind(this));
      }.bind(this));

      // Notify the caller that the server is connected.
      console.log(" [x] Queue '%s' is open", queue.name);
      this.onConnected(null, this);

    }.bind(this));
  };

  this.start = function (onRequest) {
    this.onRequest = onRequest;
  };
};

module.exports = {
  Server: Server
};