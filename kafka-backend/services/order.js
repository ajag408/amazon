let models = require('../models')
let Order = models.Order;
let OrderItem = models.OrderItem;
let OrderItemUpdate = models.OrderItemUpdate;
const Op = require('Sequelize').Op

async function handle_request(msg, callback) {
  let res = {};
  if (msg.params.path === 'all-order-by-seller') {
    console.log("Inside order" + typeof Order, "\n", Order);

    let conditions ;
    if(parseInt(msg.params.type) === 1) {
       conditions = { status : {
        [Op.notIn]: ["Delivered", "Cancelled"]
      }} 
      } else if(parseInt(msg.params.type) === 2) {
        conditions = { status : {
         [Op.or]: ["Delivered", "Cancelled"]
       }} 
       } else {
         conditions = {
           status :{
             [Op.notIn] : [" "]
           }
         }
       }
    
    OrderItem.findAll({
      where: Object.assign({},{sellerId: msg.params.sellerId}, conditions),
      include: [{ model: Order, as: 'order' }],
      order: [['createdAt', 'DESC']],
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
    OrderItem.update({ status: msg.body.status }, { where: { id: msg.body.id } })
      .then(result => {
        OrderItemUpdate.create(orderItemUpdate).then((savedObj) => {
          res.status = 200;
          res.messgae = "updated status"
          callback(null, res);
        }).catch(error => {
          callback(null, error);
        })
      })
      .catch(error => {
        callback(null, error);
      })

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
        console.log(orderItemUpdates);
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
