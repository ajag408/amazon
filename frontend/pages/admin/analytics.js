import React, { useState, useEffect,Component } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import {backendurl} from '../../backendurl';
import axios from 'axios';
import Router from 'next/router';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip,Legend,Bar } from 'recharts';
class Analytics extends Component {
    constructor(props) {
        super(props);
    this.state = {
        
        orders:[],
        searchCriteria:'',
        pageIndex:1,
        orderStatus:'Package Arrived',
        statusFilter:'All',
        ordersPerDay:[],
        mostSoldProducts:[],
        bestSellers:[],
        bestCustomers:[]
    };
    
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
            this.getOrdersPerDay();
            this.getMostSoldProducts();
            this.getBestSellers();
            this.getBestCustomers();
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

getOrdersPerDay=()=>
{
    axios.get(backendurl +'/analytics/getOrdersPerDay')
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let ordersPerDay=response.data;
            this.setState({
                ordersPerDay  
            });
            console.log("ordersPerDay",ordersPerDay)   
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Categories could not be viewed"});
    });
}
getMostSoldProducts=()=>
{
    axios.get(backendurl +'/analytics/getMostSoldProducts')
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let mostSoldProducts=response.data;
            this.setState({
                mostSoldProducts  
            });
            console.log("mostSoldProducts",mostSoldProducts);  
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Categories could not be viewed"});
    });
}
getBestSellers=()=>
{
    axios.get(backendurl +'/analytics/getBestSellers')
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let bestSellers=response.data;
            this.setState({
                bestSellers  
            });
            console.log("bestSellers",bestSellers);
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Categories could not be viewed"});
    });
}
getBestCustomers=()=>
{
    axios.get(backendurl +'/analytics/getBestCustomers')
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let bestCustomers=response.data;
            this.setState({
                bestCustomers  
            });
            console.log("bestCustomers",bestCustomers);
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Categories could not be viewed"});
    });
}



render()
{
let message;let orderList;let orderStatusFilter;

if(this.state.ordersPerDay)
{
    for(let i=0;i<this.state.ordersPerDay.length;i++)
    {
this.state.ordersPerDay[i].createdAt=this.state.ordersPerDay[i].createdAt.toString().slice(0,10);
    }
}

    return (
        
        <div>
        <nav className="navigation">
        <div className="ps-container">
            <div className="navigation__left">
                <div className="menu--product-categories">
                    <div className="menu__toggle">
                        <span>Analytics Dashboard</span>
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
                    <Link href="/admin/order-search">
                            <a>Order Search</a>
                        </Link>
                    </li>
                    <li>
                    <Link href='/admin/analytics' >
                            <a onClick={this.handleLogout}>Logout</a>
                        </Link>
                    </li>
                   
                </ul>
            </div>
            
        </div>
    </nav>
    <div className="container">
    <div className="row analytics-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Analytics</h2>
                        <div className="col-sm-12">
                            <div className="chart">

                            <h2>Total Orders Per Day</h2>
    <BarChart width={730} height={250} data={ this.state.ordersPerDay}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="createdAt" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="orderCount" fill="#8884d8" />
  
</BarChart>
   <br></br>
   <h2>Most Sold Products</h2>
    <BarChart width={730} height={250} data={ this.state.mostSoldProducts}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="productName" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="totalQuantity" fill="#82ca9d" />
  
</BarChart>
<br></br>
   <h2>Top 5 Sellers Based on Sales</h2>
    <BarChart width={730} height={250} data={ this.state.bestSellers}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="sellerName" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="totalSales" fill="#FF7256" />
  
</BarChart>
<br></br>
   <h2>Top 5 Customers Based on Total Purchase</h2>
    <BarChart width={730} height={250} data={ this.state.bestCustomers}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="customerName" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="totalPurchase" fill="#FFB90F" />
  
</BarChart>
</div>
   </div> 
   </div>
   </div>
   </div>
   </div>
   </div>
    );
};
}

export default Analytics;