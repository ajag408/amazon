import React, { Component } from 'react';
import Router from 'next/router';
import axios from 'axios';
//import { backendurl } from '../../../backendurl';
import { notification } from 'antd';
import { backendurl } from './../../../../backendurl';
import Axios from 'axios';

class AddressItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false
            , isDelete: false
            , storage: {}
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            storage: localStorage
        }, () => {
            const { storage } = this.state;
            if (!storage.token) {
                Router.push('/account/login')
            }
        })
    }

    componentWillReceiveProps() {
        console.log("Address received props: ", this.props.address)
    }

    handleEditClick(e) {
        e.preventDefault();
        console.log("Inside Edit click", this.props.address);
        let addressDetails = JSON.stringify(this.props.address)
        Router.push({
            pathname: '/account/edit-address',
            query: { address: addressDetails }

        })
    }


    handleDeleteClick(e) {
        e.preventDefault();
        console.log("Inside handleDelete Click : ", this.props.address);
        //TODO replace customerId to dynamic value
        let data = {
            addressId: this.props.address._id,
            customerId: '5e9e36cf6b95206ad289645f',
        }
        Axios.post(`${backendurl}/customer/delete-address`, data).then(async resp => {
            if (resp.status === 200 && resp.data) {
             await   this.setState({ product: resp.data, userRating: 1 })
            }
        }); 

    }




    render() {
        const { address } = this.props;
     
        return (

            // <div className="ps-product">
            <div>
                {/* <div className="ps-product__container">
                    <div className="ps-product__content"> */}
                    <div>

                    <div>
                    
                        {this.props && this.props.address ? 
                        <p>
                            <div className="data-card">
                        
                            <div className="row">
                                <div className="col-md-9">
                                        <div>{address.fullName}</div>
                                        <div>{address.streetAddressLine_1},  {address.streetAddressLine_2}</div>
                                        <div>{address.city}, {address.state}</div>
                                        <div>{address.country} {address.zipCode}</div>
                                        <div>{address.phoneNumber}</div>
                                </div>
                                <div className="col-md-3">
                                    <div className="row">
                                        <a onClick={this.handleEditClick}>Edit </a>
                                    </div>
                                    <div className="row">
                                        <a onClick={this.handleDeleteClick} >Delete</a>
                                    </div>
                                        
                                </div>
                            </div>
                        </div>  
                               
                        </p> :
                        <div>

                        </div>
                        }
                    </div>
                   
                </div>
            </div>
        );
    }
}
// const mapStateToProps = state => {
//     return state.setting;
// };
export default (AddressItem);
