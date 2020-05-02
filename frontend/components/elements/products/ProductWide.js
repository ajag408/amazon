import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import { Rate, Modal } from 'antd';
import Rating from '../Rating';
import Router from 'next/router';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import { notification } from 'antd';

class ProductWide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false
            ,isDelete : false
            ,storage: {}
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
    }

    componentDidMount(){
        this.setState({ 
            storage : localStorage
        }, () => {
            const {storage} = this.state;
            if(!storage.token){
             //   || storage.role != "Customer"
                Router.push('/account/login')
            }
        })
    }

    handleEditClick(e) {
        e.preventDefault();
        Router.push({
            pathname: '/pages/faqs',
            query: { product: this.props.product }

        })
    }

    handleCancelDelete(e){
        e.preventDefault();
        this.setState({
            isDelete : false
        },() => {
            notification['warning']({
                message: 'Warning!',
                description: 'Product Deletion Cancelled',
                duration: 2,
            });
        })
    }

    handleConfirmClick(e){
        var data = {
            productId: this.props.product._id
        }

        debugger;
        axios.post(backendurl + '/seller/deleteSellerProduct', data)
            .then((res) => {
                debugger;
                if (res.status === 200) {
                    this.setState({
                        isDelete : false
                    })
                    notification['success']({
                        message: 'Success!!',
                        description: 'Product Deleted',
                        duration: 2,
                    });
                } else {
                    this.setState({
                        isDelete : false
                    })
                    notification['warning']({
                        message: 'Warning!',
                        description: 'Oops! Something went wrong.!Product Not Deleted',
                        duration: 2,
                    });
                }
            });
    }

    handleDeleteClick(e) {
        e.preventDefault();

        this.setState({
            isDelete : true
        })
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItem(product));
    };

    handleAddItemToCompare = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToCompare(product));
    };

    handleAddItemToWishlist = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToWishlist(product));
    };

    handleShowQuickView = e => {
        e.preventDefault();
        this.setState({ isQuickView: true });
    };

    handleHideQuickView = e => {
        e.preventDefault();
        this.setState({ isQuickView: false });
    };

    render() {

        const { product, currency } = this.props;
        let productRating = null;
        if (product.badge) {
            product.badge.map(badge => {
                if (badge.type === 'sale') {
                    return (productRating = (
                        <div className="ps-product__badge">{badge.value}</div>
                    ));
                } else if (badge.type === 'outStock') {
                    return (productRating = (
                        <div className="ps-product__badge.out-stock">
                            {badge.value}
                        </div>
                    ));
                } else {
                    return (productRating = (
                        <div className="ps-product__badge.hot">
                            {badge.value}
                        </div>
                    ));
                }
            });
        }

        debugger;
        let hasImages;
        if(product.images && product.images.length >0)
        {
            hasImages = <img src={product.images[0].imageUrl} alt="ProductImage" />
        }
        return (
            <div className="ps-product ps-product--wide">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product._id}`}>
                        <a>
                            {hasImages}
                        </a>
                    </Link>
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product._id}`}>
                            <a className="ps-product__title">{product.name}</a>
                        </Link>
                        <div className="ps-product__rating">
                            <Rating ratings={product.ratings} /> <span>({product.ratingAndReviews ? product.ratingAndReviews.length : 0} rating)</span>
                        </div>
                        <p className="ps-product__vendor">
                            {/* Sold by:
                            <Link href="#">
                                <a>{product.seller?product.seller.name:""}</a>
                            </Link> */}
                        </p>
                        <ul className="ps-product__desc">
                            <li>{product.description}</li>
                        </ul>
                        <br></br>
                        {this.state.storage && this.state.storage.role === "Seller" ? (
                        <div className="row">
                            <div className="col-md-6">
                                <button onClick={this.handleDeleteClick}
                                    type="submit"
                                    className="ps-btn ps-btn--lg ps-btn--rounded ps-btn--delete">
                                    Delete
                                    </button>
                            </div>
                            <div className="col-md-6">
                                <button onClick={this.handleEditClick}
                                    type="submit"
                                    className="ps-btn ps-btn--lg ps-btn--rounded ps-btn--edit">
                                    Edit
                                    </button>
                            </div>
                        </div>) : (<div></div>)}
                    </div>
                    <div className="ps-product__shopping">
                        {product.sale === true ? (
                            <p className="ps-product__price sale">
                                {currency ? currency.symbol : '$'}
                                {product.price}
                                <del className="ml-1">
                                    {currency ? currency.symbol : '$'}
                                    {product.salePrice}{' '}
                                </del>
                            </p>
                        ) : (
                            <p className="ps-product__price">
                                {currency ? currency.symbol : '$'}
                                {product.price}
                            </p>
                        )}

                        {this.state.storage.role !== "Seller"?(
                            <div>
                            <a
                            className="ps-btn"
                            href="#"
                            onClick={this.handleAddItemToCart.bind(this)}>
                            Add to cart
                        </a>
                        <ul className="ps-product__actions">
                            <li>
                                <a
                                    href="#"
                                    onClick={this.handleAddItemToWishlist.bind(
                                        this
                                    )}>
                                    <i className="icon-heart"></i> Wishlist
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={this.handleAddItemToCompare.bind(
                                        this
                                    )}>
                                    <i className="icon-chart-bars"></i> Compare
                                </a>
                            </li>
                        </ul>
                        </div>
                        ):(<div></div>)}
                        
                    </div>
                </div>
                { this.state.storage && this.state.storage.role === "Seller" ?
                    (<Modal
                        title= "Are you sure you want to delete this product?"
                        centered
                        footer={null}
                        width={512}
                        onCancel={this.handleCancelDelete}
                        visible={this.state.isDelete}>
                            <div className="row">
                                <div className="col-md-6">
                                    <button onClick={this.handleConfirmClick}
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth ps-btn--rounded ps-btn--delete">
                                        Yes
                                        </button>
                                </div>
                                <div className="col-md-6">
                                    <button onClick={this.handleCancelDelete}
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth ps-btn--rounded ps-btn--edit">
                                        No
                                        </button>
                                </div>
                            </div>
                        {/* <ProductDetailQuickView product={product} /> */}
                    </Modal>) : (<div></div>)
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(ProductWide);
