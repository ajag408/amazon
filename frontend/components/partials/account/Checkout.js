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
            storage: '',
            cartTotal: '',
            cartItems: [],

        };
    }


    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            console.log("hello")
            
            const {storage} = this.state;
            // alert(storage.role);
            // console.log(storage);
            if(!storage.token || storage.role != "Customer"){
                
                Router.push('/account/login')
            } else {
                //replace hard-coded with local storage id

                // axios.get(`${backendurl}/customer/getCustomer/5ea32fb4716ebc4f57fd8ae9`)
                // .then((res) => {
                //     // console.log("customer address",res.data[0].savedAddresses);
                //     this.setState({
                //         savedAddresses: res.data[0].savedAddresses
                //     })
    
                // });

                axios.get(`${backendurl}/cart/customer/` + storage.user_id + `/show-cart`)
                .then((res) => {
                    console.log(res);
                    if(res.data.cartItems.length == 0){
                        alert("Cart is empty! Go shop!")
                        Router.push('/')
                    } else {
                    this.setState({
                        cartTotal: res.data.cartTotal,
                        cartItems: res.data.cartItems,

                    })
                }
        
    
                });
        
            }
        });
    }
    
        

        render() {
            const { cartTotal, cartItems } = this.state;
            return (
                <div className="ps-checkout ps-section--shopping">
                    <div className="container">
                        <div className="ps-section__header">
                            <h1>Checkout Information</h1>
                        </div>
                        <div className="ps-section__content">
                            <FormCheckoutInformation
                                // amount={amount}
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
    


