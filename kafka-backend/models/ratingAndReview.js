'use strict';
var mongoose = require('mongoose');

const RatingAndReviewSchema = new mongoose.Schema({
  product:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true,
  },
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

module.exports = mongoose.models.RatingAndReview || mongoose.model('RatingAndReview', RatingAndReviewSchema);