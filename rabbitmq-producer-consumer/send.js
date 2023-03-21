#!/usr/bin/env node

var amqp = require('amqplib/callback_api');



amqp.connect({
    hostname : "localhost",
    port:5672,
    username : "admin",
    password : "admin"
}, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: false
    });


    setInterval(function() {
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
        }, 0);
  });
});


