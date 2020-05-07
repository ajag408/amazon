import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Login from '../../components/partials/account/Login';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

const LoginPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Login',
    },
  ];
  return (
    <div className="site-content">
      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      <div className="ps-page--my-account">
        <BreadCrumb breacrumb={breadCrumb} />
        <Login />
      </div>

    </div>
  );
};

export default LoginPage;
