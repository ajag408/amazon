import React from 'react';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import FaqsContent from '../../components/partials/page/FaqsContent';
import Newletters from '../../components/partials/commons/Newletters';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import AddProduct from '../../components/partials/product/AddProduct';

const FaqsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Add Product',
        },
    ];

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <AddProduct />
                </div>
            </div>
        </div>
    );
};

export default FaqsPage;
