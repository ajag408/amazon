import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { Form, Input, Collapse,Popconfirm, message } from 'antd';
import {backendurl} from './../../../../backendurl';
const { Panel } = Collapse;


class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);


        this.state = {
            orderAddress: undefined,
            savedAddresses: [],
        };

        axios.get(`${backendurl}/customer/getCustomer/` + localStorage.getItem('user_id'))
        .then((res) => {
            console.log("customer address",res.data[0].savedAddresses);
            this.setState({
                savedAddresses: res.data[0].savedAddresses
            })

        });
    }

    handleLoginSubmit = e => {
        e.preventDefault();
        if(this.state.orderAddress){
            localStorage.setItem("shippingAddress", JSON.stringify(this.state.orderAddress));
            Router.push('/account/shipping')
        } else {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    localStorage.setItem("shippingAddress", JSON.stringify(values));
                    Router.push('/account/shipping');
                } else {
                }
            });
        }

    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const { amount, cartItems, cartTotal } = this.props;

    
        return (
            <Form
                className="ps-form--checkout"
                onSubmit={this.handleLoginSubmit}>
                <div className="ps-form__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-form__billing-info">
                                <h3 className="ps-form__heading">
                                    Select Saved Address (Click to Select)
                                </h3>
                                <Collapse accordion>
                                {this.state.savedAddresses.map((address, i) =>(
                                
                                    
                                        <Panel header = {address.streetAddressLine_1}>
                                            <p>{address.streetAddressLine_2}</p>
                                            <p>{address.city},&nbsp;{address.state},&nbsp;{address.country}&nbsp;{address.zipCode}</p>
                                            <p>{address.phoneNumber}</p>
                                            <Popconfirm
                                            title="Use this address?"
                                            onConfirm={() =>{
                                                this.setState({ orderAddress: address });
                                                message.success('Address Saved');
                                            }}
                                                
                                            onCancel={() =>{
                                                this.setState({ orderAddress: undefined });
                                                message.error('Address Discarded');
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                             >
                                            <a href = '#'><b>Select</b></a>
                                            </Popconfirm>
                                        </Panel>
                                        
                                ))}
                                    </Collapse><br></br><br></br>
                                

                                <h3 className="ps-form__heading">
                                   Or
                                </h3><br></br>
                                <h3 className="ps-form__heading">
                                   Enter New Shipping Address
                                </h3>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator(
                                                    'fullName',
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
                                                        placeholder="Full Name"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div><br></br>

                                    
                                </div>
                                                             
                                <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator('streetAddressLine_1', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter your primary address!',
                                                        },
                                                    ],
                                                })(
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Street Address 1"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                <div className="form-group">
                                    <Form.Item>
                                        {getFieldDecorator('streetAddressLine_2', {
        
                                        })(
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="Secondary Address (optional)"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item>
                                        {getFieldDecorator('state', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        'Enter a state',
                                                },
                                            ],
                                        })(
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="State"
                                            />,
                                        )}
                                    </Form.Item>
                                </div>
                  
                                        <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator('city', {
                                                    rules: [
                                                        {
                                                            required: false,
                                                            message:
                                                                'Enter a city!',
                                                        },
                                                    ],
                                                })(
                                                    <Input
                                                        className="form-control"
                                                        type="city"
                                                        placeholder="City"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
  
                                    <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator('country', {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter a country!',
                                                        },
                                                    ],
                                                })(
                                                    <Input
                                                        className="form-control"
                                                        type="country"
                                                        placeholder="Country"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator(
                                                    'zipCode',
                                                    {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Enter a postal code!',
                                                            },
                                                        ],
                                                    },
                                                )(
                                                    <Input
                                                        className="form-control"
                                                        type="postalCode"
                                                        placeholder="Postal Code"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <Form.Item>
                                                {getFieldDecorator(
                                                    'phoneNumber',
                                                    {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Enter a phone number!',
                                                            },
                                                        ],
                                                    },
                                                )(
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Phone Number"
                                                    />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
 
                                <div className="ps-form__submit">
                                    <Link href="/account/shopping-cart">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to shopping cart
                                        </a>
                                    </Link>
                                    <div className="ps-block__footer">
                                        <button className="ps-btn">
                                            Continue to Shipping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <h3>Your order</h3>
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
                                                            {product.product.name}
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
                                        <figure className="ps-block__shipping">
                                            <h3>Shipping</h3>
                                            <p>Calculated at next step</p>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

const WrapForm = Form.create()(FormCheckoutInformation);

export default WrapForm;
