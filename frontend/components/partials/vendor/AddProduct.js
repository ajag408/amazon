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
            images : [],
            productCatagory : '',
            savedId :'',
            authFlag : false
        }
        this.addProduct = this.addProduct.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
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

    deleteImage = (event) => {
        const data = {
            id: this.props.product._id,
            imageId : event.target.id
        }
        debugger;
        event.preventDefault();
        axios.post(backendurl+'/product/removeProductImages',data)
        .then((res)=> {
            if(parseInt(res.data.status) === 200 ) {
                console.log("It is inside Delete Image");
                this.setState({
                    images : this.state.images.filter(item => item._id !== event.target.id) 
                })
            }
            
        })
        .catch((error)=> {
            
        }) 
    }

    onChangeFileHandler = (event) => {
        if(event.target.files.length > 5 || (event.target.files.length + this.state.images.length >5)) {
            this.setState({
                errorMsg:"Only 5 files accepted.",
                productImage : ''
            })
        } else{
            this.setState({
                productImage : event.target.files,
                errorMsg :""
            });
        }
       
    }

    componentDidMount(){
        console.log("Inside Add Product", this.props.product)
        debugger;
        this.setState({
            name : !!this.props.product.name ?  this.props.product.name :'' ,
            price: !!this.props.product.price ?  this.props.product.price :'' ,
            desc: !!this.props.product.description ?  this.props.product.description :'' ,
            productCatagory : !!this.props.product.productCategory ?  this.props.product.productCategory :'' ,
            images : !!this.props.product.images ? this.props.product.images : []
        })
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
   let url;
   if(this.props.product._id){
       url = 'editProduct';
   } else {
       url = 'addProduct';
   }
    let formData = new FormData();

    formData.set("id", this.props.product._id);
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
            url: backendurl+'/product/'+url,
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
                Router.push('/vendor/'+localStorage.getItem("user_id"));
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
               
     let  msg , displayCatagory, displayImages;
 
      if(this.state.productCatagories.length > 0) {
          displayCatagory = <select name="productCatagory" value={this.state.productCatagory} onChange={this.inputChangeHandler}>
              {this.state.productCatagories.map(item=> {
                 return <option value={item._id}> {item.name} </option>
              })}    
          </select>
      } else {
        displayCatagory = <div> No Catagory to select from</div>
      } 
       
      if(this.state.images.length > 0) {
          displayImages = <div>
              <div className="row">
              {
                  this.state.images.map((image) => {
                      return <div className="col-sm-2">
                          <img src={image.imageUrl} style={{height :100 , width : 60}} alt="productImage"></img>
                          <div>
                              <button name="deleteImage"  id={image._id} onClick={this.deleteImage} value="Delete" className="ps-btn ps-btn--sm ps-btn--rounded ps-btn--xsm ps-btn--delete">Delete</button>
                          </div>
                          </div>
                  }) }
                  </div>
              { this.state.images.length < 5 ? <div>
                <div className="form-group">
              <input type="file" accept="image/*" onChange={this.onChangeFileHandler}  name="fileName"  id="filename" multiple/>
              </div>
              </div>: <div></div>}  
                            
          </div>
      } else {
        displayImages = <div>
              <input type="file" accept="image/*" onChange={this.onChangeFileHandler}  name="fileName"  id="filename" multiple/> 
        </div>
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
              <input type="text" name="name" value={this.state.name} placeholder="Product Name" id="name" class="form-control" onChange={this.inputChangeHandler} required/>
          </div>
          <div class="form-group">
              <label>  Price </label>
              <input type="number" name="price" min="0" value={this.state.price} placeholder="Product Price" id="price" class="form-control" onChange={this.inputChangeHandler} required/>
          </div>
          <div class="form-group">
              <label>  Description </label>
              <textarea name="desc" id="desc" maxLength="1000" value={this.state.desc}  placeholder="Product Desciption" class="form-control"  onChange={this.inputChangeHandler} required/>
          </div>
          <div class="form-group">
              <label>  Select Product Catagory </label>
             <div> 
            {displayCatagory}
            </div>
          </div>
          {this.props.product._id? <div>
            {displayImages}
            <div class="form-group">
              <input type="submit"  class="btn btn-info"  value="Edit Product"/>
          </div>
          </div> : <div>
          <div class="form-group">
              <label> Upload Images For Product </label>
              <div>
              <input type="file" accept="image/*" onChange={this.onChangeFileHandler}  name="fileName"  id="filename" multiple/>
              </div>
          </div>
          <div class="form-group">
              <input type="submit" class="btn btn-info" value="Add Product"/>
          </div>
              </div>}
        
          </form>
            {msg}
            </div>
        )
    }
}

export default AddProduct;
