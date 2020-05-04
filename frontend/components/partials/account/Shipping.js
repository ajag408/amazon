import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { getCart } from '../../../store/cart/action';
import axios from 'axios';
import Link from 'next/link';
import { Router } from 'next/router';
import {backendurl} from './../../../backendurl';

class Shipping extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storage: '',
            shippingAddress: '',
            cartTotal: '',
            cartItems: []

        };
    }

    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            const {storage} = this.state;
            if(!storage.shippingAddress){

                Router.push('/account/checkout')
            } else {


                axios.get(`${backendurl}/cart/customer/` + storage.user_id+ `/show-cart`)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        shippingAddress: JSON.parse(storage.shippingAddress),
                        cartTotal: res.data.cartTotal,
                        cartItems: res.data.cartItems,

                    }, ()=>{console.log(this.state)})
        
    
                });
        
            }
        });
    }

    render() {
        const { cartTotal, cartItems, shippingAddress } = this.state;
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Shipping Information</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>Name</small>
                                            <p>{shippingAddress.fullName}</p>
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                        <figure>
                                            <small>Ship to</small>
                                            <p>
                                                {shippingAddress.streetAddressLine_1} {shippingAddress.zipCode}</p> 
                                            
                                            <Link href="/account/checkout">
                                                <a>Change</a>
                                            </Link>
                                        </figure>
                                    </div>
                                    <h4>Shipping Method</h4>
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                Standard Shipping
                                            </small>
                                            <strong>$20.00</strong>
                                        </figure>
                                    </div>
                                    <div className="ps-block__footer">
                                        <Link href="/account/checkout">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to information
                                            </a>
                                        </Link>
                                        <Link href="/account/payment">
                                            <a className="ps-btn">
                                                Continue to payment
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                <div className="ps-form__orders">
                                    <div className="ps-block--checkout-order">
                                        <div className="ps-block__content">
                                            <figure>
                                                <figcaption>
                                                    <strong>Product</strong>
                                                    <strong>total</strong>
                                                </figcaption>
                                            </figure>
                                            <figure className="ps-block__items">
                                                {cartItems &&
                                                    cartItems.map(product => (
                                                        // <Link
                                                            // href="/"
                                                            // key={product.id}>
                                                            <a>
                                                                <strong>
                                                                    {
                                                                        product.product.name
                                                                    }
                                                                    <span>
                                                                        x
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </span>
                                                                </strong>
                                                                <small>
                                                                    $
                                                                    {product.totalPrice}
                                                                </small>
                                                            </a>
                                                        // </Link>
                                                    ))}
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Subtotal</strong>
                                                    <small>${cartTotal}</small>
                                                </figcaption>
                                            </figure>
                                            <figure>
                                                <figcaption>
                                                    <strong>Shipping</strong>
                                                    <small>$20.00</small>
                                                </figcaption>
                                            </figure>
                                            <figure className="ps-block__total">
                                                <h3>
                                                    Total
                                                    <strong>
                                                        ${parseInt(cartTotal) + 20}
                                                        .00
                                                    </strong>
                                                </h3>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shipping;
