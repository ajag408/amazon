const Customer = require('../models/customer');
let models = require('../models')
let Order = models.Order;
let OrderItem = models.OrderItem;
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');

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
    else if (msg.path === 'placeOrder') {
        msg.status = "Paid"
        console.log("msg",msg);
        msg.address = JSON.stringify(msg.address);
        msg.card = JSON.stringify(msg.card);
        Order.create(msg)
        .then((order) => {
            // console.log("order", order.id)
            (async () => {
                let orderId = order.id;
                var i;
                for (i = 0; i < msg.orderItems.length; i += 1) {
                    //   await console.log('This student');
                    //   await console.log(students[i].name);
                    msg.orderItems[i].productId = msg.orderItems[i].product._id
                    msg.orderItems[i].productName = msg.orderItems[i].product.name
                    msg.orderItems[i].orderId = orderId;
                    msg.orderItems[i].customerName = msg.customerName;
                    msg.orderItems[i].customerId = msg.customerId;
                    msg.orderItems[i].sellerId = msg.orderItems[i].product.seller._id
                    msg.orderItems[i].sellerName = msg.orderItems[i].product.seller.name
                    msg.orderItems[i].status = "Paid";
                    delete msg.orderItems[i].id
                    console.log(msg.orderItems[i]);
                    await OrderItem.create(msg.orderItems[i])
                    //     student: students[i]._id,
                    //     major: {
                    //       $regex: msg.major,
                    //       $options: 'i',
                    //     },
                    //   },
        
                    .then((orderItem) => {
                        // async (error, student) => {
                        console.log("order item id", orderItem.id)
                        
                        }).catch(err =>{
                            console.log(err)
                            // console.log("Error is: ", err);
                        });
            
                    // console.log('done');
      
                  // console.log("after:", jobs[i]);
                }
                callback(null, order);
              })();
            
        }).catch(err =>{
            console.log("Error is: ", err);
        });
            
    }
  }
  // }
  
  exports.handle_request = handle_request;