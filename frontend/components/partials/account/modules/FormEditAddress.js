import React, { Component } from 'react';
import { backendurl } from './../../../../backendurl';
import Axios from 'axios'; 
import { withRouter } from 'next/router'
import Router from 'next/router';

class FormEditAddress extends Component {

    constructor(props){
        super(props);
        this.state = {
           address : ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    onChangeHandler = (e) => {
        console.log( " name: ", e.target.name ," vale: ", e.target.value);
        e.preventDefault();
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }

    componentDidMount(){
        let address= "";
       if(this.props.router.query.address)
       {
        console.log( " component Did mount: " , JSON.parse(this.props.router.query.address));
        address =  JSON.parse(this.props.router.query.address);
    }
        this.setState({
            addressId: address? address._id: "",
            fullName : address? address.fullName : "",
            streetAddressLine_1: address ? address.streetAddressLine_1:"", 
            streetAddressLine_2 : address? address.streetAddressLine_2: "", 
            city: address ? address.city : "",
            state: address ? address.state : "",
            country: address ? address.country : "",
            zipCode: address ? address.zipCode : "",
            phoneNumber: address ? address.phoneNumber : ""
          
        })
        console.log("Component Did Mount, State has been set: ",this.state);

    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("Inside handle Submit");
        console.log("state is ", this.state);
       
        let data = {
             //TODO take value from customer.
            addressId: this.state.addressId,
            customerId: '5e9e36cf6b95206ad289645f',// Need to change to take from local storage
            fullName:this.state.fullName,
            streetAddressLine_1 : this.state.streetAddressLine_1, 
            streetAddressLine_2 : this.state.streetAddressLine_2, 
            city: this.state.city, 
            state : this.state.state, 
            country : this.state.country, 
            zipCode : this.state.zipCode, 
            phoneNumber : this.state.phoneNumber

        }
        if(this.state.addressId){
            Axios.post(`${backendurl}/customer/edit-address`, data).then(resp => {
                if (resp.status === 200 && resp.data) {
                    this.setState({ product: resp.data, userRating: 1 })
                }
                Router.push({
                    pathname: '/account/addresses'
                    //query: { address: addressDetails }

                })
            }); 
        }else {
        Axios.post(`${backendurl}/customer/add-address`, data).then(resp => {
            if (resp.status === 200 && resp.data) {
                this.setState({ product: resp.data, userRating: 1 })
            }
            Router.push({
                pathname: '/account/addresses'
                //query: { address: addressDetails }

            })
        }); 
    }



       


   
        
    }

    render() { 
        console.log("FormEditAddress is: ", this.state);
        // if(this.state.)
        // { console.log("FormEdit address render address is: ", this.props.router.query.address) } 
        // if (!(this.props.router.query && this.props.router.query.address ))
        // return (<div>

        // </div>)
        return (
            
            <form onSubmit = {this.handleOnSubmit} >
                <div className="ps-form__header">
                    <h3>Billing address</h3>
                </div>
                <div className="ps-form__content">
                    <div className="form-group">
                        <label>
                            Full Name <sup>*</sup>
                        </label>
                    
                        <input type="text" placeholder="" name="fullName" value={this.state.fullName} className="form-control" onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Street Address Line 1
                        </label>
                        <input type="text" placeholder="" className="form-control" name="streetAddressLine_1" value={this.state.streetAddressLine_1 } onChange={this.onChangeHandler}/>
                    </div>
                   
                    <div className="form-group">
                        <label>
                            Street Address Line 2 <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" name="streetAddressLine_2" value={this.state.streetAddressLine_2} onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>
                            City <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" name="city" value={this.state.city } onChange={this.onChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label>
                            State <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" name="state" value={this.state.state} onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Country <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" name="country" value={this.state.country} onChange={this.onChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label>
                            Zip code <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" name="zipCode" value={this.state.zipCode } onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>
                            Phone Number <sup>*</sup>
                        </label>
                        <input type="text" placeholder="" className="form-control" name="phoneNumber" value={this.state.phoneNumber } onChange={this.onChangeHandler}/>
                    </div>
                    <div className="form-group submit">
                        <button className="ps-btn" name = "but">Save Address</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter (FormEditAddress);
//export default FormEditAddress;
