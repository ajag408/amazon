const express = require('express');

const router = express.Router();
const kafka = require('../kafka/client');

// Seller Profile
router.route('/getProfileData/:userId').get((req, res) => {
  req.params.path = 'getProfileData';
  console.log("request is: ", req.params.userId);
  kafka.make_request('seller', req.params, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
      res.end();
    } else {
      console.log('inside else of request');
      res.status(results.status);
      res.json(results);
      res.end();
    }
  });
});

router.route('/updateBasicDetails').post((req, res) => {
  req.body.path = 'updateBasicDetails';
  kafka.make_request('seller', req.body, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.status(500);
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
      res.end();
    } else {
      console.log('inside else of request');
      res.status(results.status);
      res.json(results);
      res.end();
    }
  });
});
// router.route('/login').post((req, res) => {
//   req.body.path = 'login';

//   kafka.make_request('user', req.body, (err, results) => {
//     if (err) {
//       console.log('Inside err');
//       res.json({
//         status: 'error',
//         msg: 'System Error, Try Again.',
//       });
//     } else {
//       console.log('Inside else');
//       res.json(results);
//     }
//   });
// });

module.exports = router;
