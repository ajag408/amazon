import React, { Component } from 'react';

import { Tabs } from 'antd';

import PartialDescription from './PartialDescription';
import PartialSpecification from './PartialSpecification';
import PartialVendor from './PartialVendor';
import PartialReview from './PartialReview';
import PartialOffer from './PartialOffer';

const { TabPane } = Tabs;

class DefaultDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: ''
    }
  }

  componentDidMount(){
    this.setState({
      role: localStorage.getItem('role')
    })
  }

  componentWillReceiveProps() {
    // console.log("DefaultDescription componentWillReceiveProps props are: ", this.props);
  }

  render() {
    return (
      <div>
        <div className="ps-product__content ps-tab-root">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Description" key="1">
              <PartialDescription product={this.props.product} />
            </TabPane>
            {this.state.role === 'Customer' ? (<TabPane tab={`Reviews (${this.props.product.ratingAndReviews.length})`} key="4">
              <PartialReview product={this.props.product} />
            </TabPane>) : (null)}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default DefaultDescription;
