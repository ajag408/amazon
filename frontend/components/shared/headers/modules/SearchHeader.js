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
            if (product.name.toLowerCase().match(regexp))
                matches.push(product);
        });

        return matches;
    }

    handleSearch(e) {
        console.log("handle search  ", this.state)
        if (e.target.value !== '') {
            this.setState({
                searchPanel: true,
                keyword: e.target.value,
                searchProducts: this.searchByProductName(
                    e.target.value,
                    //products
                    this.state.searchProducts
                ),
            });
        } else {
            this.setState({ searchPanel: false, searchProducts: [] });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("handle Submit: ", this.state);
        const keyword = this.state.keyword;
        Router.push(`/search?keyword=${keyword}`);
    }

    render() {
        const { searchPanel, searchProducts } = this.state;
        
        return (
            <form
                className="ps-form--quick-search"
                method="get"
                action="/"
                onSubmit={this.handleSubmit.bind(this)}>
                <div className="ps-form__categories">
                    {/* <select className="form-control" value = {this.state.category} onChange= {(e)=> {this.setState({category: e.target.value})}}>
                        {exampleCategories.map(category => (
                            <option value={category} key={category}>
                                {option}
                            </option>
                        ))}
                    </select> */}

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
