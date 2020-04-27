const express = require('express');

const router = express.Router();
const kafka = require('../kafka/client');
//const { mongoose } = require('../../kafka-backend/models');
//const Customer = mongoose.model('Customer');
//const Product = mongoose.model('Product');

const makeKafkaRequestCart = async (req, res) => {
    //console.log("Make request Product route");
    kafka.make_request('product', { body: req.body, params: req.params }, (err, results) => {
        if (err) {
            console.log('Error:', err);
            res.json({
                status: 'error',
                msg: 'System Error, Try Again.',
            });
        } else {
            //console.log("results are: ", results);
            res.json(results);
        }
    });
}

// get All Products
router.route('/getAllProducts').get((req, res) => {
    //console.log("req.body in getALl Products: ", req.body);
    req.params.path = 'get-all-products';
    makeKafkaRequestCart(req, res);
});

module.exports = router;
