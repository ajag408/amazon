const express = require('express');
const mongoose = require('mongoose');
const createError = require('createerror');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const dbConfig = require('./database/db');

const mysql = require('mysql');

// Routes - replace with your route file in route folder
// const userRoute = require('./routes/user.route');
// const admin = require('./routes/admin');
// const cartRoute = require('./routes/cart.route');
const productRoute = require('./routes/product.route');
// mongoose.set('debug', true);
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
    console.log(mongoDbOptions.poolSize);
      console.log(`MongoDB Connected`);
  }
  return;
});

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'cmpe_273_secure_string',
  resave: true,
  saveUninitialized: true,
}));


// app.use(multer({ dest: "./uploads/"}).single('photo'));

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));

//replace with your routes
// app.use('/users', userRoute);
// app.use('/admin', admin);
// app.use('/cart', cartRoute);
app.use('/product', productRoute);

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(process.env.FRONTEND_URL)
  console.log(`Connected to port ${port}`);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
