import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import {
    getProductsByPrice,
    getProductsByBrands,
} from '../../../../store/product/action';
import { Slider, Checkbox } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { backendurl } from './../../../../backendurl';


class ShopWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellers: [],
            shopCategories: [],
            priceMin: 0,
            priceMax: 2000,
            selectedSellerIds : []
        
        };

       this.handleClick =  this.handleClick.bind(this);
    }

    componentDidMount(){
        this.searchApiCall();
    }

    componentWillMount(){
        let data = {
            searchCriteria: ""
        }
        axios.post(backendurl + '/admin/sellerSearch', data)
            .then(response => {
                //console.log(" Status Code : ", response.status,  "  response: " , response);
                if (response.status === 200) {
                    //let seller = response.data;
                    let allSeller = response.data.map(seller => {
                        return { name: seller.name, Id : seller._id, checked: false }
                    });
                    this.setState({
                        sellers: allSeller
                    });
                }
            })
            .catch(err => {
                this.setState({ errorMessage: "Sellers could not be viewed" });
            });

        axios.get(`${backendurl}/admin/getAllProductCategories`).then(resp => {
            if (resp.status === 200 && resp.data) {
                console.log("Sho widget Categories are: ", resp.data)
                this.setState({
                    shopCategories: resp.data
                });
            }
        })
            .catch(err => {
                this.setState({ errorMessage: "Sellers could not be viewed" });
            });
    }


    handleChangeRange(value) {
        this.setState({
            priceMin: value[0],
            priceMax: value[1],
        }, () => { this.searchApiCall() })
        
    }

    handleFilterByBrand= (e) => {
        
        var allSellers = this.state.sellers;
        allSellers.filter(seller => {
            if (seller.name === e.target.name)
                seller.checked = e.target.checked
        })
        var sellerSelectedArray = this.state.selectedSellerIds
        if (e.target.checked)
            sellerSelectedArray.push(e.target.id) 
        else {
            sellerSelectedArray.splice(sellerSelectedArray.indexOf(e.target.id));
        }

        this.setState({
            selectedSellerIds: sellerSelectedArray,
            sellers:  allSellers,
             searchData: []
           
        }, () => { this.searchApiCall() })

        //console.log("handleFilterBy seller" , event.target.id)
    }

    searchApiCall(){
        var data = {
            sellerId: this.state.selectedSellerIds,
            lowerPrice: this.state.priceMin, 
            upperPrice: this.state.priceMax, 
            productCategory: this.state.category, 
            rating: this.state.rating

        };
        //console.log("Before sending data to database, " , data);

        axios.post(`${backendurl}/product/search-product`, data).then(resp => {
            if (resp.status === 200 && resp.data) {
                console.log("  ShopWidget => response data is: ", resp.data)
                this.props.onChange(resp.data);
            }
        })
    }

    handleClick = item => event => {
       
        console.log("Inside handle Click  id is: ", event.target.id  , "  value:  ", item._id)
        this.setState({
           [event.target.id]: item._id
        }, () => { this.searchApiCall() })
       
    }

    render() {

        const ratings = [
            {
                text: '1 star',
                _id: 1,
            },
            {
                text: '2 star',
                _id: 2,
            },
            {
                text: '3 star',
                _id: 3,
            },
            {
                text: '4 star',
                _id: 4,
            },
            {
                text: '5 star',
                _id: 5,
            }]
        {console.log("Inside render, shop categories are: ", this.state.shopCategories)}
        let allSellers = this.state.sellers.map(seller => {
            return (
                <div>
                    <label>
                    <Checkbox 
                            checked={!!seller.checked} id={seller.Id} name ={seller.name}  onChange={this.handleFilterByBrand.bind(this)} />
                        {seller.name}
                    </label>
                </div>
            )
        })
        let allCategories= "";
        if(this.state.shopCategories && this.state.shopCategories.length >0){
            //console.log("ShopCategories are there",this.state.shopCategories );
            allCategories = 
                this.state.shopCategories.map(category => (
                    <li key={category.name} id ="category" onClick={this.handleClick(category)}>
                        {category.name}
                    </li>
                ))
            
        }
        return (
            <div className="ps-layout__left">
                <aside className="widget widget_shop">
                    <h4 className="widget-title">Categories</h4>
                    <ul className="ps-list--categories">
                        {/* {this.state. shopCategories.map(category => (
                            <li key={category.text}>
                                <Link href={category.url}>
                                    <a>{category.text}</a>
                                </Link>
                            </li>
                        ))} */}
                        {allCategories}
                    </ul>
                </aside>
                <aside className="widget widget_shop">
                    <h4 className="widget-title">Categories</h4>
                    <ul className="ps-list--categories">
                        {ratings.map(rating => (
                            <li key={rating._id} id="rating" onClick={this.handleClick(rating)}>
                                {rating.text}
                                {/* <Link href={category.url}>
                                    <a>{category.text}</a>
                                </Link> */}
                            </li>
                        ))}
                    </ul>
                </aside>
                <aside className="widget widget_shop">
                    <h4 className="widget-title">By Sellers</h4>
                    <figure>
                        {allSellers}
                    </figure>

                   
                    <figure>
                        <h4 className="widget-title">By Price</h4>
                        <Slider
                            range
                            defaultValue={[0, 2000]}
                            max={2000}
                            onAfterChange={this.handleChangeRange.bind(this)}
                        />
                        <p>
                            Price: ${this.state.priceMin} - ${this.state.priceMax}
                        </p>
                    </figure>
                </aside>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.product;
};
export default connect(mapStateToProps)(ShopWidget);
