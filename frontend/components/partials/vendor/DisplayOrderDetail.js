import React, { Component } from 'react';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import Link from 'next/router';
import Router from 'next/router';

class DisplayOrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
          

        }

        this.orderItemDetails = this.orderItemDetails.bind(this);
    }

    componentDidMount() {
        console.log("In component",this.props);
       this.setState({
           order : this.props.details
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
                      <span>{this.props.details.order.address}</span>
                </div>
                <div>
                    <label className="h3"> Card Details : </label>
                    <span>{this.props.details.order.card}</span>
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
