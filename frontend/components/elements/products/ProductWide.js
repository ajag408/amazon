import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';

class ProductWide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false,
            storage : {}
        };
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
        return (
            <div className="ps-product ps-product--wide">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product._id}`}>
                        <a>
                            {/* <img src={product.thumbnail} alt="martfury" /> */}
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
                        <p className="ps-product__vendor">
                            Sold by:
                            <Link href="/shop">
                                <a>{product.seller?product.seller.name:""}</a>
                            </Link>
                        </p>
                        <ul className="ps-product__desc">
                            {product.description}
                        </ul>
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(ProductWide);
