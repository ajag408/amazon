

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const { secret } = require('../../backend/database/db');
const User = require('../models/user');
const Customer = require('../models/customer');
const Seller = require('../models/seller');


function handle_request(msg, callback) {
  if (msg.path === 'getProfileData') {
    //msg.emailId = msg.email;
  
  //Seller.find().populate('user').exec((err, categories) => {

  User.findOne({_id: msg.userId}, (err, user) => {
    var res = {};
    if (err) {
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }
    else if(user){
      //res.status = 409;

      Seller.findOne({user: user._id}).populate('user').exec((err, seller) =>{
        if(err){
          res.status = 500;
          res.message = "Database Error";
          callback(null, res);
        } else if(seller){
          res.status = 200;
          seller.user.password = undefined;
          seller.user.salt = undefined;
          res.message = seller;
          callback(null,res);
        } else {
          res.status = 204;
          res.message = "User not found";
          callback(null,res);
        }
      })
    }
})  
}
   else if (msg.path === 'updateBasicDetails') {
    console.log(msg)
    var res = {};
    Seller.updateOne({user : msg.userId} , 
       {
           $set : {name : msg.updatedName, addresses : msg.updatedAddress}
    } ,
        (error, success)=> {
            if(error) {
                res.message = error.message;
                res.status = 400;
                callback(null,res);
            } else if(success.n > 0){
                console.log("Seller Profile updated")
                res.message = "Seller Profile updated";
                res.status = 200;
                callback(null,res);
            } else {
                res.message = "User Not Found";
                res.status = 400;
                callback(null,res);
            }  
        })   
  } 
}
// }

exports.handle_request = handle_request;
