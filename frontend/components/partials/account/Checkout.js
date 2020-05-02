import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import {backendurl} from './../../../backendurl';
import { Form, Input, Select} from 'antd';
import Link from 'next/link';
const {Option} = Select;

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: ''
        };
    }


    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            console.log("hello")
            const {storage} = this.state;
            if(!storage.token || storage.token === "Admin"){

                Router.push('/account/login')
            } else {
                //replace hard-coded with local storage id
                axios.get(`${backendurl}/cart/customer/5ea32fb4716ebc4f57fd8ae9/show-cart`)
                .then((res) => {
                    console.log(res);
    
                });
        
            }
        });
    }
    
        

        render() {
            const { amount, cartTotal, cartItems } = this.props;
            return (
                <div className="ps-checkout ps-section--shopping">
                    <div className="container">
                        <div className="ps-section__header">
                            <h1>Checkout Information</h1>
                        </div>
                        <div className="ps-section__content">
                            <FormCheckoutInformation
                                amount={amount}
                                cartTotal={cartTotal}
                                cartItems={cartItems}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
    
    
    export default Checkout;
    


