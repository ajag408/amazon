import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { removeWishlistItem } from '../../../store/wishlist/action';
import Link from 'next/link';
import { Rate } from 'antd';
import {backendurl} from './../../../backendurl';
import Axios from 'axios';

class Wishlist extends Component {
    constructor(props) {
        super(props);
    }

    handleAddItemToCart(product,handler){
        let data = {
            productIds: [product]
        }
        Axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/move-to-cart`,data).then(resp =>{
            if(resp.status === 200 && resp.data){
                handler(resp.data);
            }
        })
    };

    handleRemoveWishListItem(product,handler){
        Axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/remove-from-cart/${product}`).then(resp =>{
            if(resp.status === 200 && resp.data){
                handler(resp.data);
            }
        })
    };

    render() {
        const { cartItems } = this.props.state;
        const wishlistItems = cartItems.filter(item => {
            return item.isSavedForLater
        });
        return (
            <div className="ps-section--shopping ps-whishlist">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Wishlist</h1>
                    </div>
                    <div className="ps-section__content">
                        {wishlistItems && wishlistItems.length === 0 ? (
                            <div className="alert alert-danger" role="alert">
                                Wishlist is empty!
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table ps-table--whishlist">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product name</th>
                                            <th>Unit Price</th>
                                            <th>Vendor</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlistItems.map(wishlistItem => (
                                            <tr key={wishlistItem.product.id}>
                                                <td>
                                                    <a
                                                        href="#"
                                                        onClick={this.handleRemoveWishListItem.bind(this,wishlistItem.product._id,this.props.handler)}>
                                                        <i className="icon-cross"></i>
                                                    </a>
                                                </td>
                                                <td>
                                                    <div className="ps-product--cart">
                                                        <div className="ps-product__thumbnail">
                                                            <Link
                                                                href="/product/[pid]"
                                                                as={`/product/${wishlistItem.product.id}`}>
                                                                <a>
                                                                    <img
                                                                        src={
                                                                            wishlistItem.product.thumbnail
                                                                        }
                                                                        alt="martfury"
                                                                    />
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        <div className="ps-product__content">
                                                            <Link
                                                                href="/product/[pid]"
                                                                as={`/product/${wishlistItem.product.id}`}>
                                                                <a className="ps-product__title">
                                                                    {wishlistItem.product.name}
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="price">
                                                    ${wishlistItem.product.price}
                                                </td>
                                                <td>{wishlistItem.product.vendor}</td>
                                                <td>
                                                    <a
                                                        className="ps-btn"
                                                        href="#"
                                                        onClick={this.handleAddItemToCart.bind(this,wishlistItem.product._id,this.props.handler)}>
                                                        Add to cart
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.wishlist;
};
export default connect(mapStateToProps)(Wishlist);
