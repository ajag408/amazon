import React, { useState, useEffect,Component } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import {backendurl} from '../../backendurl';
import axios from 'axios';
import Router from 'next/router';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
class OrderSearch extends Component {
    constructor(props) {
        super(props);
    this.state = {
        
        orders:[],
        searchCriteria:'',
        pageIndex:1,
        orderStatus:'Package Arrived',
        statusFilter:'All'
    };
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
    this.setState({ 
        storage : localStorage
    }, () => {
        const {storage} = this.state;
        if(!storage.token || storage.role != "Admin"){
         //   || storage.role != "Customer"
            Router.push('/account/login')
        } else {
            this.viewOrders();    
        }
    });
     
}
handleLogout(e){
    e.preventDefault();
    console.log("hello")
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    Router.push('/account/login')
};
searchCriteriaChange=(e)=>
{
    this.setState({
        searchCriteria : e.target.value
    })
}

closeModal() {
    this.setState({
        openStatus:false
    });
}

viewOrders=()=>
{
    let data = {
        searchCriteria:this.state.searchCriteria,
        statusFilter:this.state.statusFilter
    }
    axios.post(backendurl +'/admin/orderSearch',data)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let orders=response.data;
            this.setState({
                orders
            });
            console.log(orders)   
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Orders could not be viewed"});
    });
}
openStatus(order) {
    this.setState({
        openStatus: true ,
        orderItemId:order.id
             
    });
}
handleStatusChange=(e)=>{

    this.setState({
        orderStatus: e.target.value
    })
}
onUpdateStatus=(e)=>{
    e.preventDefault()
    const data={orderItemId :this.state.orderItemId,
                orderStatus:this.state.orderStatus      
    };
    axios.post(backendurl +'/admin/orderItemUpdate',data)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            alert("updated status")
            this.setState({
                openStatus:false 
            });
        }
this.viewOrders();
    })
    .catch(err => { 
        this.setState({errorMessage:"Order Item not updated"});
    });
}
handleAll=()=>{
    this.state.statusFilter='All'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}
handlePending=()=>{
    this.state.statusFilter='Pending'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}
handlePaid=()=>{
    this.state.statusFilter='Paid'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}
handlePacking=()=>{
    this.state.statusFilter='Packing'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}

handleOFS=()=>{
    this.state.statusFilter='Out for Shipping'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}
handlePA=()=>{
    this.state.statusFilter='Package Arrived'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}
handleOFD=()=>{
    this.state.statusFilter='Out for Delivery'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}
handleDelivered=()=>{
    this.state.statusFilter='Delivered'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}
handleCancelled=()=>{
    this.state.statusFilter='Cancelled'
    this.setState({
        statusFilter:this.state.statusFilter 
    })
    this.viewOrders();
}


render()
{
let message;let orderList;let orderStatusFilter;
orderStatusFilter=(
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
     {this.state.statusFilter}
    </Dropdown.Toggle>
  
    <Dropdown.Menu>
    <Dropdown.Item onClick={() => this.handleAll()}>All</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handlePending()}>Pending</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handlePaid()}>Paid</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handlePacking()}>Packing</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handleOFS()}>Out for Shipping</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handlePA()}>Package Arrived</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handleOFD()}>Out for Delivery</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handleDelivered()}>Delivered</Dropdown.Item>
    <Dropdown.Item onClick={() => this.handleCancelled()}>Cancelled</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>)

if(this.state.orders)
{
    orderList=(
        <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Sub Order Id</th>
                            <th>Seller Name</th>
                            <th>Order Id</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Order Total</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.map(order =>
                        <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.sellerName}</td>
                        <td>{order.orderId}</td>
                        <td>{order.customerName}</td>
                        <td>{order.productName}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.status}</td>
                        {(order.status=='Out for Shipping'||order.status=='Package Arrived'||order.status=='Out for Delivery')&&
                        <td><Button onClick={() => this.openStatus(order)}>Change Status</Button></td>
                    }
                        </tr>
                    )}
                     </tbody>
                </table>   
    )
}
    return (
        
        <div>
        <nav className="navigation">
        <div className="ps-container">
            <div className="navigation__left">
                <div className="menu--product-categories">
                    <div className="menu__toggle">
                        <span>Order Search</span>
                    </div>
                    <div className="menu__content">
                    </div>
                </div>
            </div>
            <div className="navigation__right">
                
                <ul className="navigation__extra">
                    <li>
                        <Link href="/admin/inventory">
                            <a>Admin Inventory</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/seller-search">
                            <a>Seller Search</a>
                        </Link>
                    </li>
                    <li>
                    <Link href="/admin/analytics">
                            <a>Analytics Dashboard</a>
                        </Link>
                    </li>
                    <li>
                    <Link href='/admin/order-search' >
                            <a onClick={this.handleLogout}>Logout</a>
                        </Link>
                    </li>
                   
                </ul>
            </div>
            
        </div>
    </nav>
   
<br></br>
   <div className="container">
   <div id='statusMessage' style={{color: 'red', display:'none'}}></div>
   
                    
                    <div className="search-div">
                        <div className="panel">
                            <h2>Order Search</h2>
                              
<div className="row">    
    <div className="col-xs-8 col-xs-offset-2">
        <div>
            <div className="input-group-btn">
            </div>
         
            <input type="text" size="100" className="form-control" name="search" placeholder="Seller Name" onChange={this.searchCriteriaChange}/>
            <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
                <button className="btn btn-primary" type="button" onClick={this.viewOrders}><span className="glyphicon glyphicon-search"></span>Search</button>{" "}
                {orderStatusFilter}
            </div>
        </div>
    </div>
</div>

</div>
</div>
<div>

{orderList}
</div>
<Modal
                            isOpen={this.state.openStatus}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                            
                         <form onSubmit={this.onUpdateStatus}>
                         <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Order Status</b></span>
                                </div>
                                <select value={this.state.orderStatus} onChange={this.handleStatusChange}  className="form-control" aria-label="category" aria-describedby="basic-addon1"  required >
                                <option value="Package Arrived">Package Arrived</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                            <center>
                            <Button variant="primary" type="submit">
                                    <b>Update Status</b>
                                    </Button>{" "}
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </form>
                    
                        </Modal>

</div>
    </div>
    
    );
};
}

export default OrderSearch;