const express = require('express');

const router = express.Router();
// const User = require('../../kafka-backend/models/user');
const kafka = require('../kafka/client');

// Get Orders per day 
router.get("/getOrdersPerDay", async (req, res) => {

    let msg = req.body;
    msg.route = "Adding new Product Category";
    req.body.path="orders_per_day";
    
    console.log('request reached add product category'+JSON.stringify(req.body));
    
      
    kafka.make_request('analytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end("System Error");
      }
      else if (results.status === 200) {
        let payload = results.message;
        
        res.status(results.status).end(payload);
      }
      else {
        res.status(results.status).end(results.message);
      }
    });
  })
//Most Sold Products
  router.get("/getMostSoldProducts", async (req, res) => {

    let msg = req.body;
    msg.route = "Adding new Product Category";
    req.body.path="most_sold_products";
    
    console.log('request reached add product category'+JSON.stringify(req.body));
    
      
    kafka.make_request('analytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end("System Error");
      }
      else if (results.status === 200) {
        let payload = results.message;
        
        res.status(results.status).end(payload);
      }
      else {
        res.status(results.status).end(results.message);
      }
    });
  })
  //5 Best Sellers based on sale
  router.get("/getBestSellers", async (req, res) => {

    let msg = req.body;
    msg.route = "Adding new Product Category";
    req.body.path="best_sellers";
    
    console.log('request reached add product category'+JSON.stringify(req.body));
    
      
    kafka.make_request('analytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end("System Error");
      }
      else if (results.status === 200) {
        let payload = results.message;
        
        res.status(results.status).end(payload);
      }
      else {
        res.status(results.status).end(results.message);
      }
    });
  })
  //5 Best Customers based on purchase
  router.get("/getBestCustomers", async (req, res) => {

    let msg = req.body;
    msg.route = "Adding new Product Category";
    req.body.path="best_customers";
    
    console.log('request reached add product category'+JSON.stringify(req.body));
    
      
    kafka.make_request('analytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end("System Error");
      }
      else if (results.status === 200) {
        let payload = results.message;
        
        res.status(results.status).end(payload);
      }
      else {
        res.status(results.status).end(results.message);
      }
    });
  })
  module.exports = router;