import React from 'react';
import Link from 'next/link';

const HomeDefaultTopCategories = () => (
    <div className="ps-top-categories">
        <div className="ps-container">
            <h3>Top categories of the month</h3>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/1.jpg" alt="Amazon" />
                        <p>Electronics</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/2.jpg" alt="Amazon" />
                        <p>Clothings</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/3.jpg" alt="Amazon" />
                        <p>Computers</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/4.jpg" alt="Amazon" />
                        <p>Home & Kitchen</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/5.jpg" alt="Amazon" />
                        <p>Health & Beauty</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/6.jpg" alt="Amazon" />
                        <p>Health & Beauty</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/7.jpg" alt="Amazon" />
                        <p>Jewelry & Watch</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/8.jpg" alt="Amazon" />
                        <p>Technology Toys</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HomeDefaultTopCategories;
