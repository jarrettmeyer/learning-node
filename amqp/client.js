var amqp = require("amqp");
var uuid = require("node-uuid").v4;

var Client = function (url, queueName) {

  // Local variable declarations.
  this.connection = null;
  this.sent = {};

  /**
   * Connect to the AMQP server.
   */
  this.connect = function (url, queueName, onConnected) {
    this.queueName = queueName;
    this.onConnected = onConnected;

    var isConnectionReady = false;

    if (!this.connection) {

      // Set connection options.
      var connectionOptions = {
        defaultExchangeName: ""
      };

      // Create a new connection.
      this.connection = amqp.createConnection({ url: url }, connectionOptions);

      // Bind a callback when the connection is ready.
      this.connection.on("ready", function () {
        if (!isConnectionReady) {
          console.log(" [x] Connection ready");
          isConnectionReady = true;
          this.openQueue();
        }
      }.bind(this));

      // Bind a callback when there is a connection error.
      this.connection.on("error", function (error) {
        this.connection.end();
        this.onConnected(error, this);
      }.bind(this));
    }
  };

  /**
   * Disconnect the client.
   */
  this.disconnect = function () {
    this.connection.end();
  };

  /**
   * Send a message to the AMQP server.
   */
  this.send = function(message, onReply) {
    console.log(" [x] Sending message: " + JSON.stringify(message));

    // Generate a UUID to be used for the correlation ID.
    var id = uuid();

    // Save the callback for later use.
    this.sent[id] = {
      message: message,
      onReply: onReply
    };

    // Publish the method to the queue.
    var publishOptions = {
      correlationId: id,
      replyTo: this.privateQueue.name,
      timestamp: Date.now().toString()
    };
    this.connection.publish(this.queueName, message, publishOptions);
  };

  /**
   * Open the queue.
   */
  this.openQueue = function() {

    // Open the queue.
    var queueOptions = {
      durable: true,
      autoDelete: false
    };
    console.log(" [x] Opening queue '%s'", this.queueName);
    this.connection.queue(this.queueName, queueOptions, function (queue) {
      console.log(" [x] Queue '%s' is open", queue.name);

      // Once the main queue is open, open a private queue. The AMQP server
      // will generate a random name for this private queue. This is where
      // replies will be sent.
      this.connection.queue("", function (privateQueue) {
        console.log(" [x] Private queue '%s' is open", privateQueue.name);
        this.privateQueue = privateQueue;

        // Subscribe to messages received to the private queue.
        privateQueue.subscribe({ }, function (message, headers, deliveryInfo) {

          // Find the handler for the given correlation ID. Invoke
          // the handler and delete it.
          var handler = this.sent[deliveryInfo.correlationId];
          handler.onReply(message);
          delete this.sent[deliveryInfo.correlationId];

        }.bind(this));

        // Tell the caller we are connected.
        this.onConnected(null, this);
      }.bind(this));
    }.bind(this));
  };

};

module.exports = {
  Client: Client
};