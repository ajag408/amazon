const connection = require('./kafka/Connection');
// topics files
require('./../models/index');
const userService = require('./services/user');
// const companyService = require('./services/company');
// const jobService = require('./services/job');
// const applicationService = require('./services/application');
// const eventService = require('./services/event');


//MongoDB connection

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   reconnectTries: Number.MAX_VALUE,
//   reconnectInterval: 500, // Reconnect every 500ms
//   poolSize: 500,
//   bufferMaxEntries: 0,
// };

// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, options, (err) => {
//   if (err) {
//     console.log("new server");
//     console.log('MongoDB Connection Failed');
//   } else {
//     console.log('MongoDB Connected');
//   }
// });


function handleTopicRequest(topic_name, fname) {

  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();

  console.log('server is running ');

  consumer.on('message', (message) => {
    console.log(`message received for ${topic_name} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);
    console.log(fname);
    console.log(data);
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
// handleTopicRequest('company', companyService);
// handleTopicRequest('job', jobService);
// handleTopicRequest('application', applicationService);
// handleTopicRequest('event', eventService);
