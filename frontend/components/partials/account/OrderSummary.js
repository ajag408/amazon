import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Link from 'next/link';
// import { Form, Input, Select, Collapse,Popconfirm, message } from 'antd';
import axios from 'axios';

import  Router  from 'next/router';
import {backendurl} from './../../../backendurl';

// const { Option } = Select;
// const { Panel } = Collapse;
class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: '',
            shippingAddress: '',
            cartTotal: '',
            cartItems: [],
            payment: '',
            orderId: 0,
            orderStatus: ''
        };
    }
    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            const {storage} = this.state;
            if(!storage.paid || !storage.shippingAddress){

                Router.push('/account/checkout')
            } else {

                axios.get(`${backendurl}/cart/customer/` + storage.user_id +  `/show-cart`)
                .then((res) => {
                    console.log(res.data.cartItems);
                    console.log(storage.payment);
                    console.log(JSON.parse(storage.payment))
                   
                    this.setState({
                        shippingAddress: JSON.parse(storage.shippingAddress),
                        cartTotal: res.data.cartTotal,
                        cartItems: res.data.cartItems,
                        payment: JSON.parse(storage.payment),
                        orderId: storage.orderId,
                        orderStatus: storage.orderStatus

                    }, ()=>{
                        
                        localStorage.removeItem('shippingAddress');
                        localStorage.removeItem('payment');
                        localStorage.removeItem('orderId');
                        localStorage.removeItem('orderStatus');
                        localStorage.removeItem('paid');
                        console.log("storage", localStorage);
                        axios.post(`${backendurl}/cart/customer/` + storage.user_id +  `/clear-cart`)
                        .then((res) => {
                            console.log(res);
                        })
                    })
        
    
                });
        
            }
        });
    }

    render() {
        const { cartTotal, cartItems, shippingAddress, payment, orderId, orderStatus } = this.state;
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Order Summary (Save for Your Records)</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                <h3>Order #: {orderId}</h3>
                                <h3>Order Status: {orderStatus}</h3>
                                <h3>Ship To</h3>
                                    <div className="ps-block__panel">
                                        <figure>
                                                <small>{shippingAddress.fullName}</small>
                                        
                                            </figure>
                                            <figure>
                                                <small>{shippingAddress.streetAddressLine_1}</small></figure>
                                                <figure><small>{shippingAddress.streetAddressLine_2}</small></figure>
                                                <figure><small>{shippingAddress.city}, {shippingAddress.state}, {shippingAddress.country} {shippingAddress.zipCode} </small></figure>
                                           
                                    </div>
                                    <h3>Shipping Method</h3>
                                    <div className="ps-block__panel">
                                        <figure>
                                            <small>
                                                Standard Shipping
                                            </small>
                                            
                                        </figure>
                                    </div>
                                    <h3>Payment Method</h3>
                                    <div className="ps-block__panel">
                                            <figure>
                                                <small>Name on Card: {payment.NameOnCard}</small><br></br>
                                               
                                            </figure>
                                            <figure>
                                                
                                                <small>CVV: {payment.cvv}</small>
                                            </figure>
                                    </div>
                                

                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
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
                                                        //     href="/"
                                                        //     key={product.id}>
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
                                                    //     </Link>
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
                                                    Total (PAID)
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

// const mapStateToProps = state => {
//     return state.cart;
// };


export default OrderSummary;

