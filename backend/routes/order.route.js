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

// Get Order For Seller
router.route('/seller/getAllOrder/:sellerId/:type').get((req, res) => {
  console.log(req.params + "\n Query Params\n", req.query);
  req.params.path = 'all-order-by-seller';
  makeKafkaRequestCart(req, res);
});

// Get Order Updates
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
