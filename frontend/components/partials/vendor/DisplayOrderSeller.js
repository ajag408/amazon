import React, { Component } from 'react';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import Router from 'next/router';

class DisplayOrderSeller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //  role : localStorage.getItem("role"),
            storage: localStorage,
            editFlag : true,
            status : '',
            updateMsg : ''

        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.displayProduct = this.displayProduct.bind(this); 
        this.displayOrder = this.displayOrder.bind(this);
    }

    inputChangeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            errorMsg: ""
        });
        console.log(name + " " + value);
    }

    onClickHandler = (e) => {
        this.setState(prevState => ({
            editFlag: !prevState.editFlag
        }));
    }

    displayOrder = () => {
       debugger
       console.log(this.props.order);
       let orderDetails =JSON.stringify(this.props.order)
        Router.push({
           
                pathname: '/order/displayOrder',
                query: { order: orderDetails }
            
        })
   //     Router.push('/order/'+JSON.stringify(this.props.order));
    }

    displayProduct = () => {
        debugger
        console.log(this.props.order);
        let productId = this.props.order.productId
         Router.push({           
                 pathname: '/product',
                 query: { pid : productId }
             
         })
    //     Router.push('/order/'+JSON.stringify(this.props.order));
     }

    updateOrderStatus = () =>{

        if(this.state.status !== this.props.order.status) {
            const data ={
                id : this.props.order.id,
                status : this.state.status,
                updateMsg : this.state.updateMsg
            }
            axios.post(backendurl+'/order/seller/updateOrderStatus', data)
            .then((res)=> {
               if(parseInt(res.data.status) === 200) {         
                   console.log("Order Status Updated");
                   this.onClickHandler();
               } else {
                   this.setState({
                       errorMsg : res.data.error
                   })
               }
            })
            .catch((error)=> {
                this.setState({
                    errorMsg : "System Error"
                })
            }) 
        } else {
            this.onClickHandler();
        }
    }

    componentDidMount() {
        this.setState({
            status : this.props.order.status
        })
    }

    addProduct = (e) => {

        e.preventDefault();
    }

    render() {

        let msg, editFields;
   
        if (this.state.editFlag) {
            editFields = 
                <td > {this.state.status}  &nbsp;&nbsp;&nbsp;
                 <input type="button"  name="Edit" onClick={this.onClickHandler} id="editOrder"  class="btn btn-primary" value="Edit Order"/> </td>;
          
        } else {
            editFields = 
                 
                <td>
                 <select name="status" id="status" onChange={this.inputChangeHandler}>
                    <option value={this.props.order.status}>{this.props.order.status}</option>
                    <option value="Packing">Recent Orders</option>
                    <option value="Out for Shipping">Out for Shipping</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
               &nbsp;&nbsp;&nbsp;
                <input type="text" placeholder="Add Message" name="updateMsg" id="updateMsg" onChange={this.inputChangeHandler} /> 
                &nbsp;&nbsp;&nbsp;
                <input type="button" onClick={this.updateOrderStatus} name="updateOrderStatus" id="updateOrderStatus"  class="btn btn-primary" value="Update Order Status"/> 
                </td>
           
        }

        return (
                <tr>
                    <td> {this.props.index +1} </td>
                    <td> <button type="button" class="btn btn-outline-primary"  name="displayOrderDetails" onClick={this.displayOrder}>
                       {this.props.order.orderId}
                       </button>
                    </td>
                    <td> 
                    <button type="button" class="btn btn-outline-primary"  name="displayProductDetails" onClick={this.displayProduct}>
                    {this.props.order.productId}
                    </button>
                       </td>
                    <td> {this.props.order.quantity}</td>
                    <td> {this.props.order.totalPrice} </td>
                    {editFields}
               </tr>
          
            
        )
    }
}

export default DisplayOrderSeller;
