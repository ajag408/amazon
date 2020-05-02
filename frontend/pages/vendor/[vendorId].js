import React, { Component } from 'react';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import BreadCrumb from '../../components/elements/BreadCrumb';
import Newletters from '../../components/partials/commons/Newletters';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import VendorStore from '../../components/partials/vendor/VendorStore';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';

class VendorStorePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static async getInitialProps(ctx) {
        return { query: ctx.query };
    }

    componentDidMount() {
        // const { pid } = this.props.query;
        // if (!pid) {
        //     Router.push('/page/page-404');
        // } else {
        //     let url = `${backendurl}/product/${pid}`;
        //     axios.get(url).then(resp => {
        //         if (resp.status === 200 && resp.data) {
        //             this.setState({ singleProduct: resp.data });
        //         }
        //     })
        // }
    }

    render() {
        const breadCrumb = [
            {
                text: 'Home',
                url: '/',
            },
            {
                text: 'Vendor store',
            },
        ];

        var sellerId1;
        if (this.props.query){
            sellerId1 = this.props.query.vendorId;
        }
        debugger;
            return (
                <div className="site-content">
                    <HeaderDefault />
                    <HeaderMobile />
                    <NavigationList />
                    <div className="ps-page--single ps-page--vendor">
                        <BreadCrumb breacrumb={breadCrumb} />
                        {this.props.query && <VendorStore sellerId = {sellerId1} />}
                    </div>
                    {/* <Newletters ayout="container" />
            <FooterDefault /> */}
                </div>
            );
    };
}

export default VendorStorePage;
