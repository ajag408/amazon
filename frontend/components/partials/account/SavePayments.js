import React, { Component } from 'react';
import Link from 'next/link';

import { Form, Input, Select, Collapse, message} from 'antd';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import  Router  from 'next/router';
import {backendurl} from './../../../backendurl';
import Moment from 'moment';
const { Panel } = Collapse;
import {
    CardActions,
    CardContent,
    Divider,
    Button,
    TextField,
  } from '@material-ui/core';
class ManagePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: '',
            savedPayments: []
        };
    }

    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            console.log("hello")
            const {storage} = this.state;
            if(!storage.token || storage.role !== "Customer"){

                Router.push('/account/login')
            } else {
                console.log(storage.user_id);
                axios.get(`${backendurl}/customer/getCustomer/` + storage.user_id)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        savedPayments: res.data[0].savedPaymentOptions
                        
                    },()=>{
                        // console.log(moment(this.state.savedPayments[0].expirationDate))
                    })
    
                });
            }
        });
    }



    handleAddPayment = e => {
        e.preventDefault();
     
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('got payment from new form')
                    console.log(values)
                    
                    axios.post(`${backendurl}/customer/addPayment/` + this.state.storage.user_id, values)
                    .then((res) => {
                    //   console.log(res);
                      this.props.form.setFieldsValue({
                        NameOnCard: '', cardNumber: '', expirationDate: '', cvv: ''}
                      , () => {
                        axios.get(`${backendurl}/customer/getCustomer/` + this.state.storage.user_id)
                        .then((res) => {
                            console.log(res);
                            this.setState({
                                savedPayments: res.data[0].savedPaymentOptions
                                
                            })
            
                        });
                      });
                      })
                    
                } else {
                }
            });
                
        
    }

    handleEditPayment = e => {
        e.preventDefault();
        
        const paymentObject = {
            id: e.currentTarget.id,
            NameOnCard: e.currentTarget.NameOnCard.value,
            cardNumber: e.currentTarget.cardNumber.value,
            expirationDate: e.currentTarget.expirationDate.value,
            cvv: e.currentTarget.cvv.value,

          };        
          console.log(paymentObject)    
        if(paymentObject.NameOnCard == '' || paymentObject.cardNumber == '' || paymentObject.expirationDate == '' || paymentObject.cvv == ''){
            message.error('Please enter values for all fields');
        } else {
            axios.post(`${backendurl}/customer/editPayment/` + this.state.storage.user_id, paymentObject)
            .then((res) => {
                axios.get(`${backendurl}/customer/getCustomer/` + this.state.storage.user_id)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        savedPayments: res.data[0].savedPaymentOptions
                        
                    })
    
                });
              });
              
        }
        
    }

    handleDeletePayment = e => {
        e.preventDefault();
        
        const paymentObject = {
            id: e.currentTarget.value,
          };        
          console.log(paymentObject)    
            axios.post(`${backendurl}/customer/deletePayment/` + this.state.storage.user_id, paymentObject)
            .then((res) => {
                axios.get(`${backendurl}/customer/getCustomer/` + this.state.storage.user_id)
                .then((res) => {
                    console.log(res);
                    this.setState({
                        savedPayments: res.data[0].savedPaymentOptions
                        
                    })
                    
    
                });
              });
              
        
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // const accountLinks = [
        //     {
        //         text: 'Account Information',
        //         url: '/account/user-information',
        //         icon: 'icon-user',
        //     },
        //     {
        //         text: 'Notifications',
        //         url: '/account/notifications',
        //         icon: 'icon-alarm-ringing',
        //     },
        //     {
        //         text: 'Invoices',
        //         url: '/account/invoices',
        //         icon: 'icon-papers',
        //     },
        //     {
        //         text: 'Address',
        //         url: '/account/addresses',
        //         icon: 'icon-map-marker',
        //         active: true,
        //     },
        //     {
        //         text: 'Recent Viewed Product',
        //         url: '/account/recent-viewed-product',
        //         icon: 'icon-store',
        //     },
        //     {
        //         text: 'Wishlist',
        //         url: '/account/wishlist',
        //         icon: 'icon-heart',
        //     },
        // ];
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <img src="/static/img/users/3.jpg" />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>username@gmail.com</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map(link => (
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? 'active'
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <Link href="/account/my-account">
                                                    <a>
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div> */}
                        <div className="col-lg-12">
                            <div className="ps-page__content">
                       
                                <div className="ps-form__header">
                                    <h3>Add New Payment</h3>
                                </div>
                                <Form onSubmit = {this.handleAddPayment}>
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
                            </div>
                        </div>
                    </div>
                    
                    </div>
                    
                    <div className="container">
                    <div className="row">
                        
                        <div className="col-lg-12">
                            <div className="ps-page__content">
                        <h3 className="ps-form__heading">
                                    Edit/Delete Saved Payment 
                                </h3>
                                            <Collapse accordion>
                                            {this.state.savedPayments.map((payment, i) =>(
                                            
                                                
                                                    <Panel header = {payment.NameOnCard}>
                                                                <form
                                                                    autoComplete="off"
                                                                    noValidate
                                                                    id = {payment._id}
                                                                    onSubmit={this.handleEditPayment}
                                                                    >

                                                                    <Divider />
                                                                    <CardContent>
                                                                        <Grid
                                                                        container
                                                                        spacing={3}
                                                                        >
                                                                        <Grid
                                                                            item
                                                                            md={6}
                                                                            xs={12}
                                                                        >
                                                
                                                                            Name On Card
                                                                            <TextField
                                                                            fullWidth
                                                                            // label = "Name On Card"
                                                                            id = "NameOnCard"
                                                                            margin="dense"
                                                                            required
                                                                            name="NameOnCard"
                                                                            // onChange={onChangeCollegeName}
                                                                            required
                                                                            // label={education.collegeName}
                                                                            defaultValue = {payment.NameOnCard}
                                                                            // labellaceholder={collegeName}
                                                                            variant="outlined"
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            md={6}
                                                                            xs={12}
                                                                        >
                                                                            Card Number
                                                                            <TextField
                                                                            fullWidth
                                                                            
                                                                            // label = "Card Number"
                                                                            id = 'cardNumber'
                                                                            margin="dense"
                                                                            name="cardNumber"
                                                                            // onChange={(value)=>value}
                                                                            // label={education.loc}
                                                                            defaultValue={payment.cardNumber}
                                                                            variant="outlined"
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            md={6}
                                                                            xs={12}
                                                                        >
                                                                            Expiration Date
                                                                            <TextField
                                                                            fullWidth
                                                                            // label = "Expiration Date"
                                                                            id = 'expirationDate'
                                                                            type = "date"
                                                                            margin="dense"
                                                                            name="expirationDate"
                                                                            // onChange={onChangeDegree}
                                                                            // label={education.degree}
                                                                            defaultValue={Moment(payment.expirationDate).format('yyyy-MM-DD')}
                                                                            
                                                                            variant="outlined"
                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            md={6}
                                                                            xs={12}
                                                                        >
                                                                            CVV
                                                                            <TextField
                                                                            fullWidth
                                                                            // label = "CVV"
                                                                            id = 'cvv'
                                                                            margin="dense"
                                                                            name="cvv"
                                                                            // onChange={onChangeMajor}
                                                                            // label={education.major}
                                                                            defaultValue={payment.cvv}
                                                                            variant="outlined"
                                                                            />
                                                                        </Grid>
                                                                       </Grid>
                                                                    </CardContent>
                                                                    <Divider />
                                                                    <CardActions>
                                                                        <Button
                                                                        
                                                                        type = "submit"
                                                                        color="primary"
                                                                        variant="contained"
                                                                        
                                                                        >
                                                                        Update
                                                                        </Button>
                                                                        <Button
                                                                        color="primary"
                                                                        variant="contained"
                                                                        onClick={this.handleDeletePayment}
                                                                        value= {payment._id}
                                                                        >
                                                                        Delete
                                                                        </Button>
                                                                    </CardActions>
                                                                </form>
                                                        
                                                    </Panel> 
                                                    
                                            ))}
                                                </Collapse><br></br><br></br>
                    </div>
                </div>
                </div>
                </div>
            </section>
        );
    }
}

const SavePayment = Form.create()(ManagePayment);

export default SavePayment;
