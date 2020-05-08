

import React, { useState, useEffect } from 'react';
import HeaderDefault from '../components/shared/headers/HeaderDefault';

import ConumerElectronics from '../components/partials/homepage/home-default/ConumerElectronics';

import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';

import '../scss/home-default.scss';


const Index = (props) => {

    // const [subscribe, setSubscribe] = useState(false);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSubscribe(true);
    //     }, 10000);
    // });

    return (

        <div className="site-content">
           
            <HeaderDefault />
          
            <HeaderMobile />
            <NavigationList />
            <main id="homepage-1">
                {/* <HomeDefaultTopCategories /> */}
                <ConumerElectronics />
                {/* <Clothings />
                <GardenAndKitchen />
                <NewArrivals /> */}
            </main>
        </div>
    );
};


//export default Index;
export default Index;
