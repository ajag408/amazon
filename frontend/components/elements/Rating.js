import React from 'react';

const Rating = (props) => {

    var ratings;
    if(props.ratings){
        ratings = props.ratings;
    }
    
    var ratingsDiv;
    if(ratings === 5){
       ratingsDiv = ( <span className="ps-rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
    </span>);
    } else if (ratings === 4){
        ratingsDiv = ( <span className="ps-rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
    </span>);
    } else if (ratings === 3){
        ratingsDiv = ( <span className="ps-rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
    </span>);
    } else if (ratings === 2){
        ratingsDiv = ( <span className="ps-rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
    </span>);
    } else if (ratings === 1){
        ratingsDiv = ( <span className="ps-rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
    </span>);
    } else {
        ratingsDiv = ( <span className="ps-rating">
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
        <i className="fa fa-star-o"></i>
    </span>);
    }

    return(
    // <span className="ps-rating">
    //     <i className="fa fa-star"></i>
    //     <i className="fa fa-star"></i>
    //     <i className="fa fa-star"></i>
    //     <i className="fa fa-star"></i>
    //     <i className="fa fa-star-o"></i>
    // </span>
    ratingsDiv
)};

export default Rating;