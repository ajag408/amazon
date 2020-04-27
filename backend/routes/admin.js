// const express = require('express');

// const router = express.Router();
// const User = require('../../kafka-backend/models/user');
// const kafka = require('../kafka/client');

// // CREATE PRODUCT CATEGORY
// router.post("/addProductCategory", async (req, res) => {

//     let msg = req.body;
//     msg.route = "Adding new Product Category";
//     req.body.path="add_category";
    
//     console.log('request reached add product category'+JSON.stringify(req.body));
    
      
//     kafka.make_request('admin', req.body, (err, results) => {
//       if (err) {
//         res.status(500).end("System Error");
//       }
//       else if (results.status === 200) {
//         let payload = results.message;
        
//         res.status(results.status).end(payload);
//       }
//       else {
//         res.status(results.status).end(results.message);
//       }
//     });
//   })
// //List of all Product Categories
//   router.get("/getAllProductCategories", async (req, res) => {

//     let msg = req.body;
//     msg.route = "Adding new Product Category";
//     req.body.path="get_category";
    
//     console.log('request reached get all product category'+JSON.stringify(req.body));
    
      
//     kafka.make_request('admin', req.body, (err, results) => {
//       if (err) {
//         res.status(500).end("System Error");
//       }
//       else if (results.status === 200) {
//         let payload = results.message;
//         console.log(payload)
//         res.status(results.status).end(payload);
//       }
//       else {
//         res.status(results.status).end(results.message);
//       }
//     });
//   })
// //Remove Product Category
//   router.post("/removeProductCategory", async (req, res) => {

//     let msg = req.body;
//     msg.route = "Removing Product Category";
//     req.body.path="remove_category";
    
//     console.log('request reached remove product category'+JSON.stringify(req.body));
    
//     kafka.make_request('admin', req.body, (err, results) => {
//       if (err) {
//         res.status(500).end("System Error");
//       }
//       else if (results.status === 200) {
//         let payload = results.message;
        
//         res.status(results.status).end(payload);
//       }
//       else {
//         res.status(results.status).end(results.message);
//       }
//     });
//   })

//   //Product Category Details
//   router.post("/getProductCategoryDetails", async (req, res) => {

//     let msg = req.body;
//     msg.route = "Product Category Details";
//     req.body.path="category_details";
    
//     console.log('request reached product category details'+JSON.stringify(req.body));
    
//     kafka.make_request('admin', req.body, (err, results) => {
//       if (err) {
//         res.status(500).end("System Error");
//       }
//       else if (results.status === 200) {
//         let payload = results.message;
//         console.log(payload)
//         res.status(results.status).end(payload);
//       }
//       else {
//         res.status(results.status).end(results.message);
//       }
//     });
//   })

// module.exports = router;