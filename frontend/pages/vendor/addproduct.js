import React from 'react';
import { withRouter } from 'next/router'
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import DisplayOrderDetail from '../../components/partials/vendor/DisplayOrderDetail';
import AddProduct from '../../components/partials/vendor/AddProduct';


class AddProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           product : {}
        }
    }
    
    componentWillMount() {
       
        if(this.props.router.query.product) {
            console.log("Product inside addProduct",this.props.router.query.product);
            this.setState({
                product : JSON.parse(this.props.router.query.product)
            })
        }
    }

    render() {

        const breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            // {
            //     text: 'Shop',
            //     url: '/shop',
            // },
            {
                text: 'OrderDetails',
            },
        ];

        return (

            <div className="site-content">
            {console.log('Inside page',this.state.product)}
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <AddProduct product={this.state.product}></AddProduct>
            </div>        
            </div>
        );
    }
}

export default withRouter(AddProductPage);
