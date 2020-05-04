import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import { Form, Input, notification } from 'antd';

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: ''
            ,profileData : {}
            ,updatedName : ""
            ,updatedAddress : ""
            ,isValueUpdated : false
            ,error : ""
            ,isImageUploadEnabled : false
            ,profilePic : null
            ,isImageUploaded : false
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadButton = this.uploadButton.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
    }

    onChangeName(e){
        this.setState({
            updatedName : e.target.value
        });
    }

    onChangeAddress(e){
        this.setState({
            updatedAddress : e.target.value
        });
    }

    uploadButton(e){
        e.preventDefault();
        this.setState({
            isImageUploadEnabled : true
        })
    }

    onCancelClick(e){
        //e.preventDefault();
        this.setState({
            isImageUploadEnabled : false
        })
    }

    onProfilePicUpload(e) {
        this.setState({
            profilePic: e.target.files[0]
        });
    }

    onUploadClick(e) {
        //e.preventDefault();
        debugger;
        e.preventDefault();

        let formData = new FormData();

        formData.set("sellerId", this.state.storage.user_id);
        formData.append("file", this.state.profilePic);

        axios({
            method: 'post',
            url: backendurl + '/seller/uploadProfilePic',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (parseInt(response.data.status) === 200) {
                    console.log("Profile pic uploaded");
                    var profileData1 = this.state.profileData;

                    profileData1.profilePicture = response.data.profileImagePath
                    this.setState({
                        isImageUploaded :true
                        ,profileData : profileData1
                        ,isImageUploadEnabled:false
                    })
                    // Router.push('/account/login')
                } else if (parseInt(response.data.status) === 400) {
                    console.log(response.data);
                    this.setState({
                        error: response.data.message
                        ,isImageUploaded : false
                        ,isImageUploadEnabled : false
                    })
                }
            }).catch(error => {
                this.setState({
                    error: error.message
                    ,isImageUploaded : false
                })
            })
    }

    handleSubmit(e){
        e.preventDefault();
        debugger;
        var isValid = true;
        if(1!==1){
            isValid = false;
            this.setState({
                error : <div id='statusMessage' style={{ color: 'red'}}>Invalid values</div>
            })
        }

        if(isValid){
            var data = {
                updatedName : this.state.updatedName
                ,updatedAddress : this.state.updatedAddress
                ,userId : this.state.storage.user_id
            }

            axios.post(backendurl+'/seller/updateBasicDetails', data)
                  .then((res) => {
                    if (res.status === 200) {
                        this.setState({
                            isValueUpdated :true
                            ,error : ""
                        })
                    } else {
                       this.setState({
                           error : <div id='statusMessage' style={{ color: 'red'}}>Data not Updated Try Again</div>
                       })  
                    }
                  });
        }
    }

    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            const {storage} = this.state;
            if(!storage.token || storage.role === "Admin"){
             //   || storage.role != "Customer"
                Router.push('/account/login')
            } else {
                // debugger;
                // var data = {
                //     userId : storage.user_id
                // };
                //console.log(backendurl+'/seller/getProfileData/'+storage.user_id);
                axios.get(backendurl+'/seller/getProfileData/'+storage.user_id)
                .then((res) => {
                    console.log(res);
                   if(res.status == 500 || res.status == 204 ){
                       console.log(res.data.message);
                   } else {
                      this.setState({
                        profileData : res.data.message
                      });
                  }
                });
            }
        });
    }
    handleLogout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        Router.push('/account/login')
    };

    render() {
        var profileData = this.state.profileData;

        var profilePicUploadSection;
        if (this.state.isImageUploadEnabled) {
            profilePicUploadSection = (<div> <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <input type="file" accept="image/*" onChange={this.onProfilePicUpload} name="fileName" id="filename" />
                    </div>
                </div>
            </div>
                <div className="row">
                    <div className="col-md-6"> 
                        <div className="form-group"><button name="uploadButton" onClick={this.onUploadClick}>Upload</button></div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group"><button name="cancelButton" onClick={this.onCancelClick}>Cancel</button></div>
                    </div>
                </div>
            </div>);
        }

        debugger;
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className = "data-card">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        {/* <img src="/static/img/users/3.jpg" /> */}
                                            <div className="form-group">
                                                <button  onClick={this.uploadButton} >
                                                    <img src={profileData 
                                                            && profileData.profilePicture
                                                            && profileData.profilePicture !== ""?profileData.profilePicture :"/static/img/users/blankProfile.jpeg"} />
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                {profilePicUploadSection}
                                            </div>
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>{profileData && profileData.user ? profileData.user.emailId:""}</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {/* <li>
                                                <Link href="/account/my-account">
                                                    <a>Dashboard</a>
                                                </Link>
                                            </li> */}
                                            {/* <li>
                                                <Link href="/account/my-account">
                                                    <a>Orders</a>
                                                </Link>
                                            </li> */}
                                            <li className="active">
                                                <Link href="/account/my-account">
                                                    <a> Edit Account Details</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/vendor/vendor-store/" 
                                                    as ={`/vendor/${this.state.storage ? this.state.storage.user_id : ""}`}>
                                                    <a>View Profile And Inventory</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/account/my-account">
                                                    <a onClick={this.handleLogout.bind(this)}>Logout</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="data-card">
                                <div className="ps-page__content">
                                    <div className="ps-page__dashboard">
                                        <strong><h2>Edit Profile</h2></strong>
                                        <Form
                                            className="ps-form--account customFormClass"
                                            onSubmit={this.handleSubmit}>
                                            {/* <div id='statusMessage' style={{ color: 'red'}}></div> */}
                                            {this.state.error}

                                        <div className="form-group">
                                            <Form.Item>
                                                {(
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        onChange={this.onChangeName}
                                                        placeholder="Seller Name"
                                                        //value = {this.state.updatedName==undefined?profileData.name:this.state.updatedName}
                                                        defaultValue = {profileData?profileData.name:""}
                                                    />
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="form-group">
                                            <Form.Item>
                                                {(
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        onChange={this.onChangeAddress}
                                                        placeholder="Address"
                                                        defaultValue = {profileData? profileData.addresses : ""}
                                                    />
                                                )}
                                                </Form.Item>
                                            </div>

                                            <div className="form-group submit customSubmitButton">
                                                <button
                                                    type="submit"
                                                    className="ps-btn ps-btn--fullwidth">
                                                    Submit
                                                </button>
                                            </div>

                                        {/* <strong><h4>Seller Name</h4></strong>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Seller Name" defaultValue="" />
                                        </div>

                                        <strong><h4>Address</h4></strong>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Seller Address" defaultValue="" />
                                        </div> */}
                                        </Form>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default MyAccount;
