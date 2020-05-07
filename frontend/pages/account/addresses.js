import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import BreadCrumb from '../../components/elements/BreadCrumb';

import Addresses from '../../components/partials/account/Addresses';
import NavigationList from '../../components/shared/navigation/NavigationList';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Addresses',
        },
    ];
    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Addresses />
            </div>
 
        </div>
    );
};

export default MyAccountPage;
