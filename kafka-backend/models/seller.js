'use strict';
var mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String
  },
  addresses: {
    type: String
  },
},
{
  timestamps: true
});

module.exports = mongoose.models.Seller || mongoose.model('Seller', SellerSchema);