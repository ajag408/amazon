

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const { secret } = require('../../backend/database/db');
const User = require('../models/user');
const Customer = require('../models/customer');
const Seller = require('../models/seller');
//const UserSchema = require('../../models/user');

//const User = mongoose.model('User', UserSchema)
// const CustomerSchema = require('../../models/customer');




// studentAuth();



// function createStudent(msg, callback){
function handle_request(msg, callback) {
  if (msg.path === 'new-user') {
    // console.log("in service", msg);
    // console.log(" Model " ,User);
    msg.emailId = msg.email;
  

    User.create(msg, (err, data) => {
        console.log("in mongoose callback")
        if (err) { 
          err.type = "User";    
          callback(null, err);
        } else {
          msg.user = data._id;
          console.log("message: ", msg);
          if(msg.role === "Customer"){
            Customer.create(msg, (err,data) => {
              if (err) { 
                err.type = "Customer"   
                console.log(err); 
                callback(null, err);
              } else {
                console.log("KafkaBackend  => create Customer ", data);
                callback(null, data);
              }
            });
          } else if (msg.role === "Seller"){
            Seller.create(msg, (err,data) => {
              if (err) { 
                err.type = "Seller";    
                callback(null, err);
              } else {
                console.log("KafkaBackend  => create Seller ", data);
                callback(null, data);
              }
            });
          } else {
            console.log("User is Admin");    
            callback(null, data);
          }
        }
      });
  }
   else if (msg.path === 'login') {

    User.findOne({ emailId: msg.email }, (error, user) => {
      console.log(user);
      if (error) {
        console.log(error);
        callback(null, error);
      } else if (user == null) {
        callback(null, 'No user with that email');
      } else {
            console.log(user.is_password_valid(msg.password))
            if (!user.is_password_valid(msg.password)) {
              callback(null, 'Password invalid');
            } else {
              const payload = { _id: user._id, role:user.role };
              const token = jwt.sign(payload, secret, {
                expiresIn: 1008000,
              });

              const data = {

                token: `JWT ${token}`,
              };
              callback(null, data);
            }
      }
    });
  } 
}
// }

exports.handle_request = handle_request;
