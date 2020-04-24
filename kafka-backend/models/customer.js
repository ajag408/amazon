'use strict';
var mongoose = require('mongoose');

const SavedAddressesSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  streetAddressLine_1: {
    type: String,
    required: true
  },
  streetAddressLine_2: {
    type: String,
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
});

const SavedPaymentOptionSchema = new mongoose.Schema({
  NameOnCard: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  cvv: {
    type: Number,
    required: true,
    type: Number,
    min : 0,
    max : 999
  },
});

const ShoppingCartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  individualPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isGift: {
    type: Number,
    required: true,
    default: false
  },
  giftMessage: {
    type: Number,
  },
  isSavedForLater: {
    type: Boolean,
    required: true,
    default: false
  },
});

const ShoppingCartSchema = new mongoose.Schema({
  cartItems: {
    type: [ShoppingCartItemSchema]
  },
  cartTotal: {
    type: Number,
    required: true
  }
});

const CustomerSchema = new mongoose.Schema({
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
  savedAddresses: {
    type: [SavedAddressesSchema]
  },
  savedPaymentOptions: {
    type: [SavedPaymentOptionSchema]
  },
  shoppingCart: {
    type: ShoppingCartSchema
  },
},
{
  timestamps: true
});

module.exports = mongoose.model.Customer || mongoose.model('Customer', CustomerSchema);