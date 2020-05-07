import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import SearchHeader from './modules/SearchHeader';
import { addItem } from '../../../store/cart/action';

class HeaderProduct extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     product: props.
        // }
    }

    componentDidMount() {
        //console.log("HeaderProduct => componentDidMount")
        if (process.browser) {
            window.addEventListener('scroll', this.handleScroll);
        }
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { productData } = this.props;
        this.props.dispatch(addItem(productData));
    };

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
        const { productData } = this.props;
        if(productData){
            return (
                <header
                    className="header header--1 header--product"
                    data-sticky="true"
                    id="headerSticky">
                    <div className="header__top">
                        <div className="ps-container">
                            {/* <div className="header__left">
                                <Link href="/">
                                    <a className="ps-logo">
                                        <img
                                            src="/static/img/logo_light.png"
                                            alt="Amazon"
                                        />
                                    </a>
                                </Link>
                                <div className="menu--product-categories">
                                    <div className="menu__toggle">
                                        <i className="icon-menu"></i>
                                        <span> Shop by Department</span>
                                    </div>
                                    <div className="menu__content">
                                        <MenuCategories />
                                    </div>
                                </div>
                            </div> */}
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
        else {
            return (
                <div></div>
            )
        }
     
    }
}
export default connect()(HeaderProduct);
