import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import  Router  from 'next/router';
class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {

            storage: '' 
        };
    }
    componentDidMount(){
        this.setState({ 
            storage : localStorage
                 });
      }

    handleLogout = e => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('student_id');
        // this.setState({ state: this.state });
        this.forceUpdate();
    };

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
            },
            {
                text: 'Notifications',
                url: '/account/notifications',
            },
            {
                text: 'Invoices',
                url: '/account/invoices',
            },
            {
                text: 'Address',
                url: '/account/addresses',
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
            },
        ];
        const {storage} = this.state;

        if (storage.token) {
            if(storage.role === "Customer"){
                return (
                    <div className="ps-block--user-account">
                        <i className="icon-user"></i>
                        <div className="ps-block__content">
                            <ul className="ps-list--arrow">
                                {accountLinks.map(link => (
                                    <li key={link.text}>
                                        <Link href={link.url}>
                                            <a>{link.text}</a>
                                        </Link>
                                    </li>
                                ))}
                                <li className="ps-block__footer">
                                    <a
                                        href="#"
                                        onClick={this.handleLogout.bind(this)}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
                //add quick links for seller/admin here
            } else {
                return (
                    <div className="ps-block--user-header">
                        <div className="ps-block__left">
                            <i className="icon-user"></i>
                        </div>
                        <div className="ps-block__right">
                            <Link href="/account/login">
                                <a>Login</a>
                            </Link>
                            <Link href="/account/register">
                                <a>Register</a>
                            </Link>
                        </div>
                    </div>
                );               
            }
        } else {
            return (
                <div className="ps-block--user-header">
                    <div className="ps-block__left">
                        <i className="icon-user"></i>
                    </div>
                    <div className="ps-block__right">
                        <Link href="/account/login">
                            <a>Login</a>
                        </Link>
                        <Link href="/account/register">
                            <a>Register</a>
                        </Link>
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
