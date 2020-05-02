import React from 'react';
import { withRouter } from 'next/router'
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import DisplayOrderDetail from '../../components/partials/vendor/DisplayOrderDetail';


class DisplayOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    
    componentWillMount() {
    console.log(JSON.parse(this.props.router.query.order));
      this.setState({
          order : JSON.parse(this.props.router.query.order)
      })
    }

    render() {

        const {orderDetails} = JSON.parse(this.props.router.query.order);
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
            {console.log('Inside page',this.state.order)}
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <DisplayOrderDetail details={this.state.order}></DisplayOrderDetail>
            </div>        
            </div>
        );
    }
}

export default withRouter(DisplayOrder);
