

import React, { useState, useEffect } from 'react';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HomeBanner from '../components/partials/homepage/home-default/HomeBanner';
import SiteFeatures from '../components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '../components/partials/homepage/home-default/HomeAdsColumns';
import ConumerElectronics from '../components/partials/homepage/home-default/ConumerElectronics';
import Clothings from '../components/partials/homepage/home-default/Clothings';
import GardenAndKitchen from '../components/partials/homepage/home-default/GardenAndKitchen';
import NewArrivals from '../components/partials/homepage/home-default/NewArrivals';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import HomeDefaultTopCategories from '../components/partials/homepage/home-default/HomeDefaultTopCategories';
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
