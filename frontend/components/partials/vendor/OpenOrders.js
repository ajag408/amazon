import React, { Component } from 'react';
import axios from 'axios';
import {backendurl} from '../../../backendurl';
import Router from 'next/router';

class OpenOrders extends Component {
   
    
    constructor(props) {
        super(props);
        this.state = {
           allOrders : [],
        //    storage : window.localStorage.user_id
        }
     
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
       // this.displayOrderDetail = this.displayOrderDetail(this);
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

        debugger;
        const id = '5e8187df8bea9e66dcedbf99';
        // console.log("User Id" , this.state.storage);
        axios.get(backendurl+'/order/seller/getAllOrder/'+id+'/1')
        .then((res)=> {
            console.log("re")
             this.setState({
                allOrders : res.data,
             })
        })
        .catch((error)=> {

        }) 
    }

    displayOrderDetail = (e) => {

       let id = e.target.id;

       var order = this.state.allOrders.filter((order) =>{
           console.log(id === order.id);
           if(parseInt(id) === parseInt(order.id)){
               return order;
           }
       })

       let orderDetails =JSON.stringify(order[0]);
        Router.push({
                pathname: '/order/displayOrder',
                query: { order: orderDetails }
        }); 
     }

     render() {
               
     let  msg, displayAllOrders , editFields ;
       
     debugger;
        if(this.state.allOrders.length > 0) {
            displayAllOrders =   
            this.state.allOrders.map( (order,index) => {
                return  <tr>
                <td> {index +1} </td>
                <td> <button class="btn btn-outline-primary" id={order.id} onClick={this.displayOrderDetail} name="displayOrderDetails" >
                   {order.orderId}
                   </button>
                </td>
                <td> {order.status} </td>
                </tr>;
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
            <div >
                <h3>Open Orders</h3>

            </div>
            <div className="ps-section__content">
                <ul className="ps-section__links">
                    <li>
                        <a href="/vendor/allorders">All Orders</a>
                    </li>
                    <li className="active">
                        <a href="#">Open Orders </a>
                    </li>
                    <li>
                        <a href="/vendor/deliverdorders">Delieverd Or Cancelled Order</a>
                    </li>
                </ul>
                <div className="ps-block--vendor-dashboard">
                    <div className="ps-block__content">
                        <div className="table-responsive">
                            <table className="table ps-table ps-table--vendor">
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>OrderId</th>
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

export default OpenOrders;
