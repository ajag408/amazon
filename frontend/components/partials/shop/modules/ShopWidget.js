import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getProductsByPrice,
    getProductsByBrands,
} from '../../../../store/product/action';
import { Slider, Checkbox } from 'antd';
import axios from 'axios';
import { backendurl } from './../../../../backendurl';


class ShopWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRatings: [{
                text: '1 star',
                _id: 1,
                checked: false,
            },
            {
                text: '2 star',
                _id: 2,
                checked: false,
            },
            {
                text: '3 star',
                _id: 3,
                checked: false,
            },
            {
                text: '4 star',
                _id: 4,
                checked: false,
            },
            {
                text: '5 star',
                _id: 5,
                checked: false,
            }],
            sellers: [],
            shopCategories: [],
            priceMin: 0,
            priceMax: 2000,
            selectedSellerIds: [],
            selectedRatingIds: [],
            selectedCategoryIds: []

        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.searchApiCall();
    }

    componentWillMount() {
        let data = {
            searchCriteria: ""
        }
        axios.post(backendurl + '/admin/sellerSearch', data)
            .then(response => {
                //console.log(" Status Code : ", response.status,  "  response: " , response);
                if (response.status === 200) {
                    //let seller = response.data;
                    let allSeller = response.data.map(seller => {
                        return { name: seller.name, Id: seller._id, checked: false }
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
                //console.log("Sho widget Categories are: ", resp.data)
                let allCategory = resp.data.map(seller => {
                    return { name: seller.name, Id: seller._id, checked: false }
                });
                this.setState({
                    shopCategories: allCategory
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

    handleFilterByBrand = (e) => {

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
            sellers: allSellers,
            searchData: []

        }, () => { this.searchApiCall() })

        //console.log("handleFilterBy seller" , event.target.id)
    }
    handleFilterForRating = (e) => {
        //console.log("handle Filter For rating", e.target.id, " ", e.target.checked);

        var ratingsAll = this.state.allRatings
        ratingsAll.filter(rat => {
            if (rat._id === e.target.id)
                rat.checked = e.target.checked
        })
        debugger;
        var ratingSelectedArray = this.state.selectedRatingIds;
        if (e.target.checked)
            ratingSelectedArray.push(e.target.id)
        else {
            ratingSelectedArray.splice(ratingSelectedArray.indexOf(e.target.id));
        }
        this.setState({
            selectedRatingIds: ratingSelectedArray,
            allRatings: ratingsAll,
            searchData: []

        }, () => { this.searchApiCall() })
    }

    handleFilterForCategory = (e) => {
        //console.log("handle Filter For category", e.target.id, " ", e.target.checked);
        var categories = this.state.shopCategories;
       categories.filter(category => {
            if (category.Id === e.target.id)
                category.checked = e.target.checked
        })
        var categorySelectedArray = this.state.selectedCategoryIds;
        if (e.target.checked)
            categorySelectedArray.push(e.target.id)
        else {
            categorySelectedArray.splice(categorySelectedArray.indexOf(e.target.id));
        }
        this.setState({
            selectedCategoryIds: categorySelectedArray,
            shopCategories: categories,
            searchData: []

        }, () => { this.searchApiCall() })
    }

    searchApiCall() {
        var data = {
            sellerId: this.state.selectedSellerIds,
            lowerPrice: this.state.priceMin,
            upperPrice: this.state.priceMax,
            productCategory: this.state.selectedCategoryIds,
            ratings: this.state.selectedRatingIds

        };
        console.log("Before sending data to database, Data received from parent:  ", this.props.pageNumber);

        axios.post(`${backendurl}/product/search-product?limit=10&page=${this.props.pageNumber}`, data).then(resp => {
            if (resp.status === 200 && resp.data) {
                //console.log("  ShopWidget => response data is: ", resp.data)
                this.props.onChange(resp.data);
            }
        })
    }

    handleClick = item => event => {

        //console.log("Inside handle Click  id is: ", event.target.id, "  value:  ", item._id)
        this.setState({
            [event.target.id]: item._id
        }, () => { this.searchApiCall() })

    }

    render() {

        
        let allSellers = this.state.sellers.map(seller => {
            return (
                <div>
                    <label>
                        <Checkbox
                            checked={!!seller.checked} id={seller.Id} name={seller.name} onChange={this.handleFilterByBrand.bind(this)} />
                        {seller.name}
                    </label>
                </div>
            )
        })

        let ratingFo = this.state.allRatings.map(rating => {
            return (
                <div>
                    <label>
                        <Checkbox
                            checked={!!rating.checked} id={rating._id} name={rating.text} onChange={this.handleFilterForRating.bind(this)} />
                        {rating.text}
                    </label>
                </div>
            )
        })

        let allCategories = this.state.shopCategories.map(category => {
            return (
                <div>
                    <label>
                        <Checkbox
                            checked={!!category.checked} id={category.Id} name={category.name} onChange={this.handleFilterForCategory.bind(this)} />
                        {category.name}
                    </label>
                </div>
            )
        })
       
        return (
            <div className="ps-layout__left">
                <aside className="widget widget_shop">
                    <h4 className="widget-title">Categories</h4>
                    <figure>
                        {allCategories}
                    </figure>
                </aside>
                <aside className="widget widget_shop">
                    <h4 className="widget-title">Ratings</h4>
                    <figure>
                        {ratingFo}
                    </figure>
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
