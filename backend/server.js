const express = require('express');
const mongoose = require('mongoose');
const createError = require('createerror');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const dbConfig = require('./database/db');
require('dotenv').config();

const mysql = require('mysql');

// Routes - replace with your route file in route folder
const userRoute = require('./routes/user.route');
const admin = require('./routes/admin');
const cartRoute = require('./routes/cart.route');
const productRoute = require('./routes/product.route');
const sellerRoute = require('./routes/seller.route');
const orderRoute = require('./routes/order.route');
const customerRoute = require('./routes/customer.route');

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
app.use('/users', userRoute);
app.use('/admin', admin);
app.use('/cart', cartRoute);
app.use('/product', productRoute);
app.use('/seller', sellerRoute);
app.use('/order', orderRoute);
app.use('/customer', customerRoute);

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
