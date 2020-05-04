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

ProductSchema.virtual('ratings').get(function(){
  if(!this.ratingAndReviews || this.ratingAndReviews.length < 1){
    return 0;
  }
  let totalRating = (this.ratingAndReviews || []).reduce((totalRating,ratingAndReview)=>{
    return totalRating + ratingAndReview.rating;
  },0)
  return roundHalf(totalRating/this.ratingAndReviews.length);
});

function roundHalf(num) {
  return Math.round(num*2)/2;
}

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
