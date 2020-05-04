import React, { Component } from 'react';
import axios from 'axios';
import { backendurl } from '../../../backendurl';
import Link from 'next/router';

class TrackOrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackupdates : []
        }
    }

    componentDidMount() {
        console.log('tracking ID',this.props.trackId)
        debugger;
        axios.get(backendurl+'/order/trackOrder/'+this.props.trackId)
        .then((res)=> {
            debugger;
            if(parseInt(res.status) === 200) {
                this.setState({
                    trackupdates : res.data.data,
                 })
            } else{
                this.setState({
                    errorMsg : res.error,
                 })
            }
            
        })
        .catch((error)=> {
 
        }) 
    }

    addProduct = (e) => {

        e.preventDefault();
    }

    render() {

        let display;
        debugger;
        if(this.state.trackupdates.length >0 ){
            display = <ol>
                { 
                this.state.trackupdates.map(trackupdate => {
                    return <li>
                      Order Placed :  {trackupdate.createdAt }
                     <br/> <label> {trackupdate.message} </label>
                    </li>;
                })
                }
            </ol>
        } else {
            display = <div>Sorry ! No details Found </div>
        }
        return (
           <div>
               <div class="h2"> Order </div>
             {display}
           </div>
            
        )
    }
}

export default TrackOrderDetail;
