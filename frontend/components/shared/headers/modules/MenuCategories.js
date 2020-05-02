import React from 'react';
import menuData from '../../../../public/static/data/menu';
import Menu from '../../../elements/menu/Menu';
const MenuCategories = (menuData) => (
   
    <Menu data={menuData.data} className="menu--dropdown">
        {/* {console.log("Menu categories are", menuData)} */}
        </Menu>
);

export default MenuCategories;
