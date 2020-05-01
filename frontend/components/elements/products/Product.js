import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { addItemToCompare } from '../../../store/compare/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import Link from 'next/link';
import { Rate, Modal } from 'antd';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import Rating from '../Rating';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false,
        };
    }

    componentWillReceiveProps(){
        //console.log("Product received props: ", this.props.product)
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
        let productBadge = null;
        if (product.badge && product.badge !== null) {
            product.badge.map(badge => {
                if (badge.type === 'sale') {
                    return (productBadge = (
                        <div className="ps-product__badge">{badge.value}</div>
                    ));
                } else if (badge.type === 'outStock') {
                    return (productBadge = (
                        <div className="ps-product__badge out-stock">
                            {badge.value}
                        </div>
                    ));
                } else {
                    return (productBadge = (
                        <div className="ps-product__badge hot">
                            {badge.value}
                        </div>
                    ));
                }
            });
        }
        let hasImages;
        if(product.images && product.images.length >0)
        {
            hasImages = <img src={product.images[0].imageUrl} alt="martfury" />
        }
        
        return (
            
            <div className="ps-product">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product._id}`}>
                        <a>
                           {hasImages}
                        </a>
                    </Link>
                    {product.badge ? productBadge : ''}
                    <ul className="ps-product__actions">
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Read More"
                                onClick={this.handleAddItemToCart.bind(this)}>
                                <i className="icon-bag2"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quick View"
                                onClick={this.handleShowQuickView.bind(this)}>
                                <i className="icon-eye"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add to wishlist"
                                onClick={this.handleAddItemToWishlist.bind(
                                    this
                                )}>
                                <i className="icon-heart"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Compare"
                                onClick={this.handleAddItemToCompare.bind(
                                    this
                                )}>
                                <i className="icon-chart-bars"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="ps-product__container">
                    <Link href="/shop">
                        <a className="ps-product__vendor">Young Shop</a>
                    </Link>
                    <div className="ps-product__content">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product._id}`}>
                            <a className="ps-product__title">{product.name}</a>
                        </Link>
                        <div className="ps-product__rating">
                            <Rating />

                            <span>{product.ratings}</span>
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
                    </div>
                </div>
                <Modal
                    title={product.name}
                    centered
                    footer={null}
                    width={1024}
                    onCancel={this.handleHideQuickView}
                    visible={this.state.isQuickView}>
                    <ProductDetailQuickView product={product} />
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(Product);
