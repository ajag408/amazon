const mongoose = require('mongoose');
//const Customer = mongoose.models.Customer;
const Product = mongoose.models.Product;

async function handle_request(msg, callback) {
    var res = {};
    if (msg.params.path === 'get-all-products') {
        console.log("Product => Kafka Backend: ", msg);

        Product.find().populate('seller').exec((err, categories) => {
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
    }
}

exports.handle_request = handle_request;
