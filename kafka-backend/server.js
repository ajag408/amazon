const connection = require('./kafka/Connection');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
require('./models');

const userService = require('./services/user');
const admin = require('./services/admin');
const cartService = require('./services/cart');
const productService = require('./services/product');
const sellerService = require('./services/seller');
const orderService = require('./services/order');
const customerService = require('./services/customer');

function handleTopicRequest(topic_name, fname) {

  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();

  console.log('server is running ');

  consumer.on('message', (message) => {
    console.log(`message received for ${topic_name} `, fname);
    //console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);
    console.log(fname);
    console.log("Data is: ",data);
    fname.handle_request(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (dataBack) => {
        console.log("Data sending back: " ,dataBack);
      });
    });
  });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('user', userService);
handleTopicRequest('cart', cartService);
handleTopicRequest('admin', admin);
handleTopicRequest('product', productService);
handleTopicRequest('seller', sellerService);
handleTopicRequest('order', orderService);
handleTopicRequest('customer', customerService);
