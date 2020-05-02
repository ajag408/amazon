import React, { Component } from 'react';
import axios from 'axios';
import {backendurl} from '../../../backendurl';
import Router from 'next/router';
import DisplayOrderSeller from './DisplayOrderSeller';

class ListOrder extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          //  role : localStorage.getItem("role"),
            storage : localStorage,
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

        console.log("User Id" , this.state.storage.user_id);
        axios.get(backendurl+'/order/seller/getAllOrder/'+this.state.storage.user_id+'/0')
        .then((res)=> {
            console.log("re")
             this.setState({
                allOrders : res.data ,
             })
        })
        .catch((error)=> {
 
        }) 
    }

    getMessageThread = (sellerId) => {
        
        // event.preventDefault();
         this.props.getMessageThread(this.state.userId,from,"GET_MESSAGE_THREAD")
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
            <div class="container">
             <h2> List Order </h2>
             <div className="table-responsive">
             <table className="table ps-table--faqs">
             <thead>
                <tr>
                <th>Index</th>
                <th>OrderId</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Change Status</th>
                </tr>
            </thead>
               {displayAllOrders}
            </table>
             </div>
             {msg}
            </div>
        )
    }
}

export default ListOrder;
