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
    //  else if (msg.path === 'get-all-students') {
    //   studentSchema.find({}, (error, students) => {
    //     if (error) {
    //       console.log(error);
    //       callback(null, error);
    //     } else {
    //       console.log('All Students : ', JSON.stringify(students));
    //       callback(null, JSON.stringify(students));
    //     }
    //   });
    // }
  }
  // }
  
  exports.handle_request = handle_request;