const express = require('express');

const router = express.Router();
const kafka = require('../kafka/client');
// const {mongoose} = require('../../kafka-backend/models');
// const Customer = mongoose.model('Customer');
// const Product = mongoose.model('Product');

const makeKafkaRequestCart = async (req, res) => {
  kafka.make_request('cart', {body: req.body, params: req.params}, (err, results) => {
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

// CREATE User
router.route('/customer/:customerId/show-cart').get((req, res) => {
  console.log("hello")
  req.params.path = 'show-cart';
  makeKafkaRequestCart(req, res);
});

router.route('/customer/:customerId/add-to-cart/:productId').post(async (req, res) => {
  req.params.path = 'add-to-cart';
  makeKafkaRequestCart(req, res);
});

router.route('/customer/:customerId/remove-from-cart/:productId').post(async (req, res) => {
  req.params.path = 'remove-from-cart';
  makeKafkaRequestCart(req, res);
});

const moveCartItems = async (req,res) => {
  req.params.path = 'move-cart-items';
  makeKafkaRequestCart(req, res);
} 

router.route('/customer/:customerId/move-to-save-for-later').post((req, res) => {
  req.params.moveTo = 'saveForLater';
  return moveCartItems(req,res);
});

router.route('/customer/:customerId/move-to-cart').post((req, res) => {
  req.params.moveTo = 'cart';
  return moveCartItems(req,res);
});

router.route('/customer/:customerId/add-gift-message').post(async (req, res) => {
  req.params.path = 'add-gift-message';
  makeKafkaRequestCart(req, res);
});

router.route('/customer/:customerId/remove-gift-message').post(async (req, res) => {
  req.params.path = 'remove-gift-message';
  makeKafkaRequestCart(req, res);
});

router.route('/customer/:customerId/clear-cart').post((req, res) => {
  console.log("hello")
  req.params.path = 'clear-cart';
  makeKafkaRequestCart(req, res);
});

module.exports = router;
