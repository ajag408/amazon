import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import Link from 'next/link';
import { Rate, Modal } from 'antd';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import Rating from '../Rating';
import Router from 'next/router';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import { notification } from 'antd';

class Product extends Component {
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
        //console.log("Product received props: ", this.props.product)
    }

    handleEditClick(e) {
        e.preventDefault();
        Router.push({
            pathname: '/vendor/addproduct',
            query: { product: JSON.stringify(this.props.product) }

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

        //debugger;
        axios.post(backendurl + '/seller/deleteSellerProduct', data)
            .then((res) => {
                //debugger;
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
        //let productBadge = null;
        // if (product.badge && product.badge !== null) {
        //     product.badge.map(badge => {
        //         if (badge.type === 'sale') {
        //             return (productBadge = (
        //                 <div className="ps-product__badge">{badge.value}</div>
        //             ));
        //         } else if (badge.type === 'outStock') {
        //             return (productBadge = (
        //                 <div className="ps-product__badge out-stock">
        //                     {badge.value}
        //                 </div>
        //             ));
        //         } else {
        //             return (productBadge = (
        //                 <div className="ps-product__badge hot">
        //                     {badge.value}
        //                 </div>
        //             ));
        //         }
        //     });
        // }
        let hasImages;
        if (product.images && product.images.length > 0) {
            hasImages = <img src={product.images[0].imageUrl} alt="ProductImage" />
        }
        //debugger;

        return (

            <div className="ps-product">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product._id}`}>
                        <a>
                            {hasImages}
                        </a>
                    </Link>
                    {product.badge ? productBadge : ''}
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product._id}`}>
                            <a className="ps-product__title">{product.name}</a>
                        </Link>
                        <div className="ps-product__rating">
                            <Rating ratings={product.ratings} />
                            <br></br>
                            <span>({product.ratingAndReviews ? product.ratingAndReviews.length : 0} rating)</span>
                        </div>
                        {product.sale === true ? (
                            <p className="ps-product__price sale">
                                {currency ? currency.symbol : '$'}
                                {product.price}
                                <del className="ml-2">
                                    {currency ? currency.symbol : '$'}
                                    {product.salePrice}
                                </del>
                            </p>
                        ) : (
                                <p className="ps-product__price">
                                    {currency ? currency.symbol : '$'}
                                    {product.price}
                                </p>
                            )}
                    </div>
                    <div className="ps-product__content hover">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product._id}`}>
                            <a className="ps-product__title">{product.name}</a>
                        </Link>
                        {product.sale === true ? (
                            <p className="ps-product__price sale">
                                {currency ? currency.symbol : '$'}
                                {product.price}{' '}
                                <del className="ml-2">
                                    {currency ? currency.symbol : '$'}
                                    {product.salePrice}
                                </del>
                            </p>
                        ) : (
                                <p className="ps-product__price">
                                    {currency ? currency.symbol : '$'}
                                    {product.price}
                                </p>
                            )}

                        {this.state.storage && this.state.storage.role === "Seller" ? (
                        <div className="row">
                            <div className="col-md-6">
                                <button onClick={this.handleDeleteClick}
                                    type="submit"
                                    className="ps-btn ps-btn--sm ps-btn--rounded ps-btn--xsm ps-btn--delete">
                                    Delete
                                    </button>
                            </div>
                            <div className="col-md-6">
                                <button onClick={this.handleEditClick}
                                    type="submit"
                                    className="ps-btn ps-btn--sm ps-btn--rounded ps-btn--xsm ps-btn--edit">
                                    Edit
                                    </button>
                            </div>
                        </div>) : (<div></div>)}
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
export default connect(mapStateToProps)(Product);
