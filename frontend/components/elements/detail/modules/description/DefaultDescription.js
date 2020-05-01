import React, { Component } from 'react';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

import PartialDescription from './PartialDescription';
import PartialSpecification from './PartialSpecification';
import PartialVendor from './PartialVendor';
import PartialReview from './PartialReview';
import PartialOffer from './PartialOffer';

class DefaultDescription extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(){
        //console.log("DefaultDescription componentWillReceiveProps props are: ", this.props);
    }
    render() {

        let hasRatings ;
        if(this.props.product && this.props.product.hasRatings){
            hasRatings = <TabPane tab={`Reviews (${this.props.product.ratingAndReviews.length})`} key="4">
                <PartialReview product={this.props.product} />
            </TabPane>
        }
        return (
            <div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Description" key="1">
                            <PartialDescription product={this.props.product}/>
                        </TabPane>
                       {hasRatings}
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default DefaultDescription;
