

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const { secret } = require('../../backend/database/db');
const ProductCategory = require('../models/productCategory');
const Product=require('../models/product');

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
                      callback(null, res);
                    }
                })
            }
        })
  }

  if(msg.path==("get_category"))
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
                    callback(null, res);
                    }
                
              })
            }
        })
  }

  if(msg.path==("category_details"))
  {

    let productCategoryDetails = await Product.find({"productCategory":msg.categoryDetailsId}).populate('seller','name');
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
}


exports.handle_request = handle_request;
