const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
var multer = require('multer')
const  multerS3 = require('multer-s3');
const kafka = require('../kafka/client');
// The name of the bucket that you have created
const BUCKET_NAME = 'test-demo-amazon2';
const s3 = new AWS.S3({
    accessKeyId: process.env.ID,
    secretAccessKey: process.env.SECRET
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png')
        cb(null,true);
    else    
        cb(null,false);
};

var multipleUpload  = multer({
    storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
          console.log(req.body);
          let folderName = req.body.name.toLowerCase().split(' ').join('-');
          console.log("Multer Called",folderName);
        cb(null,req.body.seller+'/'+ folderName +'/' +Date.now().toString()+ file.originalname)
      }
    })
  }).array("file")


const makeKafkaRequestCart = async (req, res) => {
    kafka.make_request('product', { body: req.body, params: req.params }, (err, results) => {
        if (err) {
            res.json({
                status: 'error',
                msg: 'System Error, Try Again.',
            });
        } else {
            console.log("Result from product details are: ", results)
            res.json(results);
        }
    });
}

// get All Products
router.route('/getAllProducts').get((req, res) => {
    console.log("req.body in getALl Products: ", req.body);
    req.params.path = 'get-all-products';
    makeKafkaRequestCart(req, res);
});

router.route('/:productId').get((req,res)=>{
    console.log("Product route: ", req.body);
    req.params.path = 'get-product';
    makeKafkaRequestCart(req, res);
})

// Add Product
router.route('/addProduct').post( (req, res) => {
    
    let productImages = [];

    multipleUpload(req,res,function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({"status" :400,"error" :err.message})
        } else if (err) {
            return res.json({"status" :400,"error" :err.message})
        } else {
            console.log(req.files);
            for(var i=0;i< req.files.length ; i++) {
                productImages.push({ "imageUrl" :  req.files[i].location  });
        }
         const productObj = {
            "name" : req.body.name,
            "seller" : req.body.seller,
            "productCategory" : req.body.productCategory,
            "price" : req.body.price,
            "description" : req.body.desc,
            "images" : productImages
        }
        
         req.body.productObj = productObj;
         req.params.path = 'add-product';
         makeKafkaRequestCart(req, res);
        }
    });
});


//Remove Product
router.route('/removeProduct').post( (req, res) => {
        req.params.path = 'remove-product';
        makeKafkaRequestCart(req, res);
});

//Delete Product Images
router.route('/removeProductImages').post( (req, res) => {
    req.params.path = 'remove-product-Image';
    makeKafkaRequestCart(req, res);
});


//Edit Product
router.route('/editProduct').post( (req, res) => {

    
    let productImages = [];

    multipleUpload(req,res,function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({"status" :400,"error" :err.message})
        } else if (err) {
            return res.json({"status" :400,"error" :err.message})
        } else {
            console.log(req.files);
            for(var i=0;i< req.files.length ; i++) {
                productImages.push({ "imageUrl" :  req.files[i].location  });
        }
         const editedObj = {
            "name" : req.body.name,
            "productCategory" : req.body.productCategory,
            "price" : req.body.price,
            "description" : req.body.desc,
        }
        
         req.body.editedProduct = editedObj;
         req.body.productImages = productImages;
         req.params.path = 'edit-product';
         makeKafkaRequestCart(req, res);
        }
    }); 
});

router.route('/:productId/add-review').post((req,res)=>{
    console.log("Product route: ", req.body);
    req.params.path = 'add-review';
    makeKafkaRequestCart(req, res);
});

router.route('/search-product').post((req, res) => {
    //console.log("Backend searching products : ", req.body);
    req.params.path = 'search-products';
    makeKafkaRequestCart(req, res);
});



module.exports = router;
