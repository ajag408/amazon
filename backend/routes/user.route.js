const express = require('express');

const router = express.Router();
const User = require('../models/user');
const kafka = require('../kafka/client');

// CREATE User
router.route('/new-user').post((req, res) => {
  req.body.path = 'new-user';
  kafka.make_request('user', req.body, (err, results) => {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log('Inside err');
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else {
      console.log('Inside else');
      if(results.errors){
        results.name = "MongoError";
      }
      res.json(results);
    }
  });
});

module.exports = router;
