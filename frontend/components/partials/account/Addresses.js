import React, { Component } from 'react';
import Link from 'next/link';
import { backendurl } from './../../../backendurl';
import Axios from 'axios';
import AddressItem from './../account/modules/AddressItem'

class Addresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address : []
        };
    }

    componentWillMount(){
        console.log("Addresses => component Did Mount ");
        let data = {
            customerId: '5e9e36cf6b95206ad289645f'
        }
        let url = `${backendurl}/customer/get-address`;
        Axios.post(url, data).then(resp => {
            if (resp.status === 200 && resp.data) {
                console.log("response Address is: ", resp.data )
                this.setState({ address: resp.data.message})
            }
        }); 
    }

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
                icon: 'icon-user',
            },
            {
                text: 'Notifications',
                url: '/account/notifications',
                icon: 'icon-alarm-ringing',
            },
            {
                text: 'Invoices',
                url: '/account/invoices',
                icon: 'icon-papers',
            },
            {
                text: 'Address',
                url: '/account/addresses',
                icon: 'icon-map-marker',
                active: true,
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
                icon: 'icon-store',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
                icon: 'icon-heart',
            },
        ];
      
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-lg-4">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <img src="/static/img/users/3.jpg" />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>username@gmail.com</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            {accountLinks.map(link => (
                                                <li
                                                    key={link.text}
                                                    className={
                                                        link.active
                                                            ? 'active'
                                                            : ''
                                                    }>
                                                    <Link href={link.url}>
                                                        <a>
                                                            <i
                                                                className={
                                                                    link.icon
                                                                }></i>
                                                            {link.text}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <Link href="/account/my-account">
                                                    <a>
                                                        <i className="icon-power-switch"></i>
                                                        Logout
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div> */}
                        <div className="col-lg-8">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__content">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <figure className="ps-block--address">
                                                <figcaption>
                                                   Saved Address
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    
                                                    {this.state.address && this.state.address.length > 0
                                                        ? this.state.address.map(item => (
                                                            <div
                                                                className="col-lg-10 col-md-10 col-sm-8 col-8 "
                                                                key={item._id}>
                                                                <AddressItem address={item} />
                                                            </div>
                                                        ))
                                                        : 
                                                        <div>
                                                            You Have Not Set Up This
                                                            Type Of Address Yet.
                                                          

                                                        </div>
                                                    }
                                                    
                                                    <div>
                                                         <div></div>
                                                        <Link href="/account/edit-address">
                                                            <a>Add New Address</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Addresses;
