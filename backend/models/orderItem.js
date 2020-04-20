'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    
    productId: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    sellerId: {
      type: DataTypes.STRING,
      allowNull:false,
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
            'Delivered'
          ]],
          msg: 'Not a valid State'
        }
      }

    }
  }, {});

  // class methods
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Order, {
    });
    OrderItem.hasMany(models.OrderItemUpdate, {
    });
  };
  return OrderItem;
};