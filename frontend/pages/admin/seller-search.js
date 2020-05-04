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
        searchCriteria:'',
        products:[],
        pageIndex:1,
        sales:[]
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
        viewProductsModalFlag:false,
        viewSalesModalFlag:false,
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

viewProductsModal=async(seller)=>{
    await this.setState({ 
        viewProductsModalFlag:true,
        sellerId:seller._id,
        sellerName:seller.name
  });
  this.viewProducts();
 }
viewProducts=()=>
{
    let data = {
        sellerId:this.state.sellerId,
        pageIndex:this.state.pageIndex
    }
    axios.post(backendurl +'/admin/getProductsOfSeller',data)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let products=response.data;
            this.setState({
                products
            });
            console.log(products)   
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Products could not be viewed"});
    });
}
pageCountInc=async()=>{
    
    if((this.state.products.length)==50)
    {
   await this.setState({
    
        pageIndex:this.state.pageIndex+1 
        
    })
}
this.viewProducts();
}
pageCountDec=async()=>{
    if(this.state.pageIndex>1)
    {
    await this.setState({
        pageIndex:this.state.pageIndex-1 
    }) 
}
this.viewProducts();
}
viewSalesModal=async(seller)=>{
    await this.setState({ 
        viewSalesModalFlag:true,
        sellerId:seller._id,
        sellerName:seller.name
  });
  this.viewSales();
 }
 viewSales=()=>
 {
        let data = {
            sellerId:this.state.sellerId
        }
        axios.post(backendurl +'/admin/getSalesOfSeller',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                let sales=response.data;
            for(let i=0;i<sales.length;i++)
            {
               if(sales[i].salesMonth==1)
               sales[i].salesMonth='JANUARY'
               else if(sales[i].salesMonth==2)
               sales[i].salesMonth='FEBRUARY'
               else if(sales[i].salesMonth==3)
               sales[i].salesMonth='MARCH'
               else if(sales[i].salesMonth==4)
               sales[i].salesMonth='APRIL'
               else if(sales[i].salesMonth==5)
               sales[i].salesMonth='MAY'
               else if(sales[i].salesMonth==6)
               sales[i].salesMonth='JUNE'
               else if(sales[i].salesMonth==7)
               sales[i].salesMonth='JULY'
               else if(sales[i].salesMonth==8)
               sales[i].salesMonth='AUGUST'
               else if(sales[i].salesMonth==9)
               sales[i].salesMonth='SEPTEMBER'
               else if(sales[i].salesMonth==10)
               sales[i].salesMonth='OCTOBER'
               else if(sales[i].salesMonth==11)
               sales[i].salesMonth='NOVEMBER'
               else if(sales[i].salesMonth==12)
               sales[i].salesMonth='DECEMBER'
            }
                this.setState({
                    sales
                });
                console.log(sales)   
            }
        })
        .catch(err => { 
            this.setState({errorMessage:"Products could not be viewed"});
        });
 }
render()
{
let message;let sellerList;let salesMessage;

if(this.state.products.length==0)
{
  message=( <div><h3>No Products Available</h3></div> )

}
if(this.state.sales.length==0)
{
  salesMessage=( <div><h3>No Sales Data To Show</h3></div> )

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
                        <td><Button onClick={() => this.viewProductsModal(seller)}>View Products</Button></td>
                        <td><Button onClick={() => this.viewSalesModal(seller)}>View Sales</Button></td>
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
                        <Link href="/admin/order-search">
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
<Modal
                            isOpen={this.state.viewProductsModalFlag}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           <div>             
                            <div className="container">
                            <div className="panel panel-default">
                            <div className="panel-heading"><h3>{this.state.sellerName}</h3> </div>
                            {message}
                            <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map(product =>
                        <tr key={product._id}>
                        <td>{product.name} </td>
                        <td>{product.description} </td>
                        <td>{product.price} </td>
                          
                        </tr>
                    )}
                     </tbody>
                </table>
                <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item">
      <a className="page-link" href="#" onClick={() => this.pageCountDec()} tabIndex="-1">Previous</a>
    </li>
                <li className="page-item"><a className="page-link" href="#">{this.state.pageIndex}</a></li>
    <li className="page-item">
      <a className="page-link" href="#" onClick={() => this.pageCountInc()}>Next</a>
    </li>
  </ul>
</nav>
</div>
     <center> 
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </div>
                        </Modal>

                        <Modal
                            isOpen={this.state.viewSalesModalFlag}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           <div>             
                            <div className="container">
                            <div className="panel panel-default">
                            <div className="panel-heading"><h3>{this.state.sellerName}</h3> </div>
                            {salesMessage}
                            <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>Sales Month</th>
                        <th>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.sales.map(sale =>
                        <tr>
                        <td>{sale.salesMonth} </td>
                        <td>{sale.totalAmount} </td>
                        </tr>
                    )}
                     </tbody>
                </table>
                <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>
            <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item">
      <a className="page-link" href="#" onClick={() => this.pageCountDec()} tabIndex="-1">Previous</a>
    </li>
                <li className="page-item"><a className="page-link" href="#">{this.state.pageIndex}</a></li>
    <li className="page-item">
      <a className="page-link" href="#" onClick={() => this.pageCountInc()}>Next</a>
    </li>
  </ul>
</nav>
</div>
     <center> 
                                <Button variant="primary" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </div>
                        </Modal>
    
                      

    </div>
    
    );
};
}

export default SellerSearch;