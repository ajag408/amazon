const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const redisClient = require("../utils/redisConfig");
let models = require('../models')

const { secret } = require('../../backend/database/db');
const ProductCategory = require('../models/productCategory');
const Product=require('../models/product');
const Sellers=require('../models/seller');
const Order =require('../models/order');
let OrderItem = models.OrderItem;
let OrderItemUpdate = models.OrderItemUpdate;
const Op = require('sequelize').Op;
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');


async function handle_request(msg, callback) {
    var res = {};
  if(msg.path==("add_category"))
  {
      var newCategory = new ProductCategory({
      name:msg.productCategory
        });
       
            ProductCategory.findOne({name: msg.productCategory}, (err, category) => {
                if (err) {
                  res.status = 500;
                  res.message = "Database Error";
                  callback(null, res);
                }
                else if(category){
                    res.status = 409;
                  res.message = "Product Category already exists";
                  callback(null, res);
                }
                else{
                    newCategory.save((err, data) => {
                    if (err) {
                        console.log(err);
                      res.status = 500;
                      res.message = "Error in Data";
                      callback(null, res);
                    }
                    else {
                      res.status = 200;
                      res.message = "Product category successfully added";
                      console.log(JSON.stringify(data))
                      redisClient.set(`ProductCategory:${data._id}`,JSON.stringify(data));
                      callback(null, res);
                    }
                })
            }
        })
  }

  if(msg.path==("get_category"))
  {
    let ts=new Date().toISOString();
    console.log(ts);
   redisClient.keys('*ProductCategory*', async (err,categoriesKeys) => {
      
      if(categoriesKeys.length)
      { let categoriesRedis=[];let i;
        redisClient.mget(categoriesKeys,async (err,categories) => {
          if(categories)
          {
            for(i=0;i<categories.length;i++)
            {
              let data=JSON.parse(categories[i])
              console.log(data)
              categoriesRedis.push(data)
            }
        res.status = 200;
        res.message = JSON.stringify(categoriesRedis);
        callback(null, res);
          }
        })
      }
else
{
            ProductCategory.find({}, (err, categories) => {
                if (err) {
                  res.status = 500;
                  res.message = "Database Error";
                  callback(null, res);
                }
                else if(!categories){
                    res.status = 204;
                  res.message = "No Product Category exists";
                  callback(null, res);
                }
                else{
                    let payload=JSON.stringify(categories);
                    console.log(payload)
                    res.status = 200;
                    res.message = payload;
                    callback(null, res);
                }
        })
}
})  
  }
  if(msg.path==("remove_category"))
  {
            Product.find({"productCategory":msg.categoryId}, (err, products) => {
                if (err) {
                    console.log(err)
                  res.status = 500;
                  res.message = "Database Error";
                  callback(null, res);
                }
                else if(products.length>0){
                    console.log(products)
                    console.log("CANNNOT BE DELETED");
                    res.status = 400;
                    res.message = "Product Category cannot be deleted as it has products mapped";
                    callback(null, res);  
                }
                else{
                  ProductCategory.deleteOne({_id:msg.categoryId},(err,successFlag)=>{

                    if(err)
                    {
                      res.status = 500;
                      res.message = "Database Error";
                      callback(null, res);
                    }
                    else{
                    res.status = 200;
                    res.message = "Deleted Product Category";
                    redisClient.del(`ProductCategory:${msg.categoryId}`);
                    callback(null, res);
                    }
                
              })
            }
        })
  }

  if(msg.path==("category_details"))
  {

    let productCategoryDetails = await Product.find({"productCategory":msg.categoryDetailsId}).populate('seller','name').limit(50).skip(50*(msg.pageIndex-1));
    console.log(productCategoryDetails);
    if(productCategoryDetails)
    {
    let payload=JSON.stringify(productCategoryDetails);
                    console.log(payload)
                    res.status = 200;
                    res.message = payload;
                    callback(null, res);
    }
    else{
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }
               
  }

if(msg.path==("seller_search"))
  {
if(msg.searchCriteria==""){
    let sellers = await Sellers.find({})
    console.log(sellers);
    if(sellers)
    {
    let payload=JSON.stringify(sellers);
    console.log(payload)
    res.status = 200;
    res.message = payload;
    callback(null, res);
    }
    else{
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }          
  }
  else{
    let sellers = await Sellers.find({name:{$regex:`${msg.searchCriteria}` ,$options : 'i'}})
    console.log(sellers);
    if(sellers)
    {
    let payload=JSON.stringify(sellers);
    console.log(payload)
    res.status = 200;
    res.message = payload;
    callback(null, res);
    }
    else{
      res.status = 500;
      res.message = "Database Error";
      callback(null, res);
    }          

  }
}

if(msg.path==("seller_products"))
{

  let products = await Product.find({"seller":msg.sellerId}).limit(50).skip(50*(msg.pageIndex-1));
  console.log(products);
  if(products)
  {
  let payload=JSON.stringify(products);
                  console.log(payload)
                  res.status = 200;
                  res.message = payload;
                  callback(null, res);
  }
  else{
    res.status = 500;
    res.message = "Database Error";
    callback(null, res);
  }
             
}
if(msg.path==("seller_sales"))
{ 
  OrderItem.findAll({
    attributes: [
      [sequelize.fn('MONTH', sequelize.col('createdAt')),  ' salesMonth'],
      [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalAmount'] 
    ],
    where: { 'sellerId': `${msg.sellerId}`,'status' : {
      [Op.notIn]: ["Cancelled"]
    } },
    group: [[sequelize.fn('MONTH', sequelize.col('createdAt'))]],
    raw: true,
    
  }).then(result => {
    console.log(" result in admin:  ", result);
    let payload=JSON.stringify(result);
    res.status = 200;
    res.message = payload;
    callback(null, res);
  }).catch(err =>{
    console.log("Error is: ", err);
    res.status = 500;
    res.message = "Database Error";
    callback(null, res);
  });
}
if(msg.path==("seller_orders"))
{ 
  OrderItem.findAll({}).then(result => {
    console.log(" result in admin:  ", result);
    let payload=JSON.stringify(result);
    res.status = 200;
    res.message = payload;
    callback(null, res);
  }).catch(err =>{
    console.log("Error is: ", err);
    res.status = 500;
    res.message = "Database Error";
    callback(null, res);
  });
}
  

  if(msg.path==("seller_orderItemUpdate"))
{ const orderItemUpdate = {
  message: msg.orderStatus,
  orderItemId: msg.orderItemId
}
  OrderItem.update({ status: msg.orderStatus },{ where:{id: msg.orderItemId}})
    .then(result => {
      OrderItemUpdate.create(orderItemUpdate).then((savedObj) => {
        res.status = 200;
        res.messgae = "updated status"
    callback(null, res);
  }).catch(err =>{
    console.log("Error is: ", err);
    res.status = 500;
    res.message = "Database Error";
    callback(null, res);
  });
})
}
}

  

exports.handle_request = handle_request;
