const mongoose = require('mongoose');
let models = require('../models')
const ProductCategory = require('../models/productCategory');
const Product=require('../models/product');
const Sellers=require('../models/seller');
const Order =models.Order;
let OrderItem = models.OrderItem;
let OrderItemUpdate = models.OrderItemUpdate;
const Op = require('sequelize').Op;
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

async function handle_request(msg, callback) {
    var res = {};
  if(msg.path==("orders_per_day"))
  {
    Order.findAll({
      attributes: ['createdAt',
        [sequelize.fn('COUNT', sequelize.col('createdAt')),  ' orderCount']
      ],
      
      group: [[sequelize.fn('Date', sequelize.col('createdAt'))]],
      order: sequelize.literal('createdAt DESC'),
      limit:7,
      raw: true,
      
      }).then(result => {
        console.log(" result in analytics:  ", result);
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

if(msg.path==("most_sold_products"))
  {
    OrderItem.findAll({
      attributes: ['productId','productName',
        [sequelize.fn('SUM', sequelize.col('quantity')),'totalQuantity']
      ],
      where:{'status': {
        [Op.notIn]: ["Cancelled"]
      }},
      group: ['productId'],
      order: [sequelize.literal('totalQuantity DESC')],
      limit:5,
      raw: true,
      
      }).then(result => {
        console.log(" result in analytics:  ", result);
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

if(msg.path==("best_sellers"))
  {
     OrderItem.findAll({
    attributes: ['sellerId','sellerName',
      [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalSales'] 
    ],
    where: { 'status' : {
      [Op.notIn]: ["Cancelled"]
    } },
    group: ['sellerId'],
    order: [sequelize.literal('totalSales DESC')],
      limit:5,
    raw: true,
    
  }).then(result => {
    console.log(" result in analytics:  ", result);
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
if(msg.path==("best_customers"))
  {
     OrderItem.findAll({
    attributes: ['customerId','customerName',
      [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalPurchase'] 
    ],
    where: { 'status' : {
      [Op.notIn]: ["Cancelled"]
    } },
    group: ['customerId'],
    order: [sequelize.literal('totalPurchase DESC')],
      limit:5,
    raw: true,
    
  }).then(result => {
    console.log(" result in analytics:  ", result);
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
}
exports.handle_request = handle_request;