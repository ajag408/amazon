'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItemUpdate = sequelize.define('OrderItemUpdate', {
    message: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    orderItemId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  }, {});

  // class methods
  OrderItemUpdate.associate = function(models) {
    OrderItemUpdate.belongsTo(models.OrderItem, {
    });
  };
  return OrderItemUpdate;
};