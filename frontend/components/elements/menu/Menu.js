
import Link from 'next/link';
import React, { Component } from 'react';

import MegaMenu from './MegaMenu';
import MenuDropdown from './MenuDropdown';
import { connect } from "react-redux";
import { setProductCategoryId } from "../../../store/product/action";

class Menu extends Component{
    constructor (props){
        super(props);
        // console.log(" Menu Props are: ", this.props.data);
        this.state ={
            data : props.data,
            className : props.className
        }
    }

    handleClick = item => event => {
        //console.log("Handle Click has this event: ", item.name + " ");
        var payload = {
            itemId: item._id,
            itemName: item.name
        }
        this.props.setProductCategory(payload);
    }

    render (){
        return (
            <ul className= {this.props.className ? this.props.className :"menu"}>
                {/* {console.log("Data is: ", this.props.data)} */}
                {this.props.data &&
                    this.props.data.map(item => {
                        if (item.subMenu) {
                            return <MenuDropdown menuData={item} key={item.text} />;
                        }
                        else
                            if (item.megaContent) {
                                return <MegaMenu menuData={item} key={item.text} />;
                            } else {
                                return (
                                    <li key={item._id} onClick={this.handleClick(item)}>
                                        {item.name}
                                    </li>
                                );
                            }
                    }
                    )
                }
            </ul>
        );
    }

}

const mapDispatchToProps = dispatch => {
    //console.log("Now dispatching actions");
    return {
        setProductCategory: payload => dispatch(setProductCategoryId(payload))
    };
}

export default connect(null, mapDispatchToProps)(Menu);
