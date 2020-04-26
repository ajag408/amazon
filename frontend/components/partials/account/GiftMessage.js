import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import {backendurl} from './../../../backendurl';

class GiftMessage extends Component {
    constructor(props) {
        super(props);
        this.handleAddGiftMessage = this.handleAddGiftMessage.bind(this);
        this.handleRemoveGiftMessage = this.handleRemoveGiftMessage.bind(this);
    }

    handleAddGiftMessage(e){
      e.preventDefault();
      let form = e.currentTarget;
      let data = {
        productId: this.props.cartItem.product._id,
        giftMessage: form.giftMessage.value
      }
      Axios.post(`${backendurl}/cart/customer/5ea32fb4716ebc4f57fd8ae9/add-gift-message/`,data).then(resp =>{
          if(resp.status === 200 && resp.data){
              this.props.handler(resp.data);
          }
      })
    }

    handleRemoveGiftMessage(){
      let data = {
        productId: this.props.cartItem.product._id,
      }
      Axios.post(`${backendurl}/cart/customer/5ea32fb4716ebc4f57fd8ae9/remove-gift-message/`,data).then(resp =>{
          if(resp.status === 200 && resp.data){
              this.props.handler(resp.data);
          }
      })
    }
    render() {
        const { cartItem } = this.props;
        if(cartItem.isGift === 1){
          return <a
            href="#"
            onClick={this.handleRemoveGiftMessage}>
            <span>{cartItem.giftMessage}</span>{" "}
            <i className="icon-cross"></i>
          </a>
        }else{
          return (
            <form onSubmit={e => this.handleAddGiftMessage(e)}>
              <textarea name='giftMessage' placeholder='Enter your message' required></textarea>
              <button value='submit'>Add Message</button>
            </form>
          )
        }
    }
}
const mapStateToProps = state => {
    return state.cart;
};
export default connect(mapStateToProps)(GiftMessage);
