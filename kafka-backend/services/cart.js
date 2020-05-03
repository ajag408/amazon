const mongoose = require('mongoose');
const Customer = mongoose.models.Customer;
const Product = mongoose.models.Product;

async function handle_request(msg, callback) {
  if(msg.params.path === 'show-cart'){
    let customer = await Customer.findById(msg.params.customerId).populate(
      {path: 'shoppingCart.cartItems.product',
      populate: {
        path: 'seller'
      }})
      // .populate('shoppingCart.cartItems.product')
      .catch(err =>{
      console.log(err);
      callback(null,{error: err});
    });
    callback(null,customer.shoppingCart);
  }
  
  if(msg.params.path === 'add-to-cart'){
    let customer = await Customer.findById(msg.params.customerId).populate('shoppingCart.cartItems.product').catch(e => callback(null,{error: e}));
    let product = await Product.findById(msg.params.productId).catch(e => callback(null,{error: e}));
    if(!customer || !product){
      return callback(null,{error: 'Record Not found'});
    }
    let cartItems = customer.shoppingCart.cartItems;
    let cartItem = cartItems.find(cartItem => {
      return cartItem.product._id.toString() === product._id.toString()
    })
    if(cartItem){
      cartItem.quantity += parseInt(msg.body.quantity || 1)
    }else{
      let item = {
        product: product._id, 
        quantity: parseInt(msg.body.quantity || 1), 
        individualPrice: product.price,
      };
      if(msg.params.giftCardMessage){
        item.isGift = true;
        item.giftMessage = msg.params.giftCardMessage;
      }
      customer.shoppingCart.cartItems.push(item);
    }
    await customer.save().catch(e => callback(null,{error: e}));
    callback(null,customer.shoppingCart);
  };
  
  if(msg.params.path === 'remove-from-cart'){
    let customer = await Customer.findById(msg.params.customerId).populate('shoppingCart.cartItems.product').catch(e => callback(null,{error: e}));
    if(!customer){
      return callback(null,{error: 'Record Not found'});
    }
    let cartItems = customer.shoppingCart.cartItems;
    let cartItem = cartItems.find(cartItem => {
      return cartItem.product._id.toString() === msg.params.productId;
    })
    if(!cartItem){
      return callback(null,{error: 'Product not in cart'});
    }
    if(msg.body.quantity && msg.body.quantity < cartItem.quantity){
      cartItem.quantity -= msg.body.quantity;
    }else{
      customer.shoppingCart.cartItems = cartItems.filter(item => {
        return item.product._id.toString() !== msg.params.productId;
      })
    }
    await customer.save().catch(e => callback(null,{error: e}));
    callback(null,customer.shoppingCart);
  };
  
  if(msg.params.path === 'move-cart-items'){
    const productIds = msg.body.productIds;
    if(!productIds && productIds.length < 1){
      return callback(null,{error:'product ids are empty'});
    }
    let customer = await Customer.findById(msg.params.customerId).populate('shoppingCart.cartItems.product').catch(e => callback(null,{error: e}));
    if(!customer){
      return callback(null,{error: 'Record Not found'});
    }
    let cartItems = customer.shoppingCart.cartItems;
    cartItems.forEach(cartItem => {
      if(productIds.includes(cartItem.product._id.toString())){
        if(msg.params.moveTo === 'cart'){
          cartItem.isSavedForLater = false;
        }else{
          cartItem.isSavedForLater = true;
        }
      }
    })
    await customer.save().catch(e => callback(null,{error: e}));
    return callback(null,customer.shoppingCart);
  } 
  
  
  if(msg.params.path === 'add-gift-message'){
    let customer = await Customer.findById(msg.params.customerId).populate('shoppingCart.cartItems.product').catch(e => callback(null,{error: e}));
    if(!customer){
      return callback(null,{error: 'Record Not found'});
    }
    let cartItems = customer.shoppingCart.cartItems;
    let cartItem = cartItems.find(cartItem => {
      return cartItem.product._id.toString() === msg.body.productId;
    })
    if(!cartItem){
      returncallback(null,{error: 'Product not in cart'});
    }
    cartItem.isGift = true;
    cartItem.giftMessage = msg.body.giftMessage;
    await customer.save().catch(e => callback(null,{error: e}));
    return callback(null,customer.shoppingCart);
  };
  
  if(msg.params.path === 'remove-gift-message'){
    let customer = await Customer.findById(msg.params.customerId).populate('shoppingCart.cartItems.product').catch(e => callback(null,{error: e}));
    if(!customer){
      return callback(null,{error: 'Record Not found'});
    }
    let cartItems = customer.shoppingCart.cartItems;
    let cartItem = cartItems.find(cartItem => {
      return cartItem.product._id.toString() === msg.body.productId;
    })
    if(!cartItem){
      return callback(null,{error: 'Product not in cart'});
    }
    cartItem.isGift = false;
    cartItem.giftMessage = null;
    await customer.save().catch(e => callback(null,{error: e}));
    return callback(null,customer.shoppingCart);
  }; 
}

exports.handle_request = handle_request;
