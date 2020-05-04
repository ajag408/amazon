import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Rating from '../../../Rating';
import { addItem } from '../../../../../store/cart/action';
import { addItemToCompare } from '../../../../../store/compare/action';
import { addItemToWishlist } from '../../../../../store/wishlist/action';
import Axios from 'axios';
import { backendurl } from '../../../../../backendurl';
import { Rate } from 'antd';

class InformationDefault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            addedToCart: false
        };
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { product } = this.props;
        let data = {
            quantity: this.state.quantity
        }
        Axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/add-to-cart/${product._id}`,data).then(resp =>{
            if(resp.status === 200 && resp.data){
                this.setState({addedToCart: true});
            }
        })
    };

    handleIncreaseItemQty = e => {
        e.preventDefault();
        this.setState({ quantity: this.state.quantity + 1 });
    };

    handleDecreaseItemQty = e => {
        e.preventDefault();
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    };

    render() {
        const { product } = this.props;
        return (
            <div className="ps-product__info">
                <h1>{product.name}</h1>
                <div className="ps-product__meta">
                    <div className="ps-product__rating">
                    <Rate disabled allowHalf defaultValue={product.ratings.toFixed(1)}/>
                        <span>({product.ratingAndReviews.length} review)</span>
                    </div>
                </div>
                <h4 className="ps-product__price">
                    ${product.price}
                </h4>
                <div className="ps-product__desc">
                    <p>
                        Sold By:
                        <Link href="/shop">
                            <a>
                                {/* <strong> {product.seller.name}</strong> */}
                            </a>
                        </Link>
                    </p>
                </div>
                {this.state.addedToCart ? 
                    (<h4 className='text-success'><b>Added to Cart!</b></h4>)
                    :
                    (<div className="ps-product__shopping">
                        <figure>
                            <figcaption>Quantity</figcaption>
                            <div className="form-group--number">
                                <button
                                    className="up"
                                    onClick={this.handleIncreaseItemQty.bind(this)}>
                                    <i className="fa fa-plus"></i>
                                </button>
                                <button
                                    className="down"
                                    onClick={this.handleDecreaseItemQty.bind(this)}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder={this.state.quantity}
                                    disabled
                                />
                            </div>
                        </figure>
                        <a
                            className="ps-btn ps-btn--black"
                            href="#"
                            onClick={this.handleAddItemToCart.bind(this)}>
                            Add to cart
                        </a>                    
                    </div>)
                }
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return state.setting;
// };

export default connect(null)(InformationDefault);
