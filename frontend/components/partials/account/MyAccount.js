import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import { Form, Input, notification } from 'antd';
import { relativeTimeThreshold } from 'moment';
import Rating from '../../elements/Rating';

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storage: ''
            , profileData: {}
            , updatedName: ""
            , updatedAddress: ""
            , isValueUpdated: false
            , error: ""
            , isImageUploadEnabled: false
            , profilePic: null
            , isImageUploaded: false
            , activeModule: ""
            , reviewCount: 0
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadButton = this.uploadButton.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
        this.handleViewComments = this.handleViewComments.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
    }

    handleViewComments(e) {
        debugger;
        var storage;
        if (this.state.storage) {
            storage = this.state.storage
        };
        axios.get(backendurl + '/customer/getCommentsAndReview/' + storage.user_id)
            .then((res) => {
                debugger;
                console.log(res);
                if (res.status == 500 || res.status == 204) {
                    console.log(res.data.message);
                } else {
                    var reviewCounts = 0;
                    var productsWithReview = res.data.message;
                    debugger;
                    for (var i = 0; i < productsWithReview.length; i++) {
                        reviewCounts += productsWithReview[i].ratingAndReviews.length;
                    }
                    this.setState({
                        productsWithCommentsAndReviews: res.data.message
                        , activeModule: "ViewComments"
                        , reviewCount: reviewCounts
                    });
                }
            });
    }

    handleEditProfile(e) {
        this.setState({
            activeModule: "EditProfile"
        });
    }

    onChangeName(e) {
        this.setState({
            updatedName: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            updatedAddress: e.target.value
        });
    }

    uploadButton(e) {
        e.preventDefault();
        this.setState({
            isImageUploadEnabled: true
        })
    }

    onCancelClick(e) {
        //e.preventDefault();
        this.setState({
            isImageUploadEnabled: false
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
        formData.set("role", this.state.storage.role);
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
                        isImageUploaded: true
                        , profileData: profileData1
                        , isImageUploadEnabled: false
                    })
                    // Router.push('/account/login')
                } else if (parseInt(response.data.status) === 400) {
                    console.log(response.data);
                    this.setState({
                        error: response.data.message
                        , isImageUploaded: false
                        , isImageUploadEnabled: false
                    })
                }
            }).catch(error => {
                this.setState({
                    error: error.message
                    , isImageUploaded: false
                })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        debugger;
        var isValid = true;
        if (1 !== 1) {
            isValid = false;
            this.setState({
                error: <div id='statusMessage' style={{ color: 'red' }}>Invalid values</div>
            })
        }

        if (this.state.updatedName === "") {
            this.setState({
                updatedName: this.state.profileData.name
            })
        }
        if (this.state.updatedAddress === "") {
            this.setState({
                updatedAddress: this.state.profileData.addresses
            })
        }
        if (isValid) {
            var data = {
                updatedName: this.state.updatedName
                , updatedAddress: this.state.updatedAddress
                , userId: this.state.storage.user_id
            }

            if (this.state.storage && this.state.storage.role === "Seller") {
                axios.post(backendurl + '/seller/updateBasicDetails', data)
                    .then((res) => {
                        if (res.status === 200) {
                            this.setState({
                                isValueUpdated: true
                                , error: ""
                            })
                        } else {
                            this.setState({
                                error: <div id='statusMessage' style={{ color: 'red' }}>Data not Updated Try Again</div>
                            })
                        }
                    });
            } else if (this.state.storage && this.state.storage.role === "Customer") {
                axios.post(backendurl + '/customer/updateBasicDetails', data)
                    .then((res) => {
                        if (res.status === 200) {
                            this.setState({
                                isValueUpdated: true
                                , error: ""
                            })
                        } else {
                            this.setState({
                                error: <div id='statusMessage' style={{ color: 'red' }}>Data not Updated Try Again</div>
                            })
                        }
                    });
            }
        }
    }

    // componentWillMount(){
    //     let data = {};
    //     if (typeof window !== 'undefined') {
    //         data = localStorage;
    //     }
    //     if (!data.token || data.role === "Admin") {
    //         //   || storage.role != "Customer"
    //         Router.push('/account/login')
    //     } 
    // }

    componentDidMount() {
        this.setState({
            storage: localStorage
        }, () => {
            const { storage } = this.state;
            if (!storage.token || storage.role === "Admin") {
                //   || storage.role != "Customer"
                Router.push('/account/login')
            } else {
                if (storage.role === "Seller") {
                    axios.get(backendurl + '/seller/getProfileData/' + storage.user_id)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 500 || res.status == 204) {
                                console.log(res.data.message);
                            } else {
                                this.setState({
                                    profileData: res.data.message
                                    , updatedName: res.data.message.name
                                    , updatedAddress: res.data.message.addresses
                                });
                            }
                        });
                } else if (storage.role === "Customer") {
                    axios.get(backendurl + '/customer/getProfileData/' + storage.user_id)
                        .then((res) => {
                            console.log(res);
                            if (res.status == 500 || res.status == 204) {
                                console.log(res.data.message);
                            } else {
                                this.setState({
                                    profileData: res.data.message
                                    , activeModule: "EditProfile"
                                    , updatedName: res.data.message.name
                                });
                            }
                        });
                }
            }
        });
    }
    handleLogout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role');
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
                        <div className="form-group"><button name="uploadButton" 
                        className="ps-btn ps-btn--myAccount" 
                        onClick={this.onUploadClick}>Upload</button></div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group"><button name="cancelButton"
                        className="ps-btn ps-btn--grey ps-btn--myAccount" 
                        onClick={this.onCancelClick}>Cancel</button></div>
                    </div>
                </div>
            </div>);
        }
        debugger;
        var listOptions;
        if (this.state.storage && this.state.storage.role === "Seller") {
            listOptions = (<ul>
                <li className="active">
                    <Link href="/account/my-account">
                        <a> Edit Account Details</a>
                    </Link>
                </li>
                <li>
                    <Link href="/vendor/[vendorId]"
                        as={`/vendor/${this.state.storage ? this.state.storage.user_id : ""}`}>
                        <a>View Profile And Inventory</a>
                    </Link>
                </li>
                <li>
                    <Link href="/vendor/vendor-report">
                        <a>View Sales Report</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/my-account">
                        <a onClick={this.handleLogout.bind(this)}>Logout</a>
                    </Link>
                </li>
            </ul>)
        } else if (this.state.storage && this.state.storage.role === "Customer" && this.state.activeModule === "EditProfile") {
            listOptions = (<ul>
                <li className="active">
                    <a> Edit Account Details</a>
                </li>
                <li>
                    <a onClick={this.handleViewComments}>My Comments And Reviews</a>
                </li>
                <li>
                    <Link href="/account/addresses">
                        <a>Manage Addresses</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/save-payments">
                        <a>Manage Payments</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/my-account">
                        <a onClick={this.handleLogout.bind(this)}>Logout</a>
                    </Link>
                </li>
            </ul>
            )
        } else if (this.state.storage && this.state.storage.role === "Customer" && this.state.activeModule === "ViewComments") {
            listOptions = (<ul>
                <li>
                    <a onClick={this.handleEditProfile}> Edit Account Details</a>
                </li>
                <li className="active">
                    <a onClick={this.handleViewComments}>My Comments And Reviews</a>
                </li>
                <li>
                    <Link href="/account/addresses">
                        <a>Manage Addresses</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/my-account">
                        <a onClick={this.handleLogout.bind(this)}>Logout</a>
                    </Link>
                </li>
            </ul>
            )
        }

        var mainContent;
        if (this.state.storage && this.state.storage.role === "Seller") {
            mainContent = (
                <div className="data-card">
                    <div className="ps-page__content">
                        <div className="ps-page__dashboard">
                            <strong><h2>Edit Profile</h2></strong>
                            <Form
                                className="ps-form--account customFormClass"
                                onSubmit={this.handleSubmit}>
                                {this.state.error}

                                <div className="form-group">
                                    <Form.Item>
                                        {(
                                            <input
                                                className="form-control"
                                                type="text"
                                                onChange={this.onChangeName}
                                                placeholder="Seller Name"
                                                defaultValue={profileData ? profileData.name : ""}
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
                                                defaultValue={profileData ? profileData.addresses : ""}
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
                            </Form>
                        </div>
                    </div>
                </div>)
        } else if (this.state.storage && this.state.storage.role === "Customer" && this.state.activeModule === "EditProfile") {
            mainContent = (

                <div className="data-card">
                    <div className="ps-page__content">
                        <div className="ps-page__dashboard">
                            <strong><h2>Edit Profile</h2></strong>
                            <Form
                                className="ps-form--account customFormClass"
                                onSubmit={this.handleSubmit}>
                                {this.state.error}

                                <div className="form-group">
                                    <Form.Item>
                                        {(
                                            <input
                                                className="form-control"
                                                type="text"
                                                onChange={this.onChangeName}
                                                placeholder="Seller Name"
                                                defaultValue={profileData ? profileData.name : ""}
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
                            </Form>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.storage && this.state.storage.role === "Customer" && this.state.activeModule === "ViewComments") {
            var ratingAndReviewsData;
            ratingAndReviewsData = this.state.productsWithCommentsAndReviews.map(ele => {
                var allProductReviews;
                allProductReviews = ele.ratingAndReviews.map(rAndR => {
                    return (<div>
                        <div><b>Rating:</b> <Rating ratings={rAndR.rating} /></div>
                        <div><b>Review:</b> {rAndR.review}</div> 
                        <div className="spacer-sm"></div>
                    </div>)
                })
                return (<div className="row">
                    <div className="col-md-12">
                        <Link href="/product/[pid]" as={`/product/${ele._id}`}>
                            <a><p><b className="productLink">{ele.productName}</b></p></a>
                        </Link>
                        {allProductReviews}
                        <div className="seperator"></div>
                    </div>
                </div>)
            })
            mainContent = (
                    <div className="data-card">
                        <div className="ps-page__content">
                            <div className="ps-page__dashboard">
                            <strong><h2>Comments And Reviews</h2></strong>
                                <h4>Total Votes: {this.state.reviewCount}</h4>
                                <div className="spacer"></div>
                                <div>{ratingAndReviewsData}</div>
                            </div>
                        </div>
                    </div>)
        }

        debugger;
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className="data-card">
                                <div className="ps-section__left">
                                    <aside className="ps-widget--account-dashboard">
                                        <div className="ps-widget__header">
                                            <div className="form-group">
                                                <button className="btnProfilePic" onClick={this.uploadButton} >
                                                    <img src={profileData
                                                        && profileData.profilePicture
                                                        && profileData.profilePicture !== "" ? profileData.profilePicture : "/static/img/users/blankProfile.jpeg"} />
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                {profilePicUploadSection}
                                            </div>
                                            <figure>
                                                <figcaption>Hello</figcaption>
                                                <p>{profileData && profileData.user ? profileData.user.emailId : ""}</p>
                                            </figure>
                                        </div>
                                        <div className="ps-widget__content">
                                            {listOptions}
                                        </div>
                                    </aside>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                           {mainContent}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default MyAccount;
