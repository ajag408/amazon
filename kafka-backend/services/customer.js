const Customer = require('../models/customer');
let models = require('../models')
let Order = models.Order;
let OrderItem = models.OrderItem;
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');
const mongoose = require('mongoose');

function handle_request(msg, callback) {
    var res = {};
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
                customer[0].save(function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        callback(null, "Added payment");
                    }
                })

            }
        });
    }
    else if (msg.path === 'editPayment') {

        Customer.findOneAndUpdate({ _id: msg.paramID, "savedPaymentOptions._id":  msg.id}, 
        { 
            "$set": {
                "savedPaymentOptions.$": msg
            }
        },
        (err, customer) => {
            if (err) {
                console.log(err);
              } else {
 
                callback(null, "Edited payment");
              }
        });
    }
    else if (msg.path === 'deletePayment') {

        Customer.find({ _id: msg.paramID }, (err, customer) => {
            if (err) {
            console.log(err);
            } else {
            //   console.log('before:', customer);
            //   console.log('customer: ', JSON.stringify(customer));
            console.log(customer);
            customer[0].savedPaymentOptions.id(msg.id).remove()
            customer[0].save(function (err){
                if(err) {
                    console.log(err)
                }else {
                    callback(null, "Deleted payment");
                }
            })
            
            }
        });
    }
    else if (msg.path === 'placeOrder') {
        msg.status = "Paid"
        console.log("msg", msg);
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

                            }).catch(err => {
                                console.log(err)
                                // console.log("Error is: ", err);
                            });

                        // console.log('done');

                        // console.log("after:", jobs[i]);
                    }
                    callback(null, order);
                })();

            }).catch(err => {
                console.log("Error is: ", err);
            });

    }
    else if (msg.params.path === 'add-address') {
        var newAddress = {
            fullName: msg.body.fullName,
            streetAddressLine_1: msg.body.streetAddressLine_1,
            streetAddressLine_2: msg.body.streetAddressLine_2,
            city: msg.body.city,
            state: msg.body.state,
            country: msg.body.country,
            zipCode: msg.body.zipCode,
            phoneNumber: msg.body.phoneNumber,
        }

        Customer.updateOne({ _id: msg.body.customerId },
            {
                $push: { savedAddresses: newAddress }
            },
            (error, success) => {
                if (error) {
                    res.message = error.message;
                    res.status = 400;
                    callback(null, res);
                } else if (success.n > 0) {
                    console.log("Customer Address updated")
                    res.message = "Customer message updated";
                    res.status = 200;
                    callback(null, res);
                } else {
                    res.message = "Customer not found";
                    res.status = 400;
                    callback(null, res);
                }
            })
    } else if (msg.params.path === 'get-address') {
        Customer.findById(msg.body.customerId).exec((err, results) => {
            if (err) {
                res.message = error.message;
                res.status = 400;
                callback(null, res);
            } else {
                res.status = 200;
                res.message = results.savedAddresses;
                console.log("Results are: ", results.savedAddresses);
                callback(null, res);
            }
        })
    } else if (msg.params.path === 'edit-address') {
        //console.log("inside edit address");
        Customer.update({ "_id": msg.body.customerId, "savedAddresses._id": msg.body.addressId },
            {
                $set: {
                    "savedAddresses.$.fullName": msg.body.fullName,
                    "savedAddresses.$.streetAddressLine_1": msg.body.streetAddressLine_1,
                    "savedAddresses.$.streetAddressLine_2": msg.body.streetAddressLine_2,
                    "savedAddresses.$.city": msg.body.city,
                    "savedAddresses.$.state": msg.body.state,
                    "savedAddresses.$.country": msg.body.country,
                }
            }, (err, result) => {
                if (err) return console.error(err);
                //console.log(" update Address => updated address detail");
                res.status = 200;
                res.message = result;
                callback(null, res);
            })
    } else if (msg.params.path === 'delete-address') {
        //console.log("inside delete address", msg.body);
        Customer.updateOne({ "_id": msg.body.customerId }, { $pull: { savedAddresses: { _id: msg.body.addressId } } }).exec((err, results) => {
            if (err) {
                res.status = 400;
                res.message = "Deletion Successful"
            } if (results) {
                res.status = 200;
                res.message = results
                callback(null, res);
            }
        })
    }
}

exports.handle_request = handle_request;
