import React, { useState, useEffect,Component } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import {backendurl} from '../../backendurl';
import axios from 'axios';

class OrderSearch extends Component {
    constructor(props) {
        super(props);
    this.state = {
        
        orders:[],
        searchCriteria:'',
        pageIndex:1
    };
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
    this.viewOrders();   
}

searchCriteriaChange=(e)=>
{
    this.setState({
        searchCriteria : e.target.value
    })
}

closeModal() {
    this.setState({
        addCategoryIsOpen: false ,
        viewCategoryModal:false,
        viewProductsModalFlag:false,
        pageIndex:1
    });
}

viewOrders=()=>
{
    let data = {
        searchCriteria:this.state.searchCriteria
    }
    // axios.post(backendurl +'/admin/orderSearch',data)
    // .then(response => {
    //     console.log("Status Code : ",response.status);
    //     if(response.status === 200){
    //         let orders=response.data;
    //         this.setState({
    //             orders
    //         });
    //         console.log(orders)   
    //     }
    // })
    // .catch(err => { 
    //     this.setState({errorMessage:"Orders could not be viewed"});
    // });
}

render()
{
let message;let orderList;

if(this.state.orders)
{
    orderList=(
        <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Order Total</th>
                            <th>Order Date</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.map(order =>
                        <tr key={order.id}>
                        <td>{order.total}</td>
                        <td><Button onClick={() => this.changeStatus(order)}>Change Status</Button></td>
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
                    <Link href="/account/order-tracking">
                            <a>Analytics Dashboard</a>
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
                <button className="btn btn-primary" type="button" onClick={this.viewSellers}><span className="glyphicon glyphicon-search"></span>Search</button>
            </div>
        </div>
    </div>
</div>

</div>
</div>
<div>

{orderList}
</div>
</div>
    </div>
    
    );
};
}

export default OrderSearch;