import React, { Component } from 'react';
import Link from 'next/link';
import { notification } from 'antd';
import Menu from '../../elements/menu/Menu';

import menuData from '../../../public/static/data/menu';
import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwicher from '../headers/modules/LanguageSwicher';

class NavigationDefault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: null,
            role: null,
        }
    }

    componentDidMount(){
        this.setState({
            customerId: localStorage.getItem('user_id'),
            role: localStorage.getItem('role'),
        })
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }
    render() {
        return (
            <nav className="navigation">
                <div className="ps-container">
                    <div className="navigation__left">
                        <Menu
                            data={menuData.menuPrimary.menu_1}
                            className="menu"
                        />
                        {/* <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                                <span> Shop by Department</span>
                            </div>
                            <div className="menu__content">
                                <Menu
                                    data={menuData.product_categories}
                                    className="menu--dropdown"
                                />
                            </div>
                        </div> */}
                    </div>
                    <div className="navigation__right">
                        <ul className="navigation__extra">
                            <li>
                                <Link href="/search/">
                                    <a>Search By Seller</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/vendor/become-a-vendor">
                                    <a>Sell on Amazon</a>
                                </Link>
                            </li>
                            {this.state.role === 'Customer' ? (<li>
                                <Link href="/account/my-orders">
                                    <a>My Orders</a>
                                </Link>
                            </li>): (null)}
                            {/* <li>
                                <CurrencyDropdown />
                            </li> */}
                            {/* <li>
                                <LanguageSwicher />
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavigationDefault;