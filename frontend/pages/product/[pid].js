import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';

import ProductDetailFullwidth from '../../components/elements/detail/ProductDetailFullwidth';
import NavigationList from '../../components/shared/navigation/NavigationList';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobileProduct from '../../components/shared/header-mobile/HeaderMobileProduct';
import { getProductsById } from '../../store/product/action';
import HeaderProduct from '../../components/shared/headers/HeaderProduct';
import axios from 'axios';
import { backendurl } from '../../backendurl';

class ProductDefaultPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleProduct : {
                active: true,
                name: '',
                seller: {name: ''},
                price: '',
                description: '',
                images: [],
                ratingAndReviews: [],
                ratings: 0,
            }
        }
    }

    static async getInitialProps(ctx) {
        ctx.store.dispatch(getProductsById(ctx.query.pid));
        return { query: ctx.query };
    }
    componentDidMount() {
        const { pid } = this.props.query;
        if (!pid) {
            Router.push('/page/page-404');
        }else {
            let url = `${backendurl}/product/${pid}`;
            axios.get(url).then(resp => {
                if(resp.status === 200 && resp.data){
                    this.setState({singleProduct: resp.data});
                }
            })
        }
    }

    render() {
        const { singleProduct } = this.state;
        const breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'Shop',
                url: '/shop',
            },
            {
                text: singleProduct.name,
            },
        ];

        return (
            <div className="site-content">
                <HeaderProduct productData={singleProduct} />
                <NavigationList />
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-page--product">
                    <div className="ps-container">
                        <div className="ps-page__container">
                            <ProductDetailFullwidth
                                product={singleProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state.product)(ProductDefaultPage);
