'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const basename = path.basename(__filename);

const db = {};

const mysqlOptions = {
  host: 'amazon.cmnzxnadxz9j.us-west-1.rds.amazonaws.com',
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
  sequelize = new Sequelize('amazon', 'admin', 'Z2SL6Dy9KcbyEBXQQjHX', mysqlOptions);
  console.log(`Mysql Connected`);
}catch(err){
  console.log(err);
  console.log(`Mysql Connection Failed`);
}

const mongoDbOptions = {
  useCreateIndex: true,
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
  return;
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
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.mongoose = mongoose;

module.exports = db;