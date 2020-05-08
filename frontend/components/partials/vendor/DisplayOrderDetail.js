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
            <div className="ps-block--shipping">
                <div>
                   <div className="h2" style={{color :"black"}}> Product Name  : {this.props.details.productName}</div>
                      &nbsp;&nbsp;<span></span>
                </div>
                <h3>Ship To</h3>
                  <div className="ps-block__panel">
                    <figure>
                      <small>{this.state.address.fullName}</small>

                    </figure>
                    <figure>
                      <small>{this.state.address.streetAddressLine_1}</small>
                    </figure>
                    <figure><small>{this.state.address.streetAddressLine_2}</small></figure>
                    <figure>
                      <small>
                        {this.state.address.city}
                        ,
                        {' '}
                        {this.state.address.state}
                        ,
                        {' '}
                        {this.state.address.country}
                        {' '}
                        {this.state.address.zipCode}
                        {' '}
                      </small>
                    </figure>

                  </div>
                <div className="ps-block__panel">
                    <h3> Contact Number : </h3>
                    <figure>
                      <small>{this.state.address.phoneNumber}
                      </small>
                      </figure>
                </div>
                <div className="ps-block__panel">
                    <h3>  Card Details :</h3>
                    <figure>
                      <small>{this.state.card.cardNumber}
                      </small>
                      </figure>
                </div>
                <div className="ps-block__panel">
                    <div>
                    <div className="h4" style={{color :"black"}}> Quantity <span>{this.props.details.quantity}</span>    </div>           
                </div>
                <div className="h4" style={{color :"black"}}>
                   Order Amount : 
                    <span>{this.props.details.totalPrice}</span>
                </div>
                <div className="h4" style={{color :"black"}}>
                    Order Item Status:
                    <span>{this.props.details.status}</span>
                </div>
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
