import React, { Component } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Product from '../../../elements/products/Product';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import { consumerElectronic } from '../../../../public/static/data/home-1';
import { backendurl } from './../../../../backendurl';
import Axios from 'axios';
import { connect } from "react-redux";
class ConsumerElectronics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProducts: [],
            activeCategory: 'newArrivals',
        };
        //console.log("Consumer Electronics Constructor is called", this.props.category)

        //this.getAllProducts();
    }

    componentDidMount(){
        //console.log("Consumer Electronics Component Did Mount is called")
        Axios.get(`${backendurl}/product/getAllProducts`).then(resp => {
            if (resp.status === 200 && resp.data) {

                //console.log("ConsumerElectronics response in front end is: ", resp.data.message);
                this.setState({
                    currentProducts: resp.data.message
                });
            }
        })
    }


    componentWillReceiveProps(){
        //console.log('ConsumerElectronics componentWillReceiveProps', this.state.category);
        if(this.props.category){
            this.getProductsByCategory(this.props.category.itemId)
        }
    }


    getProductsByCategory(id){

        //console.log(" ConsumerElectronics getting product by Category", id);
        const data = {
            categoryDetailsId:id
        }
        //console.log("ConsumerElectronics Component Will receieve Props", this.props.category);

        Axios.post(`${backendurl}/admin/getProductCategoryDetails`, data).then(async resp => {
            if (resp.status === 200 && resp.data) {
                //console.log("ConsumerElectronics GetProductCategoryDetails: response is: ", resp.data)
                await this.setState({
                    currentProducts: resp.data
                });
            }
        })

    }

    handleChangeProduct(e, products, currentItem) {
        e.preventDefault();
        this.setState({
            currentProducts: products,
            activeCategory: currentItem,
        });
    }

    render() {
        const carouselSetting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 3,
            lazyload: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
            responsive: [
                {
                    breakpoint: 1680,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1366,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        arrows: false,
                    },
                }, {
                    breakpoint: 380,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false,
                    },
                },
            ],
        };
        
        const products = this.state.currentProducts;
        const { newArrivals, mostPopular, bestSeller } = consumerElectronic;
        const { activeCategory } = this.state;
        const sectionLinks = [
            {
                title: 'New Arrivals',
                products: newArrivals,
                name: 'newArrivals',
            },
            {
                title: 'Best seller',
                products: bestSeller,
                name: 'bestSeller',
            },
            {
                title: 'Most Popular',
                products: mostPopular,
                name: 'mostPopular',
            },
        ];

        return (
            <div className="ps-product-list ps-garden-kitchen">
                {/* {console.log("ConsumerElectronics  Props received are:  ", this.props.category)} */}
                <div className="ps-container">
                    <div className="ps-section__header">
                        <h3>Consumer Electronics</h3>
                        <ul className="ps-section__links">
                            {sectionLinks.map(link => (
                                <li
                                    className={
                                        activeCategory === link.name
                                            ? 'active'
                                            : ''
                                    }
                                    key={link.name}>
                                    <a
                                        onClick={e =>
                                            this.handleChangeProduct(
                                                e,
                                                link.products,
                                                link.name
                                            )
                                        }>
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link href="/shop">
                                    <a>View All</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="ps-section__content">
                        
                        {products.length > 0 ? (

                            <Slider
                                {...carouselSetting}
                                className="ps-carousel outside">
                                {/* {console.log("products length is: ", products.length)} */}
                                {products.map(product =>  (
                                   
                                    // <div className="item" key={product._id}>
                                    //     <Product product={product} />
                                    // </div>
                                    <Link href="/product/[pid]" as={`/product/${product._id}`}>
                                        <Product product={product}></Product>
                                    </Link>
                                ))}
                            </Slider>
                        ) : (
                            <p>No products</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    //console.log("Index -> mapStateToProps, state: ", state);
    return {
        category: state.product.category
    }
}

export default connect(mapStateToProps, null)(ConsumerElectronics);
