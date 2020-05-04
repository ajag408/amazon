import React, { Component } from 'react';
import { Rate } from 'antd';
import Rating from '../../../Rating';
import Axios from 'axios';
import { backendurl } from '../../../../../backendurl';
class PartialReview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userRating: 1,
            product: this.props.product
        }
        this.handleUserRatingChange = this.handleUserRatingChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    handleUserRatingChange = (value) => {
        this.setState({userRating: value});
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        let url = `${backendurl}/product/${this.state.product._id}/add-review`;
        let data = {
            customerId: '5ea3ab017c376a636208a017',// Need to change to take from local storage
            rating: this.state.userRating,
            review: form.review.value
        }
        Axios.post(url,data).then(resp => {
            if(resp.status === 200 && resp.data){
                this.setState({product: resp.data, userRating: 1})
            }
        });
    }

    render(){
        let {ratingAndReviews} = this.state.product;
        let stars = [0,0,0,0,0,0];
        ratingAndReviews.forEach(ratingAndReview => {
            stars[ratingAndReview.rating]++;    
        });
        console.log(stars);
        return (
            <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                    <div className="ps-block--average-rating">
                        <div className="ps-block__header">
                            <h3>{this.state.product.ratings.toFixed(1)}</h3>
                            <Rate disabled allowHalf defaultValue={this.state.product.ratings.toFixed(1)}/>
                            <span>{ratingAndReviews.length} Review</span>
                        </div>
                        <div className="ps-block__star">
                            <span>5 Star</span>
                            <div className="ps-progress" data-value="100">
                                <span></span>
                            </div>
                            <span>{ratingAndReviews.length > 0 ? ((stars[5]*100)/ratingAndReviews.length).toFixed(0) : 0}%</span>
                        </div>
                        <div className="ps-block__star">
                            <span>4 Star</span>
                            <div className="ps-progress" data-value="0">
                                <span></span>
                            </div>
                            <span>{ratingAndReviews.length > 0 ? ((stars[4]*100)/ratingAndReviews.length).toFixed(0) : 0}%</span>
                        </div>
                        <div className="ps-block__star">
                            <span>3 Star</span>
                            <div className="ps-progress" data-value="0">
                                <span></span>
                            </div>
                            <span>{ratingAndReviews.length > 0 ? ((stars[3]*100)/ratingAndReviews.length).toFixed(0) : 0}%</span>
                        </div>
                        <div className="ps-block__star">
                            <span>2 Star</span>
                            <div className="ps-progress" data-value="0">
                                <span></span>
                            </div>
                            <span>{ratingAndReviews.length > 0 ? ((stars[2]*100)/ratingAndReviews.length).toFixed(0) : 0}%</span>
                        </div>
                        <div className="ps-block__star">
                            <span>1 Star</span>
                            <div className="ps-progress" data-value="0">
                                <span></span>
                            </div>
                            <span>{ratingAndReviews.length > 0 ? ((stars[1]*100)/ratingAndReviews.length).toFixed(0) : 0}%</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                    <div>
                    <h4><b>Customer Reviews</b></h4>
                        {ratingAndReviews.map(ratingAndReview => {
                            return <div>
                               <p><b>{ratingAndReview.customer.name}</b></p>
                               <Rate disabled value={ratingAndReview.rating} />
                               <p>{ratingAndReview.review}</p>
                            </div>
                        })}
                    </div>
                    <form onSubmit={e => this.handleOnSubmit(e)} className="ps-form--review">
                        <h4>Submit Your Review</h4>
                        <p>
                            Your email address will not be published. Required fields are marked
                            <sup>*</sup>
                        </p>
                        <div className="form-group form-group__rating">
                            <label>Your rating of this product</label>
                            <Rate defaultValue={1} value={this.state.userRating} onChange={this.handleUserRatingChange}/>
                        </div>
                        <div className="form-group">
                            <textarea name='review'
                                className="form-control"
                                rows="6"
                                placeholder="Write your review here"></textarea>
                        </div>
                        <div className="form-group submit">
                            <button className="ps-btn">Submit Review</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default PartialReview;
