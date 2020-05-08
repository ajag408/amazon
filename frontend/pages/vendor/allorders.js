import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import VendorDashboard from '../../components/partials/vendor/VendorDashboard';

import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

const AllOrders = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'All Order',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <BreadCrumb breacrumb={breadCrumb} />
            <div className="ps-page--single">
                <VendorDashboard />
            </div>
          
        </div>
    );
};

export default AllOrders;
