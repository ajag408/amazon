import React from 'react';

const PartialDescription = (props) =>{ 
    if(props && props.product){
        return (
            <div className="ps-document">
                {props.product.description}
            </div>
        )
    }
    else {
        return(
            <div></div>
        );
    } 
}

export default PartialDescription;
