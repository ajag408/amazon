import React from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import NavigationList from '../../components/shared/navigation/NavigationList';
import AllOrders from '../../components/partials/account/AllOrders';
import OpenOrders from '../../components/partials/account/OpenOrders';
import CancelledOrders from '../../components/partials/account/CancelledOrders';
import DeliveredOrders from '../../components/partials/account/DeliveredOrders';

function MyOrders(props) {
  const breadCrumb = [
    {
        text: 'Home',
        url: '/',
    },
    {
        text: 'Order Tracking',
    },
  ];
  return (
      <div className="site-content">
          <HeaderDefault />
          <NavigationList />
          <div className="ps-page--simple">
              <BreadCrumb breacrumb={breadCrumb} />
              <div className="ps-product__content ps-tab-root">
                <Tabs defaultActiveKey="AllOrders" id="uncontrolled-tab-example">
                  <TabPane key="AllOrders" tab="All Orders">
                    <AllOrders />
                  </TabPane>
                  <TabPane key="OpenOrders" tab="Open Orders">
                    <OpenOrders />
                  </TabPane>
                  <TabPane key="DeliveredOrders" tab="DeliveredOrders">
                    <DeliveredOrders />
                  </TabPane>
                  <TabPane key="CancelledOrders" tab="Cancelled Orders">
                    <CancelledOrders />
                  </TabPane>
                </Tabs>
              </div>
          </div>
      </div>
  );
}

export default MyOrders;