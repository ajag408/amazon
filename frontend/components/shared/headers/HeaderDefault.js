
import React, { Component, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';

import { backendurl } from './../../../backendurl';
import Axios from 'axios';
class HeaderDefault extends Component {
    constructor({ props }) {
        super(props);
        this.state= {
            menuData:[]
        }
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', this.handleScroll);
        }

      
            //console.log("Header Default => component Did Mount");
            Axios.get(`${backendurl}/admin/getAllProductCategories`).then(resp => {
                if (resp.status === 200 && resp.data) {
                    //console.log("menu data", resp.data)
                    this.setState({
                        menuData: resp.data
                    });
                }
            })
            //console.log("Product Categories: ", this.state.menuData)


    }

    handleScroll = () => {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (number >= 300) {
            document
                .getElementById('headerSticky')
                .classList.add('header--sticky');
        } else {
            document
                .getElementById('headerSticky')
                .classList.remove('header--sticky');
        }
    };

    render() {
        return (
            <header
                className="header header--1"
                data-sticky="true"
                id="headerSticky">
                <div className="header__top">
                    <div className="ps-container">
                        <div className="header__left">
                        <div className="menu--product-categories">	
                                <div className="menu__toggle">	
                                    <i className="icon-menu"></i>	
                                </div>	
                                <div className="menu__content">	
                                    <MenuCategories data={this.state && this.state.menuData ? this.state.menuData: ""}/>	
                                </div>	
                            </div>	
                            <Link href="/">	
                                <a className="ps-logo">	
                                    <img	
                                        src="/static/img/amazon_logo.png"	
                                        alt="amazon"	
                                    />	
                                </a>	
                            </Link>
                            {/* <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i className="icon-menu"></i>
                                    <span> Shop by Department</span>
                                </div>
                                <div className="menu__content">
                                    <MenuCategories 
                                     data={this.state && this.state.menuData ? this.state.menuData: ""}
                                    />
                                </div>
                            </div> */}
                        </div>
                        <div className="header__center">
                            <SearchHeader />
                        </div>
                        <div className="header__right">
                            <HeaderActions />
                        </div>
                    </div>
                </div>
                <NavigationDefault />
            </header>
        );
    }
}

export default HeaderDefault;