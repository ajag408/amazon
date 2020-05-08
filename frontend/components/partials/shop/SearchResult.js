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
        results: {},
    };

    constructor (props){
        super(props);
        // this.loadData = this.loadData.bind(this);
        this.childCallback = this.childCallback.bind(this);
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
        //console.log("childCallback => called, refreshing data!", data);
       this.setState({
           results : {allProducts : data.message}
       })
    }

    // onClickPrevious = async () => {
    //     console.log("Inside onClick Previous");
    //     await this.setState({
    //         pageNumber: parseInt(this.state.pageNumber, 10) - 1
    //     })
    //     console.log("OnClick NExt: ", this.state.pageNumber);
    //     //this.getCompanyEvents();
    // }


    // onClickNext = async () => {
    //     console.log("Inside onClick Next");
    //     console.log("Increasing count: ", parseInt(this.state.pageNumber) + 1);
    //     await this.setState({
    //         pageNumber: parseInt(this.state.pageNumber, 10) + 1
    //     })
    //     console.log("OnClick NExt: ", this.state.pageNumber);
    //     //this.getCompanyEvents();
    // }


    render() {
        const { allProducts } = this.state.results;
        let currentProducts = this.state.products;
        const viewMode = this.state.listView;
        return (
            <div className="ps-layout--shop">
                <ShopWidget onChange = {this.childCallback} />
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
                            <div className="ps-shopping__footer">
                                <div className="ps-pagination">
                                    <ul className="pagination">

                                        {/* <li class="page-item">
                                            <a class="page-link" href="#" onClick={() => { this.onClickPrevious() }}>Previous</a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="#">{this.state.pageNumber}</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="#" onClick={() => { this.onClickNext() }}>Next</a>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
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
