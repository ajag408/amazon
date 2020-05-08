import React from 'react';

import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Register from '../../components/partials/account/Register';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

const RegisterPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Register an account',
    },
  ];

  return (
    <div className="site-content">
      <HeaderDefault />
      <HeaderMobile />
      <NavigationList />
      <div className="ps-page--my-account">
        <BreadCrumb breacrumb={breadCrumb} />
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
