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
            priceMin: 0,
            priceMax: 2000,
            selectedSellerIds : []
        };
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
    }

    // parentCallbackHandler() {
    //     console.log("Inside Parent call back handler");
    //     if (typeof this.props.onChange === 'function') {
    //         this.props.onChange();
    //     }
    //     else {
    //         console.log("this.props.onChange is not a function!");
    //     }
    // }

    handleChangeRange(value) {
        this.setState({
            priceMin: value[0],
            priceMax: value[1],
        }, () => { this.searchApiCall() })
        
        //this.props.dispatch(getProductsByPrice(value));

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

        console.log("handleFilterBy seller" , event.target.id)
    }

    searchApiCall(){
        var data = {
            sellerId: this.state.selectedSellerIds,
            lowerPrice: this.state.priceMin, upperPrice: this.state.priceMax
        };

        axios.post(`${backendurl}/product/search-product`, data).then(resp => {
            if (resp.status === 200 && resp.data) {
                console.log("  ShopWidget => response data is: ", resp.data)
                this.props.onChange(resp.data);
            }
        })
    }

    render() {
        /* You can get categories from your API using redux */
        const shopCategories = [
            {
                text: 'All Products',
                url: '/shop',
            },
            {
                text: 'Clothing & Apparel',
                url: '/shop?category=clothing',
            },
            {
                text: 'Garden & Kitchen',
                url: '/shop?category=garden',
            },
            {
                text: 'Consumer Electrics',
                url: '/shop?category=electronic',
            },
            {
                text: 'Health & Beauty',
                url: '/shop?category=beauty',
            },
            {
                text: 'Computers & Technologies',
                url: '/shop?category=technologies',
            },
            {
                text: 'Jewelry & Watches',
                url: '/shop?category=jewelry',
            },
            {
                text: 'Phones & Accessories',
                url: '/shop?category=phone',
            },
            {
                text: 'Sport & Outdoor',
                url: '/shop?category=sport',
            },
            {
                text: 'Babies & Moms',
                url: '/shop?category=baby',
            },
            {
                text: 'Books & Office',
                url: '/shop?category=book',
            },
            {
                text: 'Cars & Motocycles',
                url: '/shop?category=cars',
            },
        ];
        
    
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
        return (
            <div className="ps-layout__left">
                <aside className="widget widget_shop">
                    <h4 className="widget-title">Categories</h4>
                    <ul className="ps-list--categories">
                        {shopCategories.map(category => (
                            <li key={category.text}>
                                <Link href={category.url}>
                                    <a>{category.text}</a>
                                </Link>
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
