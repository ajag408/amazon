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
            ,profileData : {}
            ,sellerProducts : []
        };

        // this.onChangeName = this.onChangeName.bind(this);
        // this.onChangeAddress = this.onChangeAddress.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.uploadButton = this.uploadButton.bind(this);
        // this.onCancelClick = this.onCancelClick.bind(this);
        // this.onUploadClick = this.onUploadClick.bind(this);
        // this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
    }

    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            const {storage} = this.state;
            if(!storage.token){
                Router.push('/account/login')
            } else {
                var sellerId = this.props.sellerId;
                axios.get(backendurl+'/seller/getProfileData/'+sellerId)
                .then((res) => {
                    console.log(res);
                   if(res.status == 500 || res.status == 204 ){
                       console.log(res.data.message);
                    } else {
                        this.setState({
                            profileData: res.data.message
                        });
                    }
                });

                var data = {
                    sellerId: [sellerId]
                };
                debugger;
                axios.post(backendurl + '/product/search-product/', data)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200 && res.data) {
                            this.setState({
                                sellerProducts: res.data.message
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
        if(this.state.sellerProducts && this.state.sellerProducts.length > 0){
            var totalRating = 0;
            for (let i = 0 ; i< this.state.sellerProducts.length; i++){
                totalRating += this.state.sellerProducts[i].ratings;
                totalNumberOfRatings += this.state.sellerProducts[i].ratingAndReviews.length;
            }
            SellerRating = totalRating/this.state.sellerProducts.length;
        }

        return (
            <div className="ps-vendor-store">
                <div className="container">
                    <div className="ps-section__container">
                        <div className="ps-section__left">
                            <div className="ps-block--vendor">
                                <div className="ps-block__thumbnail">
                                    <img
                                        src={profileData && profileData.profilePicture !== ""?profileData.profilePicture:"/static/img/vendor/vendor-store.jpg"}
                                        alt="Image Load Error"
                                    />
                                </div>
                                <div className="ps-block__container">
                                    <div className="ps-block__header">
                                        <h4>{profileData?profileData.name:""}</h4>
                                        <Rating ratings = {SellerRating}/>
                                        <p>
                                            ({totalNumberOfRatings} rating)
                                        </p>
                                    </div>
                                    <div className="ps-block__divider"></div>
                                    <div className="ps-block__content">
                                        {/* <p>
                                            <strong>Digiworld US</strong>, New
                                            York’s no.1 online retailer was
                                            established in May 2012 with the aim
                                            and vision to become the one-stop
                                            shop for retail in New York with
                                            implementation of best practices
                                            both online
                                        </p>
                                        <span className="ps-block__divider"></span> */}
                                        <p>
                                            <strong>Address</strong> {profileData? profileData.addresses:""}
                                        </p>
                                        {/* <figure>
                                                <figcaption>
                                                Foloow us on social
                                            </figcaption>
                                            <ul className="ps-list--social-color">
                                                <li>
                                                    <a
                                                        className="facebook"
                                                        href="#">
                                                        <i className="fa fa-facebook"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="twitter"
                                                        href="#">
                                                        <i className="fa fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="linkedin"
                                                        href="#">
                                                        <i className="fa fa-linkedin"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="feed"
                                                        href="#">
                                                        <i className="fa fa-feed"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </figure> */}
                                    </div>
                                    {/* <div className="ps-block__footer">
                                        <p>
                                            Call us directly
                                            <strong>(+053) 77-637-3300</strong>
                                        </p>
                                        <p>or Or if you have any question</p>
                                        {/* <a
                                            className="ps-btn ps-btn--fullwidth"
                                            href="">
                                            Contact Seller
                                        </a>
                                    </div> */}
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
                                        {/* <li>
                                            <a href="#">Reviews</a>
                                        </li> */}
                                        {/* <li>
                                            <a href="#">About</a>
                                        </li> */}
                                    </ul>
                                </div>
                                <div className="ps-block__right">
                                    {/* <form
                                        className="ps-form--search"
                                        action="/"
                                        method="get">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Search in this shop"
                                        />
                                        <button>
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </form> */}
                                </div>
                            </div>
                            {/* <div className="ps-vendor-best-seller">
                                <div className="ps-section__header">
                                    <h3>Best Seller items</h3>
                                     <div className="ps-section__nav">
                                        <a
                                            className="ps-carousel__prev"
                                            href="#vendor-bestseller">
                                            <i className="icon-chevron-left"></i>
                                        </a>
                                        <a
                                            className="ps-carousel__next"
                                            href="#vendor-bestseller">
                                            <i className="icon-chevron-right"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="ps-section__content">
                                    <Slider
                                        {...carouselSetting}
                                        className="ps-carousel outside">
                                        {relatedProduct &&
                                            relatedProduct.map(product => (
                                                <Product
                                                    product={product}
                                                    key={product.id}
                                                />
                                            ))}
                                    </Slider>
                                </div>
                            </div> */}
                            <VendorProducts sellerProducts = {this.state.sellerProducts}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VendorStore;
