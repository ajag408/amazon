const express = require('express');

const router = express.Router();
const kafka = require('../kafka/client');
const AWS = require('aws-sdk');
var multer = require('multer')
const multerS3 = require('multer-s3');

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

router.route('/deleteSellerProduct').post((req, res) => {
  req.body.path = 'deleteSellerProduct';
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

const BUCKET_NAME = 'sellerpicsamazon';
const s3 = new AWS.S3({
  accessKeyId: process.env.ID,
  secretAccessKey: process.env.SECRET
});

var multipleUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      console.log("Multer upload code",req.body);
      cb(null, req.body.sellerId + '/' + Date.now().toString() + file.originalname)
    }
  })
}).single("file")

router.route('/uploadProfilePic').post((req, res) => {
  //console.log("S3 object" ,s3);
  var profileImagePath
  multipleUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("Multer error  :",err.message);
      return res.json({ "status": 400, msg: err.message })
    } else if (err) {
      console.log("Other error  :",err);
      return res.json({ "status": 400, msg: err.message })
    } else {
      console.log(req.file);
      profileImagePath = { "imageUrl": req.file.location };

      req.body.profileImagePath = profileImagePath;
      req.body.path = 'uploadProfilePic';
      kafka.make_request('seller', req.body, (err, results) => {
        console.log('in result');
        console.log(results);
        if (err) {
          console.log('Inside err');
         //res.status(500);
          res.json({
            status: 500,
            msg: 'System Error, Try Again.',
          });
          res.end();
        } else {
          console.log('inside else of request');
          //res.status(results.status);
          res.json({
            status: results.status,
            msg: results,
            profileImagePath : profileImagePath.imageUrl
          });
          //res.json(results);
          res.end();
        }
      });
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


router.route('/getSalesDetails').post((req, res) => {
  console.log("Backend searching Orders for a seller : ", req.body);
  req.params.path = 'getSalesDetails';
  makeKafkaRequestCart(req, res);
});


const makeKafkaRequestCart = async (req, res) => {
  kafka.make_request('seller', { body: req.body, params: req.params }, (err, results) => {
    if (err) {
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else {
      console.log("Result from seller details are: ", results)
      res.json(results);
    }
  });
}



module.exports = router;
