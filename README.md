# Just me, learning NodeJS

## Sample App #1

To run Sample App #1...

    $ cd ./sample_app_1
    $ node ./server.js

To stop the sample app, use `CTRL-c`.

### Unit Tests

The unit tests for Sample App #1 are written in [Mocha](http://mochajs.org/). To run the unit tests for Sample App #1...

    $ npm install -g mocha
    $ cd ./sample_app_1
    $ ./run_tests.sh

## RabbitMQ Pub/Sub

The AMQP examples run in 2 different windows. In the first terminal window...

    $ node ./04_receive.js

In the second terminal window...

    $ node ./04_send.js This is my message.

## RabbitMQ Request/Reply

In terminal one...

    $ node ./05_server.js

In terminal two...

    $ node ./05_client.js 7 12
      [x] Created context
      [x] Context is ready
      [x] Created request socket
      [x] Connected to queue: nodejs.demo.addition
      [x] Sent request: x: 7, y: 12
      [x] Received response: {"id":"e998ee40-c4da-4004-aac5-c160ccd34a14","x":7,"y":12,"sum":19}
          id: e998ee40-c4da-4004-aac5-c160ccd34a14
          x: 7, y: 12
          sum: 19
      [x] Context was closed

