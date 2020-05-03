const Customer = require('../models/customer');

function handle_request(msg, callback) {
    if (msg.path === 'get-customerById') {
      Customer.find({ _id: msg.paramID }, (err, customer) => {
        if (err) {
          console.log(err);
        } else {
          console.log('before:', customer);
          console.log('customer: ', JSON.stringify(customer));
          callback(null, JSON.stringify(customer));
        }
      });
    }
     else if (msg.path === 'addPayment') {

        Customer.find({ _id: msg.paramID }, (err, customer) => {
            if (err) {
            console.log(err);
            } else {
            //   console.log('before:', customer);
            //   console.log('customer: ', JSON.stringify(customer));
            console.log(customer);
            customer[0].savedPaymentOptions.push(msg)
            customer[0].save(function (err){
                if(err) {
                    console.log(err)
                }else {
                    callback(null, "Added payment");
                }
            })
            
            }
        });
    }
  }
  // }
  
  exports.handle_request = handle_request;