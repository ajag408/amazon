import React, { useState, useEffect,Component } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import {backendurl} from '../../backendurl';
import axios from 'axios';

class AdminInventory extends Component {
    constructor(props) {
        super(props);
    this.state = {
        productCategory:'',
        addCategoryIsOpen:false,
        viewCategoryModal:false,
        productCategories:[],
        statusMessage:'',
        errorMessage:'',
        categoryDetails:[]
    };
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
    this.viewProductCategories();   
}

addCategoryModal=()=>
{
    this.setState({
        addCategoryIsOpen: true      
    });
}
closeModal() {
    this.setState({
        addCategoryIsOpen: false ,
        viewCategoryModal:false
    });
}
productCategoryChange=(e)=>
    {
        this.setState({
            productCategory: e.target.value
        })
    }
onAddSubmit=(e)=>
{
    e.preventDefault()
    let data = {
        productCategory:this.state.productCategory
    }
    console.log(data);
    axios.post(backendurl +'/admin/addProductCategory',data)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            this.setState({
                addCategoryIsOpen : false,
                statusMessage:"Product category added successfully"
            })
            console.log("success")
            var status = document.getElementById('statusMessage');
            console.log(status);
            status.innerHTML = 'Successfully added product category';
            status.style.color = "green";
            status.style.display = "block";
            this.viewProductCategories();
        }
     
    })
    .catch(err => { 
        this.setState({errorMessage:err.response.data,
            addCategoryIsOpen : false
        });
        var status = document.getElementById('statusMessage');
        status.innerHTML = err.response.data;
        status.style.display = "block";
    });


}
viewProductCategories=()=>
{
    axios.get(backendurl +'/admin/getAllProductCategories')
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
            let productCategories=response.data;
            this.setState({
                productCategories  
            });
            console.log(productCategories)   
        }
    })
    .catch(err => { 
        this.setState({errorMessage:"Categories could not be viewed"});
    });
}

handleCategoryDeletion=async(e)=>{
    await this.setState({
        categoryId:e._id
 });
    const data={
        categoryId:this.state.categoryId
    }
    console.log("data going to category deletion"+JSON.stringify(data));
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    axios.post(backendurl +'/admin/removeProductCategory',data)
    .then(response => {
    if (response.status === 200) {
        console.log(response.data);
        this.setState({
            successFlagDeletion:true,
            statusMessage:"Successfully deleted product category"
        })
        var status = document.getElementById('statusMessage');
        console.log(status);
        status.innerHTML = 'Successfully deleted product category';
        status.style.color = "green";
        status.style.display = "block";
        this.viewProductCategories();
    }  
})
.catch(err => { 
    this.setState({errorMessage:err.response.data});
    var status = document.getElementById('statusMessage');
                            status.innerHTML = err.response.data;
                            status.style.display = "block";
})
}

viewCategoryDetails=async(e)=>{
   await this.setState({ 
       viewCategoryModal:true,
        categoryDetailsId:e._id,
        categoryName:e.name

 });
 const data={
    categoryDetailsId:this.state.categoryDetailsId
}
console.log(data);
  //set the with credentials to true
  axios.defaults.withCredentials = true;
  axios.post(backendurl +'/admin/getProductCategoryDetails',data)
  .then(response => {
  if (response.status === 200) {
      console.log(response.data);
      let categoryDetails=response.data;
      this.setState({
          categoryDetails
      })
      
  }  
})
.catch(err => { 
  this.setState({errorMessage:err.response.data});
  var status = document.getElementById('statusMessage');
                          status.innerHTML = err.response.data;
                          status.style.display = "block";
})

}

render()
{
let productCategoryList;let message;

if(this.state.categoryDetails.length==0)
{
  message=( <div><h3>No products available for this category</h3></div> )

}

if(this.state.productCategories)
{
    productCategoryList=(
        <div className="ps-panel__wrapper">
                <div className="ps-panel__header">
                    <h3>Categories</h3>
                </div>
        {this.state.productCategories.map(productCategory =>
        <div key={productCategory._id}>
            
                <div className="ps-panel__content">
           
            <div key={productCategory._id}>
            
            <h5>{productCategory.name}</h5>
            <div className="panel-footer">
                     <button type="button" id="categoryDelete" className="btn btn-danger" onClick={() => this.handleCategoryDeletion(productCategory)}>Delete Category</button>{"     "}
                     <button type="button" id="categoryDetails" className="btn btn-warning" onClick={() => this.viewCategoryDetails(productCategory)}>Category Details</button>
                    
                     </div>
            </div>
        </div>
       </div>
            )}
            
            </div>
    )
}
    return (
        
        <div>
        <nav className="navigation">
        <div className="ps-container">
            <div className="navigation__left">
                <div className="menu--product-categories">
                    <div className="menu__toggle">
                        
                        <span> Admin Inventory</span>
                    </div>
                    <div className="menu__content">
                       
                    </div>
                </div>
            </div>
            <div className="navigation__right">
                
                <ul className="navigation__extra">
                    <li>
                        <Link href="/vendor/become-a-vendor">
                            <a>Seller Search</a>
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
    
    <button onClick={this.addCategoryModal}
        type="button"
        className="ps-btn ps-btn--fullwidth">
        Add Product Category
    </button>
   <br></br>
   <div className="container">
   <div id='statusMessage' style={{color: 'red', display:'none'}}></div>
<div>

{productCategoryList}
</div>
</div>
    <Modal
                            isOpen={this.state.addCategoryIsOpen}
                            onRequestClose={this.closeAddModal}
                             contentLabel="Example Modal" >
                           
                           <div>
                         <form onSubmit={this.onAddSubmit}>
                             
            <div className="container">
            <div className="panel panel-default">
                    <div className="panel-heading">Product Category Details</div>
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><b>Product Category</b></span>
                                </div>
                                <input type="text" size="50" name="productCategory" className="form-control" aria-label="productCategory" aria-describedby="basic-addon1" onChange={this.productCategoryChange}   pattern=".*\S.*" title="Product Category cannot be spaces" required />
                            </div>
                            <center>
                                <Button variant="warning" type="submit">
                                    <b>Add</b>
                                </Button>&nbsp;&nbsp;
                                <Button variant="danger" onClick={this.closeModal}>
                                    <b>Close</b>
                                </Button>
                            </center>
                            </div>
                            </div>
                        </form>
                        </div>
                       
                        </Modal>
                        <Modal
                            isOpen={this.state.viewCategoryModal}
                            onRequestClose={this.closeModal}
                             contentLabel="Example Modal" >
                           <div>             
                            <div className="container">
                            <div className="panel panel-default">
                            <div className="panel-heading"><h3>{this.state.categoryName}</h3> </div>
                            {message}
                            <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Seller Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.categoryDetails.map(category =>
                        <tr key={category._id}>
                        <td>{category.name} </td>
                        <td>{category.description} </td>
                        <td>{category.price} </td>
                        <td>{category.seller.name} </td>
                        </tr>
                    )}
                     </tbody>
                </table>
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

export default AdminInventory;