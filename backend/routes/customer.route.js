const express = require('express');

const router = express.Router();
const kafka = require('../kafka/client');
const AWS = require('aws-sdk');
var multer = require('multer')
const multerS3 = require('multer-s3');


router.route('/getCustomer/:id').get((req, res) => {
    req.body.path = 'get-customerById';
    req.body.paramID = req.params.id;
    kafka.make_request('customer', req.body, (err, results) => {
        if (err) {
            console.log('Inside err');
            res.json({
                status: 'error',
                msg: 'System Error, Try Again.',
            });
        } else {
            console.log('Inside else');
            res.end(results);
        }
    });
});

router.route('/addPayment/:id').post((req, res) => {

    req.body.path = 'addPayment';
    req.body.paramID = req.params.id;
    kafka.make_request('customer', req.body, (err, results) => {
        if (err) {
            console.log('Inside err');
            res.json({
                status: 'error',
                msg: 'System Error, Try Again.',
            });
        } else {
            res.json("added payment")
        }
    });
});

  router.route('/editPayment/:id').post((req, res) => {
   
    req.body.path = 'editPayment';
    req.body.paramID = req.params.id;
    kafka.make_request('customer', req.body, (err, results) => {
      if (err) {
        console.log('Inside err');
        res.json({
          status: 'error',
          msg: 'System Error, Try Again.',
        });
      } else {
       res.json("edited payment")
      }
    });
  });
  router.route('/deletePayment/:id').post((req, res) => {
   
    req.body.path = 'deletePayment';
    req.body.paramID = req.params.id;
    kafka.make_request('customer', req.body, (err, results) => {
      if (err) {
        console.log('Inside err');
        res.json({
          status: 'error',
          msg: 'System Error, Try Again.',
        });
      } else {
       res.json("deleted payment")
      }
    });
  });

  router.route('/placeOrder/:id').post((req, res) => {
 
  req.body.path = 'placeOrder';
  req.body.paramID = req.params.id;
  kafka.make_request('customer', req.body, (err, results) => {
    if (err) {
      console.log('Inside err');
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else {
     res.json(results)
    }
  });
});


const makeKafkaRequestCart = async (req, res) => {

    kafka.make_request('customer', { body: req.body, params: req.params }, (err, results) => {
        if (err) {
            console.log('Error:', err);
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
router.route('/add-address').post((req, res) => {

    console.log("Inside Add address", req.body);
    req.params.path = 'add-address';
    makeKafkaRequestCart(req, res);
});

router.route('/get-address').post((req, res) => {

    console.log("Inside Get address", req.body);
    req.params.path = 'get-address';
    makeKafkaRequestCart(req, res);
});

router.route('/edit-address').post((req, res) => {

    console.log("Inside Edit address", req.body);
    req.params.path = 'edit-address';
    makeKafkaRequestCart(req, res);
});


router.route('/delete-address').post((req, res) => {

    console.log("Inside Delete address", req.body);
    req.params.path = 'delete-address';
    makeKafkaRequestCart(req, res);
});




module.exports = router;
