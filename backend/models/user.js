'use strict';
const crypto = require('crypto')
var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
let Customer = require('./customer');
let Seller = require('./seller');

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    unique: [true,'Email address has to be unique'],
    required: [true,'Email address has to be unique'],
    
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ['Customer', 'Seller', 'Admin']
  }
},
{
  timestamps: true
});

UserSchema.plugin(uniqueValidator);

UserSchema.generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
};
UserSchema.encryptPassword = (plainText, salt) => {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

UserSchema.virtual('profile').get(function(){
  switch(this.role){
    case 'Customer':
      return Customer.findOne({user: this._id});
    case 'Seller':
      return Seller.findOne({user: this._id});
    default: null;
  }
});

UserSchema.methods.is_password_valid = function(password){
    return this.password === UserSchema.encryptPassword(password, this.salt);
};

UserSchema.pre('save',function(next){
  if (this.isNew) {
    this.salt = UserSchema.generateSalt();
    this.password = UserSchema.encryptPassword(this.password, this.salt);
  }
  next();
});

module.exports = mongoose.model('users',UserSchema)

