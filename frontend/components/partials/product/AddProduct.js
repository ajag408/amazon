import React, { Component } from 'react';
import axios from 'axios';
import {backendurl} from '../../../backendurl';
import Router from 'next/router';

class AddProduct extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
          //  role : localStorage.getItem("role"),
            productCatagories : [],
            name : '',
            price : '',
            desc : '',
            productImage : [],
            productCatagory : '',
            savedId :'',
            authFlag : false
        }
        this.addProduct = this.addProduct.bind(this);
        this.onChangeFileHandler = this.onChangeFileHandler.bind(this);
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


    onChangeFileHandler = (event) => {
        if(event.target.files.length > 5) {
            this.setState({
                errorMsg:"Only 5 files accepted."
            })
        } else{
            this.setState({
                productImage : event.target.files,
                errorMsg :""
            });
        }
       
    }

    componentDidMount(){
       axios.get(backendurl+'/admin/getAllProductCategories')
       .then((res)=> {
            this.setState({
                productCatagories : res.data 
            })
       })
       .catch((error)=> {

       }) 
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    addProduct = (e) => {

    e.preventDefault();
   
    let formData = new FormData();

    formData.set("seller", localStorage.getItem("user_id"));
    formData.set("name", this.state.name);
    formData.set("desc" ,this.state.desc);
    formData.set("price" , this.state.price);
    formData.set("productCategory" , this.state.productCatagory);
    
    for (const key of Object.keys(this.state.productImage)) {
        formData.append("file", this.state.productImage[key],this.state.productImage[key].name)
      }
        axios({
            method: 'post',
            url: backendurl+'/product/addProduct',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then(response => {
            console.log("Status Code : ", response.status);
            if(parseInt(response.data.status) === 200){
                console.log("Product Saved");
                this.setState({
                    authFlag : true,
                    savedId : response.data.message
                })
                Router.push('/account/login')
            }else if(parseInt(response.data.status) === 400){
                console.log(response.data);
                this.setState({
                    errorMsg : response.data.message,
                    authFlag : false
                })
            }
        }).catch(error => {
            this.setState({
                errorMsg : error.message,
                authFlag : false
            })
        })
    }

    render() {
               
     let  msg , displayCatagory;
 
      if(this.state.productCatagories.length > 0) {
          displayCatagory = <select name="productCatagory" onChange={this.inputChangeHandler}>
              <option value="">  </option>
              {this.state.productCatagories.map(item=> {
                 return <option value={item._id}> {item.name} </option>
              })}    
          </select>
      } else {
        displayCatagory = <div> No Catagory to select from</div>
      } 
       

        if (this.state.errorMsg) {
            msg = <div class="alert alert-danger" role="alert">{this.state.errorMsg}</div>;
        }

        return (
            <div class="container">
             <h2> Add Products </h2>
             <form id="form" onSubmit={this.addProduct}>
          <div class="form-group">
              <label>  Name </label>
              <input type="text" name="name" placeholder="Product Name" id="name" class="form-control" onChange={this.inputChangeHandler} required/>
          </div>
          <div class="form-group">
              <label>  Price </label>
              <input type="number" name="price" min="0"  placeholder="Product Price" id="price" class="form-control" onChange={this.inputChangeHandler} required/>
          </div>
          <div class="form-group">
              <label>  Description </label>
              <textarea name="desc" id="desc" maxLength="1000"  placeholder="Product Desciption" class="form-control"  onChange={this.inputChangeHandler} required/>
          </div>
          <div class="form-group">
              <label>  Select Product Catagory </label>
             <div> 
            {displayCatagory}
            </div>
          </div>
          <div class="form-group">
              <label> Upload Images For Product </label>
              <div>
              <input type="file" accept="image/*" onChange={this.onChangeFileHandler}  name="fileName"  id="filename" multiple/>
              </div>
          </div>
          <div class="form-group">
              <input type="submit"  class="btn btn-info" value="Add Product"/>
          </div>
          </form>
            {msg}
            </div>
        )
    }
}

export default AddProduct;
