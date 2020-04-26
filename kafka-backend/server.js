const connection = require('./kafka/Connection');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
require('./models');

const userService = require('./services/user');
const cartService = require('./services/cart');
// const companyService = require('./services/company');
// const jobService = require('./services/job');
// const applicationService = require('./services/application');
// const eventService = require('./services/event');

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
        console.log(dataBack);
      });
    });
  });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('user', userService);
handleTopicRequest('cart', cartService);
// handleTopicRequest('company', companyService);
// handleTopicRequest('job', jobService);
// handleTopicRequest('application', applicationService);
// handleTopicRequest('event', eventService);
