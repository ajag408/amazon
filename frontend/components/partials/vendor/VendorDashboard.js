import React, { Component } from 'react';
import axios from 'axios';
import {backendurl} from '../../../backendurl';
import Router from 'next/router';
import DisplayOrderSeller from './DisplayOrderSeller';
class VendorDashboard extends Component {
   
    
    constructor(props) {
        super(props);
        this.state = {
          //  role : localStorage.getItem("role"),
          //  storage : localStorage,
           allOrders : []
        }
     
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    inputChangeHandler = (event) => {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
        this.setState({
          [name]: value,
          errorMsg :""
        });
        console.log(name+" "+value);
    }

    componentDidMount() {

        const id = '5e8187df8bea9e66dcedbf99';
       // console.log("User Id" , this.state.storage.user_id);
        axios.get(backendurl+'/order/seller/getAllOrder/'+id+'/0')
        .then((res)=> {
            console.log("re")
             this.setState({
                allOrders : res.data ,
             })
        })
        .catch((error)=> {
 
        }) 
    }

    render() {
               
     let  msg, displayAllOrders , editFields ;
       
        if(this.state.allOrders.length > 0) {
            displayAllOrders =   
            this.state.allOrders.map( (order,index) => {
                return <DisplayOrderSeller order={order} index={index}></DisplayOrderSeller>;
            }) 
           
        }   else {
            displayAllOrders = <div> No Orders placed. </div>
        } 


        if (this.state.errorMsg) {
            msg = <div class="alert alert-danger" role="alert">{this.state.errorMsg}</div>;
        }

        return (
          <div className="ps-vendor-dashboard">
        <div className="container">
            <div className="ps-section__header" style={{padding : '10px'}}>
                <h3> Order Details </h3>
            </div>
            <div className="ps-section__content">
                <ul className="ps-section__links">
                    <li className="active">
                        <a href="#">All Orders</a>
                    </li>
                    <li>
                        <a href="/vendor/openorders">Open Orders </a>
                    </li>
                    <li>
                        <a href="/vendor/deliverdorders">Delieverd Or Cancelled Order</a>
                    </li>
                </ul>
                <div className="ps-block--vendor-dashboard">
                    <div className="ps-block__header">
                        <h3>Sale Report</h3>
                    </div>
                    <div className="ps-block__content">
                        <div className="table-responsive">
                            <table className="table ps-table ps-table--vendor">
                                <thead>
                                    <tr>
                                    <th>Index</th>
                                        <th>OrderId</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th> Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayAllOrders}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
}

export default VendorDashboard;
