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

    handleSearch =  (e) =>  {
        this.setState({
            keyword: e.target.value, 
            searchProducts : [], 
       
        },()=> {
               
                if (this.state.keyword !== ''){
                    var data = {
                        productName: this.state.keyword
                    }
                    Axios.post(`${backendurl}/product/search-product`, data).then(resp => {
                        if (resp.status === 200 && resp.data) {
                            console.log("Response in front end is: ", resp.data.message);
                            this.setState({
                                searchProducts: resp.data.message, 
                                searchPanel :true
                            });
                            console.log("handle search  ", this.state, " Value :  ", this.state.keyword); 
                        }
                    })
                }else {
                    this.setState({
                        searchPanel: false
                    })
                }
                
        })
        
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
                method="post"
                action="/"
                onSubmit={this.handleSubmit.bind(this)}>
                <div className="ps-form__categories">
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
                        {searchProducts  && searchProducts.length > 0 ? (
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
