const express = require('express');

const router = express.Router();
const kafka = require('../kafka/client');

const makeKafkaRequestCart = async (req, res) => {
  kafka.make_request('order', {body: req.body, params: req.params}, (err, results) => {
    if (err) {
      console.log('Error:',err);
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else {
      res.json(results);
    }
  });
}

// Get OrderItems For Seller
router.route('/seller/getAllOrder/:sellerId/:type').get((req, res) => {
  console.log(req.params);
  req.params.path = 'all-orderItems';
  req.params.usertype = 'Seller';
  makeKafkaRequestCart(req, res);
});

// Get Order For Customer
router.route('/customer/getAllOrder/:customerId').get((req, res) => {
  console.log(req.params + "\n Query Params\n", req.query);
  req.params.path = 'all-order-by-customer';
  req.params.usertype = 'Customer';
  makeKafkaRequestCart(req, res);
});

// Get OrderItems For Customer
router.route('/customer/getAllOrder/:customerId/:type').get((req, res) => {
  console.log("Get all order by customer",req.params );
  req.params.path = 'all-orderItems';
  req.params.usertype = 'Customer';
  makeKafkaRequestCart(req, res);
});

// Get OrderItem By OrderId
router.route('/getAllOrder/:orderId').get((req, res) => {
  console.log(req.params + "\n Query Params\n", req.query);
  req.params.path = 'all-order-by-orderId';
  makeKafkaRequestCart(req, res);
});

// Get OrderItem Updates
router.route('/trackOrder/:orderItemId').get((req, res) => {
  req.params.path = 'get-orderitem-detail';
  makeKafkaRequestCart(req, res);
});

// Update Order Seller
router.route('/seller/updateOrderStatus').post((req, res) => {
  req.params.path = 'update-order-by-seller';
  makeKafkaRequestCart(req, res);
});



module.exports = router;
