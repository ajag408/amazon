const express = require('express');

const router = express.Router();

const kafka = require('../kafka/client');

// CREATE User
router.route('/new-user').post((req, res) => {
  req.body.path = 'new-user';
  console.log(req.body);
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
      res.json(results);
    }
  });
});

module.exports = router;
