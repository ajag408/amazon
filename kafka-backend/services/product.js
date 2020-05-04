const mongoose = require('mongoose');
//const Customer = mongoose.models.Customer;
const Product = mongoose.models.Product;
const Customer = mongoose.models.Customer;

async function handle_request(msg, callback) {
    try{
        var res = {};
        if (msg.params.path === 'get-all-products') {
            //console.log("Product => Kafka Backend: ", msg);
            
            Product.find().populate('seller').limit(10).exec((err, categories) => {
                if(err){
                    console.log("Error is: ", err);
                }
                if(categories){
                   // console.log("categories are: ", categories);
                    res.status = 200;
                    res.message = categories;
                    callback(null, res);
                }
            });
            
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
        } else if (msg.params.path === 'get-product') {
            console.log("Product => Kafka Backend: ", msg);
            
            Product.findById(msg.params.productId)
            .populate({
                path: 'seller',
                select: 'name'
            }).populate({
                path: 'ratingAndReviews.customer',
                select: 'name'
            }).exec((err, product) => {
                console.log(product)
                if(err){
                    console.log("Error is: ", err);
                    callback(null, {error : err});
                }
                if(product){
                    console.log("product is: ", product);
                    callback(null, product);
                }
            });
        } else if (msg.params.path === 'add-review') {
            console.log("Product => Kafka Backend: ", msg);
            
            Product.findById(msg.params.productId).exec(async (err, product) => {
                if(err){
                    console.log("Error is: ", err);
                    callback(null, {error : err});
                }
                let customer = await Customer.findById(msg.body.customerId)
                .populate({
                    path: 'seller',
                    select: 'name'
                }).populate({
                    path: 'ratingAndReview.customer',
                    select: 'name'
                }).catch(e => null);
                if(!customer){
                    console.log("Error is: ", 'Customer not found');
                    callback(null, {error : 'Customer not found'});
                }
                if(product){
                    product.ratingAndReviews.push({
                        customer: customer._id,
                        rating: msg.body.rating,
                        review: msg.body.review
                    })
                    await product.save().catch(err => {
                        console.log("error is saving review and rating: ", err);
                        callback(null, {error : err});
                    });
                    console.log("product is: ", product);
                    callback(null, product);
                }
            });
        }
        else if (msg.params.path === 'search-products') {

            let pName="";
            if(msg.body.productName){
                pName = msg.body.productName
            }
            var filter = {
                $and: [
                    { name: { $regex: ".*" + pName + ".*", $options: 'i' } }
                ]
            }
           if (msg.body.sellerId && msg.body.sellerId.length >0){
               filter.$and.push({"seller" : {$in : msg.body.sellerId}});
           }
           if (msg.body.lowerPrice >=0 && msg.body.upperPrice >=0){
               filter.$and.push({ "price": { $gt: Number(msg.body.lowerPrice), $lt: Number(msg.body.upperPrice) }});
           }
            if (msg.body.productCategory) {
                //console.log("Inside product Category", msg.body.productCategory);
                filter.$and.push({ "productCategory": msg.body.productCategory });
            }

            Product.find(filter).populate('seller').limit(12).exec((err, results) => {
                if (err) {
                    console.log("Error is: ", err);
                    res.message = error.message;
                    res.status = 400;
                    callback(null, res);
                }
                if (results) {
                    if (msg.body.rating){
                     results.filter((product) =>{
                            if(product.ratings = msg.body.rating){
                                results.splice(results.indexOf(product), 1);
                            }
                        })
                    }
                    //console.log("Output:  ", results);
                    res.status = 200;
                    res.message = results;
                    callback(null, res);
                }
            });
            

        }
    } catch(error){
        console.log("error occured in product ", error);
        callback(null, { error: error });
    }
}

exports.handle_request = handle_request;
