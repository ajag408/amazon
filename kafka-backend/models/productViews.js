'use strict';
var mongoose = require('mongoose');

const ProductViewsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  },
  viewCount: {
    type: Number,
    required: true,
    default: 1
  }
},
{
  timestamps: true
});

module.exports = mongoose.models.ProductViews || mongoose.model('ProductViews', ProductViewsSchema);