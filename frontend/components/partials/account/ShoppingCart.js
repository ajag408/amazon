import React, { Component } from 'react';
import Axios from 'axios';
import {backendurl} from './../../../backendurl';
import Router from 'next/router';
import Link from 'next/link';
import GiftMessage from './GiftMessage';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: '',
            setParentState: props.setState
        }
        
    }
    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            const {storage} = this.state;
            // console.log(storage);
            if(!storage.token || storage.role != "Customer"){
                
                Router.push('/account/login')
            }
        });
    }
    handleIncreaseItemQty(product, handler){
        let data = {
            quantity: 1
        }
        Axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/add-to-cart/${product}`,data).then(resp =>{
            if(resp.status === 200 && resp.data){
                handler(resp.data);
            }
        })
    }

    handleDecreaseItemQty(product, handler) {
        let data = {
            quantity: 1
        }
        Axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/remove-from-cart/${product}`,data).then(resp =>{
            if(resp.status === 200 && resp.data){
                handler(resp.data);
            }
        })
    }

    handleRemoveCartItem = (product, handler) => {
        Axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/remove-from-cart/${product}`).then(resp =>{
            if(resp.status === 200 && resp.data){
                handler(resp.data);
            }
        })
    };

    handleSaveForLater = (product, handler) => {
        let data = {
            productIds: [product]
        }
        Axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/move-to-save-for-later`,data).then(resp =>{
            if(resp.status === 200 && resp.data){
                handler(resp.data);
            }
        })
    };

    render() {
        const { cartTotal, cartItems } = this.props.state;
        let currentCartItems = [];
        if (cartItems && cartItems.length > 0) {
            currentCartItems = cartItems;
        }
       
        return (
            <div className="ps-section--shopping ps-shopping-cart">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shopping Cart</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="table-responsive">
                            <table className="table ps-table--shopping-cart">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Gift Message</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCartItems.filter(item => {
                                        return !item.isSavedForLater
                                        }).map(cartItem => (
                                        <tr key={cartItem.product.id}>
                                            <td>
                                                <div className="ps-product--cart">
                                                    <div className="ps-product__thumbnail">
                                                        <Link
                                                            href="/product/[pid]"
                                                            as={`/product/${cartItem.product.id}`}>
                                                            <a>
                                                                <img
                                                                    src={
                                                                        cartItem.product.thumbnail
                                                                    }
                                                                    alt="martfury"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="ps-product__content">
                                                        <Link
                                                            href="/product/[pid]"
                                                            as={`/product/${cartItem.product.id}`}>
                                                            <a className="ps-product__title">
                                                                {cartItem.product.name}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="price">
                                                ${cartItem.product.price}
                                            </td>
                                            <td>
                                                <div className="form-group--number">
                                                    <button
                                                        className="up"
                                                        onClick={e => this.handleIncreaseItemQty(
                                                            cartItem.product._id,this.props.handler
                                                        )}>
                                                        +
                                                    </button>
                                                    <button
                                                        className="down"
                                                        onClick={this.handleDecreaseItemQty.bind(
                                                            this,
                                                            cartItem.product._id,this.props.handler
                                                        )}>
                                                        -
                                                    </button>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="1"
                                                        value={cartItem.quantity}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <GiftMessage cartItem={cartItem} handler={this.props.handler}/>
                                            </td>
                                            <td style={{'text-align': 'center'}}>
                                                $
                                                {cartItem.totalPrice}
                                            </td>
                                            <td style={{'text-align':'center'}}>
                                                <a
                                                    href="#"
                                                    onClick={this.handleSaveForLater.bind(
                                                        this,
                                                        cartItem.product._id,this.props.handler
                                                    )}>
                                                    <i className="icon-heart"></i>
                                                </a>
                                                <br/>
                                                {"  "}
                                                <a
                                                    href="#"
                                                    onClick={this.handleRemoveCartItem.bind(
                                                        this,
                                                        cartItem.product._id,this.props.handler
                                                    )}>
                                                    <i className="icon-cross"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className='cart-total-final'>
                                        <td>
                                            <div className="ps-product--cart">
                                                    Final Total
                                            </div>
                                        </td>
                                        <td className="price">
                                        </td>
                                        <td>
                                            <div className="form-group--number">
                                            </div>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                            $
                                            {cartTotal}
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                                <div className="ps-product--cart">
                                                </div>
                                            </td>
                                            <td className="price">
                                            </td>
                                            <td>
                                                <div className="form-group--number">
                                                </div>
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                            <Link href="/account/checkout">
                                                <a className="ps-btn ps-btn--fullwidth">
                                                    Proceed to checkout
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ShoppingCart;
