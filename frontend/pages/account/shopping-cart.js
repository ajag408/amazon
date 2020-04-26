import React, { Component } from 'react';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import ShoppingCart from '../../components/partials/account/ShoppingCart';
import Axios from 'axios';
import Wishlist from '../../components/partials/account/Wishlist';
import NavigationList from '../../components/shared/navigation/NavigationList';
import {backendurl} from './../../backendurl';


class ShoppingCartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            cartTotal: 0 
        }
        this.handler = this.handler.bind(this);
    }
    componentDidMount() {
        Axios.get(`${backendurl}/cart/customer/5ea32fb4716ebc4f57fd8ae9/show-cart`).then(resp =>{
            if(resp.status === 200 && resp.data){
                this.setState(resp.data);
            }
        })
    }
    handler(data) {
        this.setState(data)
      }

    render(){
        return (
        <div className="site-content">
            <HeaderDefault />
            <NavigationList />
            <div className="ps-page--simple">
                <ShoppingCart state={this.state} handler={this.handler}/>
                <Wishlist state={this.state} handler={this.handler}/>
            </div>
        </div>
        );
    }
};

export default ShoppingCartPage;
