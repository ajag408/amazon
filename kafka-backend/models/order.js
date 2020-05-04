'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customerId: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        notNull: 'address cannot be empty'
      }
    },
    card: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        notNull: 'card cannot be empty'
      }
    },
    discount: {
      type: DataTypes.FLOAT,
    },
    deliveryCharge: {
      type: DataTypes.FLOAT,
    },
    tax: {
      type: DataTypes.FLOAT,
    },
    finalTotal: {
      type: DataTypes.FLOAT,
      allowNull:false,
      validate: {
        notNull: 'final total cannot be empty'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isIn: {
          args: [['Payment Processing','Paid','Cancelled']],
          msg: 'Not a valid State'
        }
      }
    }
  }, { timestamps: true});

  // class methods
  Order.associate = function(models) {
    Order.hasMany(models.OrderItem,{
      as: 'orderItem',
    });
  };
  return Order;
};