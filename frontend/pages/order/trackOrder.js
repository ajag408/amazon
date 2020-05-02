import React from 'react';
import { withRouter } from 'next/router'
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import TrackOrderDetail from '../../components/partials/vendor/TrackOrderDetail';


class TrackOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    
    componentWillMount() {
    console.log(this.props.router.query.orderItemId);
      this.setState({
        orderItemId :this.props.router.query.orderItemId
      })
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
                text: 'Track Order',
            },
        ];

        return (

            <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <TrackOrderDetail trackId={this.state.orderItemId}></TrackOrderDetail>
            </div>        
            </div>
        );
    }
}

export default withRouter(TrackOrder);
