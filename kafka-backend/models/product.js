'use strict';
var mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  }
})

const RatingAndReviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Customer',
    required: true,
  },
  rating:{
    type: Number,
    required: true,
  },
  review:{
    type: String,
    required: true,
  }
},
{
  timestamps: true
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Seller',
    required: true
  },
  productCategory: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [ImageSchema],
    default: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5']
  },
  ratingAndReviews: {
    type: [RatingAndReviewSchema],
    default: [],
  },
  ratings: {
    type: Number,
    required: true,
    default: 0.0
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);