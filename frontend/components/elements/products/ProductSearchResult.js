import React, { Component } from 'react';
import Link from 'next/link';
import { Rate } from 'antd';
import { connect } from 'react-redux';
import Rating from '../Rating';
import { backendurl } from './../../../backendurl';
import Axios from 'axios';

class ProductResult extends Component {
    constructor(props) {
        super(props);
        //console.log(" ProductResult => props are: ", props);
    }

    render() {
        const { product, currency } = this.props;

        return (
           
            <div className="ps-product ps-product--wide ps-product--search-result">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product._id}`}>
                        <a>
                            <span>{product.name}</span>                       
                        </a>
                    </Link>
                </div>
                <div className="ps-product__content">
                    {/* <Link href="/product/[pid]" as={`/product/${product._id}`}>
                        <a className="ps-product__title">{product.name}</a>
                    </Link> */}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratings}</span>
                    </div>
                    {product.sale === true ? (
                        <p className="ps-product__price sale">
                            {currency ? currency.symbol : '$'}
                            {product.price}
                            <del className="ml-1">
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
        );
    }
}

const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(ProductResult);
