const connection = require('./kafka/Connection');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mongoose = require('mongoose');
// topics files

// let models = require('../models');

const userService = require('./services/user');
// const companyService = require('./services/company');
// const jobService = require('./services/job');
// const applicationService = require('./services/application');
// const eventService = require('./services/event');
// require('./../models/index');
console.log('Environment Variables: ', process.env)

const basename = path.basename(__filename);
const db = {};

const mysqlOptions = {
  host: process.env.MYSQL_DB_HOSTNAME,
  dialect: 'mysql',
  pool: {
    maxConnections: process.env.DB_POOL_MAX || 5,
    minConnections: process.env.DB_POOL_MIN || 1,
    acquire: 30000,
    idle: 10000
  }
}

let sequelize;
try{
  sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USERNAME, process.env.MYSQL_DB_PASSWORD, mysqlOptions);
  console.log(`Mysql Connected`);
}catch(err){
  console.log(err);
  console.log(`Mysql Connection Failed`);
}

const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};
mongoose.connect(process.env.MONGO_DB_URL, mongoDbOptions, (err, res) => {
  if (err) {
      console.log(err);
      console.log(`MongoDB Connection Failed`);
  } else {
      console.log(`MongoDB Connected`);
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    if(file.match(/^order.*/)){
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    }else{
      const model = require(path.join(__dirname, file));
      db[model.modelName] = model;
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.log('associating');
    console.log(db[modelName]);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

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
// handleTopicRequest('company', companyService);
// handleTopicRequest('job', jobService);
// handleTopicRequest('application', applicationService);
// handleTopicRequest('event', eventService);
