const mongoose = require('mongoose');
//const Customer = mongoose.models.Customer;
const Product = mongoose.models.Product;

async function handle_request(msg, callback) {
    var res = {};
    if (msg.params.path === 'get-all-products') {
        console.log("Product => Kafka Backend: ", msg);

        Product.find().populate('seller').limit(10).exec((err, categories) => {
            if(err){
                console.log("Error is: ", err);
            }
            if(categories){
                console.log("categories are: ", categories);
                res.status = 200;
                res.message = categories;
                callback(null, res);
            }
        });

        // Product.find({}, (err, categories) => {

        //     if(err){
        //         console.log("Error is: ", err);
        //     }
        //     if(categories){
                
        //         res.status = 200;
        //         res.message = categories;
        //         callback(null, res);
        //     }
        // })
    } else if(msg.params.path === 'add-product'){
        Product.create(msg.body.productObj ,(err, savedStudent )=>{
            if(err) {
                res.message = err.message;
                res.status = 400;
                callback(null,res);
            } else {
                res.message = savedStudent._id;
                res.status = 200;
                callback(null,res);
            }   
        })
    } else if(msg.params.path === 'remove-product') {
        Product.updateOne({ _id : msg.body.id }, {$set:{ active: false}}, (error, updatedProduct) =>{
            if(error) {
                res.message = error.message;
                res.status = 400;
                callback(null,res);
            } else if(updatedProduct.n > 0){
                console.log("Product Deleted")
                res.message = "Product Deleted";
                res.status = 200;
                callback(null,res);
            } else {
                res.message = "Product Not Found";
                res.status = 400;
                callback(null,res);
            }  
        } )
    } else if(msg.params.path === 'remove-product-Image'){
        Product.updateOne({_id : msg.body.id , active : true} , 
            {$pull : { images : { _id : msg.body.imageId}}},
            (error, deletedImage)=> {
                if(error) {
                    res.message = error.message;
                    res.status = 400;
                    callback(null,res);
                } else if(deletedImage.n > 0){
                    console.log("Image Deleted")
                    res.message = "Image Deleted";
                    res.status = 200;
                    callback(null,res);
                } else {
                    res.message = "Image Not Found for Product";
                    res.status = 400;
                    callback(null,res);
                }  
            })   
    } else if(msg.params.path === 'edit-product'){
        console.log(msg.body.productImages)
        Product.updateOne({_id : msg.body.id, active : true} , 
           {
               $set : msg.body.editedProduct,
               $push : { images : msg.body.productImages
            }
        } ,
            (error, editedProduct)=> {
                if(error) {
                    res.message = error.message;
                    res.status = 400;
                    callback(null,res);
                } else if(editedProduct.n > 0){
                    console.log("Product Edited")
                    res.message = "Product Edited";
                    res.status = 200;
                    callback(null,res);
                } else {
                    res.message = "Product Not Found";
                    res.status = 400;
                    callback(null,res);
                }  
            })   
    }
}

exports.handle_request = handle_request;
