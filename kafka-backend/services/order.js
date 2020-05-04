let models = require('../models')
let Order = models.Order;
let OrderItem = models.OrderItem;
let OrderItemUpdate = models.OrderItemUpdate;
var sequelize = require('sequelize');
const Op = require('sequelize').Op

async function handle_request(msg, callback) {
  let res = {};
  if (msg.params.path === 'all-orderItems') {
    console.log("Inside order" + typeof Order, "\n", Order);
    let userSpecCond;
    
    if (msg.params.usertype === 'Seller') {  
      userSpecCond = { sellerId: msg.params.sellerId }
    }

    if (msg.params.usertype === 'Customer') {  
      userSpecCond = { customerId: msg.params.customerId }
    }

    let conditions;
    if (parseInt(msg.params.type) === 1) {   //Open Orders
      conditions = {
        status: {
          [Op.notIn]: ["Delivered", "Cancelled"]
        }
      }
    } else if (parseInt(msg.params.type) === 2) {
      conditions = {
        status: {
          [Op.or]: ["Delivered", "Cancelled"]
        }
      }
    } else if(parseInt(msg.params.type) === 3){   // Only Cancelled Orders
      conditions = {
        status: "Cancelled"
      }
    }
    else{
      conditions = {
        status: {
          [Op.notIn]: [" "]
        }
      }
    }

    OrderItem.findAll({
      where: Object.assign({}, userSpecCond , conditions),
      include: [{ model: Order, as: 'order' }],
      order: [['createdAt', 'DESC']],
    }).then(orderList => {
      callback(null, orderList)
    })
      .catch(e => {
        callback(null, { error: e })
      })
  }

  if (msg.params.path === 'all-order-by-customer') {
    Order.findAll({
      where: { customerId: msg.params.customerId },
      order: [['createdAt', 'DESC']],
    }).then(orderList => {
      callback(null, orderList)
    })
      .catch(e => {
        callback(null, { error: e })
      })
  }

  if (msg.params.path === 'all-order-by-orderId') {
    OrderItem.findAll({
      where: { orderId: msg.params.orderId },
      include: [{ model: Order, as: 'order' }],
    }).then(orderList => {
      callback(null, orderList)
    })
      .catch(e => {
        callback(null, { error: e })
      })
  }

  if (msg.params.path === 'all-orderItem-by-customer') {

    OrderItem.findAll({
      where: { orderId: msg.params.orderId },
      include: [{ model: Order, as: 'order' }],
    }).then(orderList => {
      callback(null, orderList)
    })
      .catch(e => {
        callback(null, { error: e })
      })
  }


  if (msg.params.path === 'update-order-by-seller') {
    const orderItemUpdate = {
      message: msg.body.status + ': ' + msg.body.updateMsg,
      orderItemId: msg.body.id
    }
    let result = await OrderItem.findByPk(msg.body.id);
    let orderRes;
    if (!result) {
      res.status = 400;
      res.messgae = "OrderItem Not Found";
      callback(null, res);
    } else {
      OrderItem.update(
        { status: msg.body.status },
        { where: { id: msg.body.id } })
        .then(OrderItemUpdated => {

          OrderItemUpdate.create(orderItemUpdate).then(async function (savedObj) {
            if (msg.body.status === "Cancelled" &&  result.dataValues.status !== "Delivered") {
              orderRes = await Order.update(
                { finalTotal: sequelize.literal('finalTotal -' + result.dataValues.totalPrice) },
                {
                  where: { id: result.dataValues.orderId }
                })
              if (!orderRes) {
                callback(null, { status: 400, message: "Error Occured" });
              }
            }
            res.status = 200;
            res.messgae = "updated status"
            callback(null, res);
          }).catch(error => {
            callback(null, { status: 400, message: error.message });
          })
        })
        .catch(error => {
          callback(null, { status: 400, message: error.message });
        })
    }
  }

  if (msg.params.path === 'get-orderitem-detail') {
    OrderItemUpdate.findAll({
      where: {
        orderItemId: msg.params.orderItemId
      },
      order: [
        ['createdAt', 'ASC']
      ],
    })
      .then(orderItemUpdates => {
      //  console.log(orderItemUpdates);
        res.data = orderItemUpdates;
        res.status = 200
        callback(null, res)
      }).catch(error => {
        res.status = 400;
        res.error = error;
        callback(null, res)
      })
  }

}


exports.handle_request = handle_request;
