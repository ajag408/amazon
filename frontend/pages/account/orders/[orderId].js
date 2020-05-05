import React, { useState } from 'react';
import HeaderDefault from '../../../components/shared/headers/HeaderDefault';
import NavigationList from '../../../components/shared/navigation/NavigationList';
import BreadCrumb from '../../../components/elements/BreadCrumb';
import OrderSummary from '../../../components/partials/account/OrderSummary';

function Order(props) {
  const breadCrumb = [
      {
          text: 'Home',
          url: '/',
      },
      {
          text: 'My Orders',
          url: '/account/my-orders',
      },
      {
          text: 'Order',
      },
  ];
  return (
    <div>
      <HeaderDefault />
      <NavigationList />
      <div className="ps-page--simple">
          <BreadCrumb breacrumb={breadCrumb} />
          <OrderSummary orderId={props.query.orderId} />
      </div>
    </div>
  );
}
Order.getInitialProps = (ctx) => {
  return { query: ctx.query };
}

export default Order;