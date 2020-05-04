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
  // totalPrice: {
  //   type: Number,
  //   required: true
  // },
  isGift: {
    type: Number,
    required: true,
    default: false
  },
  giftMessage: {
    type: String,
    default: ''
  },
  isSavedForLater: {
    type: Boolean,
    required: true,
    default: false
  },
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
ShoppingCartItemSchema.virtual('totalPrice').get(function(){
  return (this.individualPrice * this.quantity) + (this.isGift ? 2 : 0 );
});

const ShoppingCartSchema = new mongoose.Schema({
  cartItems: {
    type: [ShoppingCartItemSchema],
    default: [],
  },
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

ShoppingCartSchema.virtual('cartTotal').get(function(){
  const cartTotal = this.cartItems.reduce((sum,cartItem) =>{
    return cartItem.isSavedForLater ? sum : sum + cartItem.totalPrice
  },0)
  return cartTotal.toFixed(2);
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
    type: ShoppingCartSchema,
    default: {
      cartItems: [],
      cartTotal: 0
    }
  },
},
{
  timestamps: true,
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);