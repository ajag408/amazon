import React, { useState, useEffect,Component } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import {backendurl} from '../../backendurl';
import axios from 'axios';

class SellerSearch extends Component {
    constructor(props) {
        super(props);
    this.state = {
        
        sellers:[],
        searchCriteria:''
    };
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
    this.viewSellers();   
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
        pageIndex:1
    });
}

viewSellers=()=>
{
    let data = {
        searchCriteria:this.state.searchCriteria
    }
    axios.post(backendurl +'/admin/sellerSearch',data)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let sellers=response.data;
            this.setState({
                sellers
            });
            console.log(sellers)   
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Categories could not be viewed"});
    });
}

render()
{
let message;let sellerList;

if(this.state.sellers.length==0)
{
  message=( <div><h3>No Sellers Available</h3></div> )

}

if(this.state.sellers)
{
    sellerList=(
        <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Seller Name</th>
                            <th>Products</th>
                            <th>Monthly Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.sellers.map(seller =>
                        <tr key={seller._id}>
                        <td>{seller.name}</td>
                        <td><Button onClick={() => this.viewProducts(seller)}>View Products</Button></td>
                        <td><Button onClick={() => this.viewSales(seller)}>View Sales</Button></td>
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
                        <span>Seller Search</span>
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
                        <Link href="/account/order-tracking">
                            <a>Order Search</a>
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
                            <h2>Seller Search</h2>
                              
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

{sellerList}
</div>
</div>
    
                      

    </div>
    
    );
};
}

export default SellerSearch;