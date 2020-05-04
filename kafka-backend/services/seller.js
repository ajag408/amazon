

const mongoose = require('mongoose');
let models = require('../models')
const jwt = require('jsonwebtoken');
const sequelize = require ('sequelize');
const { secret } = require('../../backend/database/db');
const User = require('../models/user');
const Customer = require('../models/customer');
const Seller = require('../models/seller');
const Product = require('../models/product');
let OrderItem = models.OrderItem;


function handle_request(msg, callback) {
//   if (msg.path === 'getProfileData') {
//     //msg.emailId = msg.email;
  
//   //Seller.find().populate('user').exec((err, categories) => {

//   User.findOne({_id: msg.userId}, (err, user) => {
//     var res = {};
//     if (err) {
//       res.status = 500;
//       res.message = "Database Error";
//       callback(null, res);
//     }
//     else if(user){
//       //res.status = 409;

//       Seller.findOne({_id: msg.userId}).populate('user').exec((err, seller) =>{
//         if(err){
//           res.status = 500;
//           res.message = "Database Error";
//           callback(null, res);
//         } else if(seller){
//           res.status = 200;
//           seller.user.password = undefined;
//           seller.user.salt = undefined;
//           res.message = seller;
//           callback(null,res);
//         } else {
//           res.status = 204;
//           res.message = "User not found";
//           callback(null,res);
//         }
//       })
//     }
// })  
// }

  if (msg.path === 'getProfileData') {
    var res = {};
    Seller.findOne({ _id: msg.userId }).populate('user').exec((err, seller) => {
      if (err) {
        res.status = 500;
        res.message = "Database Error";
        callback(null, res);
      } else if (seller) {
        res.status = 200;
        seller.user.password = undefined;
        seller.user.salt = undefined;
        res.message = seller;
        callback(null, res);
      } else {
        res.status = 204;
        res.message = "User not found";
        callback(null, res);
      }
    })
  }
   else if (msg.path === 'updateBasicDetails') {
    console.log(msg)
    var res = {};
    Seller.updateOne({_id : msg.userId} , 
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
  }  else if (msg.path === 'deleteSellerProduct') {
    console.log(msg)
    var res = {};
    Product.updateOne({_id : msg.productId} , 
       {
           $set : {active : false}
    } ,
        (error, success)=> {
            if(error) {
                res.message = error.message;
                res.status = 400;
                callback(null,res);
            } else if(success.n > 0){
                console.log("Product Deleted")
                res.message = "Product Deleted";
                res.status = 200;
                callback(null,res);
            } else {
                res.message = "Product Not Found";
                res.status = 400;
                callback(null,res);
            }  
        })   
  }
  else if (msg.path === 'uploadProfilePic') {
    console.log(msg)
    var res = {};
    Seller.updateOne({_id : msg.sellerId} , 
       {
           $set : {profilePicture : msg.profileImagePath.imageUrl}
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
  else if (msg.params.path  === 'getSalesDetails') {
    console.log( "Kafka Backed get Sales Details " , msg)
    var res = {};
    OrderItem.findAll({
      attributes: ['productId', [sequelize.fn('sum', sequelize.col('quantity')), 'quantityTotal'],
        [sequelize.fn('sum', sequelize.col('totalPrice')), 'amount'],
        [sequelize.fn('MONTH', sequelize.col('createdAt')),  ' month'] 
      ],
      where: { 'sellerId': '5e8187df8bea9e66dcedbf99' },
      group: ['OrderItem.productId', [sequelize.fn('MONTH', sequelize.col('createdAt'))]],
      raw: true,
      //order: sequelize.literal('total DESC')
    }).then(result => {
      console.log(" result in seller:  ", result);
      res.status = 200;
      res.message = result;
      callback(null, res);
    }).catch(err =>{
      console.log("Error is: ", err);
    });
  }
}
// }

exports.handle_request = handle_request;
