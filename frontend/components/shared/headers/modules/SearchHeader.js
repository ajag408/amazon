import React, { Component } from 'react';
import { Select } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { backendurl } from './../../../../backendurl';
import Axios from 'axios';
import ProductResult from '../../../elements/products/ProductSearchResult';
//import { products } from '../../../../public/static/data/product';
import Search from 'antd/lib/input/Search';

const { Option } = Select;

class SearchHeader extends Component {
    constructor(props) {
        super(props);
        //console.log("Search header");
        this.state = {
            searchPanel: false,
            searchProducts: [],
            keyword: '',
        };
    }

    componentDidMount(){
        //console.log("Component Did Mount Searchheader");
        Axios.get(`${backendurl}/product/getAllProducts`).then(resp => {
            if (resp.status === 200 && resp.data) {

                //console.log("Response in front end is: ", resp.data.message);
                this.setState({
                    searchProducts: resp.data.message});
            }
        })
    }

    searchByProductName = (keyword, object) => {
        let matches = [];
        let regexp = new RegExp(keyword.toLowerCase(), 'g');

        object.forEach(product => {
            if (product.title.toLowerCase().match(regexp))
                matches.push(product);
        });

        return matches;
    }

    handleSearch(e) {
        if (e.target.value !== '') {
            this.setState({
                searchPanel: true,
                keyword: e.target.value,
                searchProducts: this.searchByProductName(
                    e.target.value,
                    this.state.searchProducts
                ),
            });
        } else {
            this.setState({ searchPanel: false, searchProducts: [] });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const keyword = this.state.keyword;
        Router.push(`/search?keyword=${keyword}`);
    }

    render() {
        const { searchPanel, searchProducts } = this.state;
        const productCategories = [
            {
                icon: 'icon-star',
                text: 'Hot Promotions',
                url: '/shop',
            },
            {
                icon: 'icon-laundry',
                text: 'Consumer Electronic',
                url: '/shop',
                extraClass: 'menu-item-has-children has-mega-menu',
                subClass: 'sub-menu',
                mega: true,
            },
            {
                icon: 'icon-shirt',
                text: 'Clothing & Apparel',
                url: '/shop',
            },
            {
                icon: 'icon-lampshade',
                text: 'Home, Garden & Kitchen',
                url: '/shop',
            },
            {
                icon: 'icon-heart-pulse',
                text: 'Health & Beauty',
                url: '/shop',
            },
            {
                icon: 'icon-diamond2',
                text: 'Yewelry & Watches',
                url: '/shop',
            },
            {
                icon: 'icon-desktop',
                text: 'Computer & Technology',
                url: '/shop',
                extraClass: 'menu-item-has-children has-mega-menu',
                subClass: 'sub-menu',
            },
            {
                icon: 'icon-baby-bottle',
                text: 'Babies & Moms',
                url: '/shop',
            },
            {
                icon: 'icon-baseball',
                text: 'Sport & Outdoor',
                url: '/shop',
            },
            {
                icon: 'icon-smartphone',
                text: 'Phones & Accessories',
                url: '/shop',
            },
            {
                icon: 'icon-book2',
                text: 'Books & Office',
                url: '/shop',
            },
            {
                icon: 'icon-car-siren',
                text: 'Cars & Motocycles',
                url: '/shop',
            },
            {
                icon: 'icon-wrench',
                text: 'Home Improments',
                url: '/shop',
            },
            {
                icon: 'icon-tag',
                text: 'Vouchers & Services',
                url: '/shop',
            },
        ];
        const exampleCategories = [
            'All',
            'Babies & Moms',
            'Books & Office',
            'Cars & Motocycles',
            'Clothing & Apparel',
            ' Accessories',
            'Bags',
            'Kid’s Fashion',
            'Mens',
            'Shoes',
            'Sunglasses',
            'Womens',
            'Computers & Technologies',
            'Desktop PC',
            'Laptop',
            'Smartphones',
            'Consumer Electrics',
            'Air Conditioners',
            'Accessories',
            'Type Hanging Cell',
            'Audios & Theaters',
            'Headphone',
            'Home Theater System',
            'Speakers',
            'Car Electronics',
            'Audio & Video',
            'Car Security',
            'Radar Detector',
            'Vehicle GPS',
            'Office Electronics',
            'Printers',
            'Projectors',
            'Scanners',
            'Store & Business',
            'Refrigerators',
            'TV Televisions',
            '4K Ultra HD TVs',
            'LED TVs',
            'OLED TVs',
            'Washing Machines',
            'Type Drying Clothes',
            'Type Horizontal',
            'Type Vertical',
            'Garden & Kitchen',
            'Cookware',
            'Decoration',
            'Furniture',
            'Garden Tools',
            'Home Improvement',
            'Powers And Hand Tools',
            'Utensil & Gadget',
            'Health & Beauty',
            'Equipments',
            'Hair Care',
            'Perfumer',
            'Wine Cabinets',
        ];
        return (
            <form
                className="ps-form--quick-search"
                method="get"
                action="/"
                onSubmit={this.handleSubmit.bind(this)}>
                <div className="ps-form__categories">
                    <select className="form-control">
                        {exampleCategories.map(option => (
                            <option value={option} key={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    className="form-control"
                    type="text"
                    placeholder=""
                    onChange={this.handleSearch.bind(this)}
                />
                <button className="buttonSearchHeader" onClick={this.handleSubmit.bind(this)}></button>
                <div
                    className={`ps-panel--search-result${
                        searchPanel && searchPanel === true ? ' active ' : ''
                    }`}>
                    <div className="ps-panel__content">
                        {searchProducts.length > 0 ? (
                            searchProducts.map(product => (
                                <ProductResult
                                    product={product}
                                    key={product._id}
                                />
                            ))
                        ) : (
                            <span>Not found! Try with another keyword.</span>
                        )}
                    </div>
                    <div className="ps-panel__footer text-center">
                        <Link href="/search">
                            <a>See all results</a>
                        </Link>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchHeader;
