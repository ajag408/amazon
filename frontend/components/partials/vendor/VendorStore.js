import React, { Component } from 'react';
import Slider from 'react-slick';
import { relatedProduct } from '../../../public/static/data/product';
import Product from '../../elements/products/Product';
import VendorProducts from './modules/VendorProducts';
import NextArrow from '../../elements/carousel/NextArrow';
import PrevArrow from '../../elements/carousel/PrevArrow';
import Rating from '../../elements/Rating';
import Router from 'next/router';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import { Form, Input, notification } from 'antd';
import Link from 'next/link';

class VendorStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storage: ''
            , profileData: {}
            , sellerProducts: []
            , keyword: ''
            , pageNumber : 1
            , pageCount : 0
        };

        this.onPrevPageBtnClick = this.onPrevPageBtnClick.bind(this);
        this.onNextPageBtnClick = this.onNextPageBtnClick.bind(this);
    }

    onPrevPageBtnClick(e){
        debugger;
        e.preventDefault();
        this.setState({
            pageNumber : this.state.pageNumber -1
            ,sellerProducts : []
        },() => {this.searchApiCall()})
    }

    onNextPageBtnClick(e){
        debugger;
        e.preventDefault();
        this.setState({
            pageNumber : this.state.pageNumber +1
            ,sellerProducts : []
        },() => {this.searchApiCall()})
    }


    handleSearch = (e) => {
        debugger;
        e.preventDefault();
        this.setState({
            keyword: e.target.value,
            sellerProducts: [],
            pageNumber : 1
        }, () => {this.searchApiCall()})
    }

    searchApiCall(){
        debugger;
        var sellerId = this.props.sellerId;
            var data = {
                productName: this.state.keyword
                ,sellerId: [sellerId]
                ,pageNumber : this.state.pageNumber
            }
            debugger;
            axios.post(`${backendurl}/product/search-product`, data).then(resp => {
                debugger;
                if (resp.status === 200 && resp.data) {
                    //console.log("Response in front end is: ", resp.data.message);
                    this.setState({
                        sellerProducts: resp.data.message,
                        pageCount : resp.data.pageCount
                    });
                    //console.log("handle search  ", this.state, " Value :  ", this.state.keyword); 
                } else {
                    notification['error']({
                        message: 'ERROR!',
                        description: 'Oops! Something went wrong.!',
                        duration: 2,
                    });
                }
            })
    }

    componentDidMount() {
        this.setState({
            storage: localStorage
        }, () => {
            const { storage } = this.state;
            if (!storage.token) {
                Router.push('/account/login')
            } else {
                var sellerId = this.props.sellerId;
                axios.get(backendurl + '/seller/getProfileData/' + sellerId)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 500 || res.status == 204) {
                            console.log(res.data.message);
                        } else {
                            this.setState({
                                profileData: res.data.message
                            });
                        }
                    });

                var data = {
                    sellerId: [sellerId]
                    ,pageNumber : this.state.pageNumber
                };
                debugger;
                axios.post(backendurl + '/product/search-product/', data)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200 && res.data) {
                            this.setState({
                                sellerProducts: res.data.message
                                ,pageCount : res.data.pageCount
                            })
                        } else {
                            console.log(res.data.message);
                        }
                    });
            }
        });
    }

    // componentDidMount(){

    // }

    render() {
        const carouselSetting = {
            dots: false,
            arrow: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 3,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        arrows: false,
                    },
                },
            ],
        };

        var profileData = this.state.profileData;

        debugger;
        var SellerRating = 0;
        var totalNumberOfRatings = 0;
        if (this.state.sellerProducts && this.state.sellerProducts.length > 0) {
            var totalRating = 0;
            for (let i = 0; i < this.state.sellerProducts.length; i++) {
                totalRating += this.state.sellerProducts[i].ratings;
                totalNumberOfRatings += this.state.sellerProducts[i].ratingAndReviews.length;
            }
            SellerRating = totalRating / this.state.sellerProducts.length;
        }

        let paginationPrevBtnClass = ""
        let disabledPrev = ''
        if(this.state.pageNumber == 1){
            paginationPrevBtnClass = "btnDisabled"
            disabledPrev = 'true'
        }
        else{
            paginationPrevBtnClass = "btnPagination"
            disabledPrev = ''
        }
        let paginationNextBtnClass = ""
        //debugger;
        let disabledNext = ''
        if(this.state.pageNumber == this.state.pageCount){
            paginationNextBtnClass = "btnDisabled"
            disabledNext = 'true'
        }
        else{
            paginationNextBtnClass = "btnPagination"
            disabledNext = ''
        }

        return (
            <div className="ps-vendor-store">
                <div className="container">
                    <div className="ps-section__container">
                        <div className="ps-section__left">
                            <div className="ps-block--vendor">
                                <div className="ps-block__thumbnail">
                                    <img
                                        src={profileData && profileData.profilePicture !== "" ? profileData.profilePicture : "/static/img/vendor/vendor-store.jpg"}
                                        alt="Image Load Error"
                                    />
                                </div>
                                <div className="ps-block__container">
                                    <div className="ps-block__header">
                                        <h4>{profileData ? profileData.name : ""}</h4>
                                        <Rating ratings={SellerRating} />
                                        <p>
                                            ({totalNumberOfRatings} rating)
                                        </p>
                                    </div>
                                    <div className="ps-block__divider"></div>
                                    <div className="ps-block__content">
                                        <p>
                                            <strong>Address</strong> {profileData ? profileData.addresses : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-section__right">
                            <div className="ps-block--vendor-filter">
                                <div className="ps-block__left">
                                    <ul>
                                        <li className="active">
                                            <a href="#">Products</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="ps-block__right">
                                    <form
                                        className="ps-form--search"
                                        action="/"
                                        method="get">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Search in this shop"
                                            onChange={this.handleSearch.bind(this)}
                                        />
                                        <button>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div class="center-aligned">
                                <button class={paginationPrevBtnClass} disabled={disabledPrev} onClick={this.onPrevPageBtnClick}>
                                    Prev
                                </button>
                                <div class="divPageNumber">{this.state.pageNumber}/{this.state.pageCount}</div>
                                <button class={paginationNextBtnClass} disabled={disabledNext} onClick={this.onNextPageBtnClick}>
                                    Next
                                </button>
                            </div>
                            <VendorProducts sellerProducts={this.state.sellerProducts} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VendorStore;
