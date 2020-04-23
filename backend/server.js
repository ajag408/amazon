const express = require('express');
const mongoose = require('mongoose');
const createError = require('createerror');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const dbConfig = require('./database/db');

const mysql = require('mysql');


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
//     console.log("old server");
//     console.log('MongoDB Connection Failed');
//   } else {
//     console.log('MongoDB Connected');
//   }
// });

//MySQL connection

// const mc = mysql.createConnection({
//   host: 'fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   port: '3306',
//   user: 'pvgt0ikkvj7xf93e',
//   password: 'lf71yxojh35mybjz',
//   database: 'rqxyzqga475wwky1',
// });

// mc.connect();


// Routes - replace with your route file in route folder
const userRoute = require('./routes/user.route');
// const companyRoute = require('./routes/company.route');
// const jobRoute = require('./routes/jobs.route');
// const applicationRoute = require('./routes/application.route');
// const eventRoute = require('./routes/event.route');



const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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

app.use(cors({ origin: dbConfig.frontendURL, credentials: true }));

//replace with your routes
app.use('/users', userRoute);
// app.use('/companies', companyRoute);
// app.use('/jobs', jobRoute);
// app.use('/applications', applicationRoute);
// app.use('/events', eventRoute);

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
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
