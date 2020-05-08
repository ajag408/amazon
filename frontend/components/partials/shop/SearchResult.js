import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
    getProducts,
    getProductsByKeyword,
} from '../../../store/product/action';

import Product from '../../elements/products/Product';
import ProductWide from '../../elements/products/ProductWide';
import ShopWidget from './modules/ShopWidget';

class SearchResult extends Component {
    state = {
        listView: true,
        pageNumber: 1,
        pageCount: 0,
        results: {},
        sortedValue: ""
    };

    constructor (props){
        super(props);
        // this.loadData = this.loadData.bind(this);
        this.childCallback = this.childCallback.bind(this); 
        // this.onPrevPageBtnClick = this.onPrevPageBtnClick.bind(this);
        // this.onNextPageBtnClick = this.onNextPageBtnClick.bind(this);
        // this.handleSorting = this.handleSorting.bind(this);
    }

    componentDidMount() {
        const { query } = this.props.router;
        if (query) {
            this.props.dispatch(getProductsByKeyword(query.keyword));
        }
        
    }

    handleChangeViewMode = event => {
        event.preventDefault();
        this.setState({ listView: !this.state.listView });
    };


    childCallback(data) {
        console.log("childCallback => called, refreshing data!", data);
       this.setState({
           results : {allProducts : data.message},
           pageCount:  data.pageCount
       })
    }

    // onPrevPageBtnClick(e) {
    //     debugger;
    //     e.preventDefault();
    //     this.setState({
    //         pageNumber: this.state.pageNumber - 1
    //         // , sellerProducts: []
    //     })
    // }

    // onNextPageBtnClick(e) {
    //     debugger;
    //     e.preventDefault();
    //     this.setState({
    //         pageNumber: this.state.pageNumber + 1
    //         // , sellerProducts: []
    //     })
    // }

    // handleSorting( e){
    //     console.log("sorted" , e.target.value);
    //      this.setState({
    //          sortedValue: e.target.value
            
    //     })

    //     console.log("handle sorting" , this.state.sortedValue)
        
    // }


    render() {
        const { allProducts } = this.state.results;
        let currentProducts = this.state.products;
        const viewMode = this.state.listView;


        // let paginationPrevBtnClass = ""
        // let disabledPrev = ''
        // if (this.state.pageNumber == 1) {
        //     paginationPrevBtnClass = "btnDisabled"
        //     disabledPrev = 'true'
        // }
        // else {
        //     paginationPrevBtnClass = "btnPagination"
        //     disabledPrev = ''
        // }
        // let paginationNextBtnClass = ""
        // //debugger;
        // let disabledNext = ''
        // if (this.state.pageNumber == this.state.pageCount) {
        //     paginationNextBtnClass = "btnDisabled"
        //     disabledNext = 'true'
        // }
        // else {
        //     paginationNextBtnClass = "btnPagination"
        //     disabledNext = ''
        // }

        debugger;
        return (
            <div className="ps-layout--shop">
                {console.log("Render is: : ", this.state.sortedValue)}
                <ShopWidget onChange={this.childCallback} 
                sortedValu={this.state.sortedValue} pageNumber={this.state.pageNumber}
                 />
                <div className="ps-layout__right">
                    <div className="ps-shopping">
                        <div className="ps-shopping__header">
                            {allProducts && allProducts.length > 0 ? (
                                <p>
                                    <strong>
                                        {allProducts ? allProducts.length : 0}
                                    </strong>
                                    <span className="ml-1">Products found</span>
                                </p>
                            ) : (
                                <p>Not found! Try with another keyword.</p>
                            )}

                            <div className="ps-shopping__actions">
                                <div className="ps-shopping__view">
                                    <p>View</p>
                                    <ul className="ps-tab-list">
                                        <li
                                            className={
                                                viewMode === true
                                                    ? 'active'
                                                    : ''
                                            }>
                                            <a
                                                href="#"
                                                onClick={
                                                    this.handleChangeViewMode
                                                }>
                                                <i className="icon-grid"></i>
                                            </a>
                                        </li>
                                        <li
                                            className={
                                                viewMode !== true
                                                    ? 'active'
                                                    : ''
                                            }>
                                            <a
                                                href="#"
                                                onClick={
                                                    this.handleChangeViewMode
                                                }>
                                                <i className="icon-list4"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    {/* <div>
                                        <select onChange = {this.handleSorting}> 
                                            <option>Sort By:</option>
                                            <option value = "price"> Price Increasing</option>
                                            <option value = "-price"> Price Decreasing</option>
                                        </select>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                        <div className="ps-shopping__content">
                            {viewMode === true ? (
                                <div className="ps-shopping-product">
                                    <div className="row">
                                        {allProducts && allProducts.length > 0
                                            ? allProducts.map(item => (
                                                  <div
                                                      className="col-lg-4 col-md-4 col-sm-6 col-6 "
                                                      key={item.id}>
                                                      <Product product={item} />
                                                  </div>
                                              ))
                                            : ''}
                                    </div>
                                </div>
                            ) : (
                                <div className="ps-shopping-product">
                                    {allProducts && allProducts.length > 0
                                        ? allProducts.map(item => (
                                              <ProductWide
                                                  product={item}
                                                  key={item.id}
                                              />
                                          ))
                                        : ''}
                                </div>
                            )}
                            {/* <div className="ps-shopping__footer">
                                <div class="center-aligned">
                                    <button class={paginationPrevBtnClass} disabled={disabledPrev} onClick={this.onPrevPageBtnClick}>
                                        Prev
                                </button>
                                    <div class="divPageNumber">{this.state.pageNumber}/{this.state.pageCount}</div>
                                    <button class={paginationNextBtnClass} disabled={disabledNext} onClick={this.onNextPageBtnClick}>
                                        Next
                                </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    //console.log("map state to props: ", state.product);
    return state.product;
};
export default withRouter(connect(mapStateToProps)(SearchResult));
