import React, { Component } from 'react';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import Link from 'next/router';
import Router from 'next/router';

class DisplayOrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address : {},
            card : {}
        }

        this.orderItemDetails = this.orderItemDetails.bind(this);
    }

    componentDidMount() {
        console.log("In component",this.props);
       this.setState({
           order : this.props.details,
           address : JSON.parse(this.props.details.order.address),
           card : JSON.parse(this.props.details.order.card)
       })
       console.log("In component",this.props.details)
    }

    orderItemDetails = (e) => {
        let trackingId = this.props.details.id;
        console.log('tracking',trackingId);
        Router.push({
            pathname: '/order/trackOrder',
            query: { orderItemId : trackingId }
        
    })
    }

    addProduct = (e) => {

        e.preventDefault();
    }

    render() {

        return (
           <div>
                <div>
                    <label className="h3"> Product Name : </label>
                      <span>{this.props.details.productId}</span>
                </div>
                <div>
                    <label className="h3"> Quantity : </label>
                      <span>{this.props.details.quantity}</span>
                </div>
                <div>
                    <label className="h3"> Delivery Address : </label>
                      <span>{this.state.address.streetAddressLine_1},</span>
                      <div>
                      <span>{this.state.address.streetAddressLine_2}</span>
                      </div>
                      <span>{this.state.address.city} , </span>
                      <span>{this.state.address.state}</span>
                      <div>
                      <span>{this.state.address.country} - </span>
                      <span>{this.state.address.zipCode}</span>
                      </div>
                </div>
                <div>
                    <label className="h3"> Contact Number : </label>
                      <span>{this.state.address.phoneNumber}</span>
                </div>
                <div>
                    <label className="h3"> Card Details : </label>
                    <span>{this.state.card.cardNumber}</span>
                </div>
                <div>
                    <label className="h3"> Order Amount : </label>
                    <span>{this.props.details.totalPrice}</span>
                </div>
                <div>
                    <label className="h3"> Order Item Status : </label>
                    <span>{this.props.details.status}</span>
                </div>
                <div>
                    {/* <Link href="" target="_self">
                        <a> Order Item Details </a>
                    </Link> */}
                    <button type="button" name="orderItemDetails" onClick={this.orderItemDetails}> Order Item Details</button>
                </div>
           </div>
            
        )
    }
}

export default DisplayOrderDetail;
