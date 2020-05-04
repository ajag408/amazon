import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Link from 'next/link';
import { Form, Input, Select, Collapse,Popconfirm, message } from 'antd';
import axios from 'axios';

import  Router  from 'next/router';
import {backendurl} from './../../../backendurl';

const { Option } = Select;
const { Panel } = Collapse;
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: '',
            shippingAddress: '',
            cartTotal: '',
            cartItems: [],
            savedPayments: [],
            orderPayment: '',
            customerName: ''
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

                axios.get(`${backendurl}/customer/getCustomer/` + storage.user_id)
                .then((res) => {
                    // console.log("customer address",res.data[0].savedAddresses);
                    this.setState({
                        savedPayments: res.data[0].savedPaymentOptions,
                        customerName: res.data[0].name
                    })
    
                });

                axios.get(`${backendurl}/cart/customer/` + storage.user_id+ `/show-cart`)
                .then((res) => {
                    console.log(res.data.cartItems);
                    this.setState({
                        shippingAddress: JSON.parse(storage.shippingAddress),
                        cartTotal: res.data.cartTotal,
                        cartItems: res.data.cartItems,

                    }, ()=>{console.log(this.state)})
        
    
                });
        
            }
        });
    }

handlePlaceOrder = e => {
        e.preventDefault();
        if(this.state.orderPayment){
            localStorage.setItem('payment', JSON.stringify(this.state.orderPayment))
            console.log("got payment")
            const orderObject = {
                customerId: this.state.storage.user_id,
                address: this.state.shippingAddress,
                card: this.state.orderPayment,
                deliveryCharge: 20.00,
                finalTotal: parseInt(this.state.cartTotal) + 20.00,
                orderItems: this.state.cartItems,
                customerName: this.state.customerName,

            }
            axios.post(`${backendurl}/customer/placeOrder/` +this.state.storage.user_id, orderObject)
            .then((res) => {
              console.log(res);
              localStorage.setItem("paid", true)
              localStorage.setItem("orderId", res.data.id)
               localStorage.setItem('orderStatus', res.data.status)
              Router.push('/account/order-summary')
              })
        } else {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('got payment from form')
                    console.log(values)
                    localStorage.setItem('payment', JSON.stringify(values))
                    axios.post(`${backendurl}/customer/addPayment/` +this.state.storage.user_id, values)
                    .then((res) => {
                      console.log(res);
                      
                      })
                      const orderObject = {
                        customerId: this.state.storage.user_id,
                        address: this.state.shippingAddress,
                        card: values,
                        deliveryCharge: 20.00,
                        finalTotal: parseInt(this.state.cartTotal) + 20.00,
                        orderItems: this.state.cartItems,
                        customerName: this.state.customerName,

                    }
                    axios.post(`${backendurl}/customer/placeOrder/` +this.state.storage.user_id, orderObject)
                    .then((res) => {
                      console.log(res);
                      localStorage.setItem("paid", true)
                      localStorage.setItem("orderId", res.data.id)
                      localStorage.setItem('orderStatus', res.data.status)
                      Router.push('/account/order-summary')
                    })

                    
                } else {
                }
            });
                
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { cartTotal, cartItems, shippingAddress, savedPayments } = this.state;
        let month = [],
            year = [];
        for (let i = 1; i <= 12; i++) {
            month.push(i);
        }
        for (let i = 2019; i <= 2050; i++) {
            year.push(i);
        }
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Payment</h1>
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
                                    <h3>Payment Methods</h3><br></br>
                                    <h4 className="ps-form__heading">
                                    Select Saved Payment (Click to Select)
                                </h4>
                                            <Collapse accordion>
                                            {this.state.savedPayments.map((payment, i) =>(
                                            
                                                
                                                    <Panel header = {payment.NameOnCard}>
                                                        <p>CVV: {payment.cvv}</p>
                                                        
                                                        <Popconfirm
                                                        title="Use this payment?"
                                                        onConfirm={() =>{
                                                            this.setState({ orderPayment: payment });
                                                            message.success('Payment method saved');
                                                        }}
                                                            
                                                        onCancel={() =>{
                                                            this.setState({ orderPayment: undefined });
                                                            message.error('Payment Method Discarded');
                                                        }}
                                                        okText="Yes"
                                                        cancelText="No"
                                                        >
                                                        <a href = '#'><b>Select</b></a>
                                                        </Popconfirm>
                                                    </Panel> 
                                                    
                                            ))}
                                                </Collapse><br></br><br></br>
                                

                                <h4 className="ps-form__heading">
                                   Or
                                </h4><br></br>
                                <h4 className="ps-form__heading">
                                    Enter and Save New Payment Info
                                </h4>
                                <Form onSubmit = {this.handlePlaceOrder}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator(
                                                    'NameOnCard',
                                                    {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Enter your name!',
                                                            },
                                                        ],
                                                    },
                                                )(
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Name On Card"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div><br></br>

                                    
                                </div>
                                                             
                                <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator('cardNumber', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter your card number!',
                                                        },
                                                    ],
                                                })(
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Card Number"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                <div className="form-group">
                                    <Form.Item>
                                        {getFieldDecorator('expirationDate', {
                                                   rules: [
                                                    {
                                                        required: true,
                                                        message:
                                                            'Expiration date required!',
                                                    },
                                                ],
                                        })(
                                            <Input
                                                className="form-control"
                                                type="date"
                                                placeholder="Expiration Date"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                        {getFieldDecorator('cvv', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        'Enter cvv',
                                                },
                                            ],
                                        })(
                                            <Input
                                                className="form-control"
                                                type="number"
                                                placeholder="CVV"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                  
                                       
  
                                                    <div className="form-group">
                                                        <button className="ps-btn ps-btn--fullwidth">
                                                            Submit
                                                        </button>
                                                    </div>
                                               
        
                                  </Form>
                                    <div className="ps-block__footer">
                                        <Link href="/account/shipping">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to shipping
                                            </a>
                                        </Link>
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

// const mapStateToProps = state => {
//     return state.cart;
// };
const WrapPaymentForm = Form.create()(Payment);

export default WrapPaymentForm;

