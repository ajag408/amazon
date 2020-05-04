'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    
    productId: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    orderId: {
      type: DataTypes.NUMBER,
      allowNull:false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    sellerId: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    sellerName: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull:false,
    },
    individualPrice: {
      type: DataTypes.FLOAT,
      allowNull:false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull:false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isIn: {
          args: [[
            'Pending', 
            'Paid', 
            'Packing', 
            'Out for Shipping', 
            'Package Arrived', 
            'Out for Delivery',
            'Delivered',
            'Cancelled'
          ]],
          msg: 'Not a valid State'
        }
      }

    }
  }, { timestamps: true});

  // class methods
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, {
      as: 'order',
    });
    OrderItem.hasMany(models.OrderItemUpdate, {
      as: 'orderItemUpdate',
    });
  };
  return OrderItem;
};