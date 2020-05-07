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
        axios.get(backendurl+'/order/trackOrder/'+this.props.trackId)
        .then((res)=> {
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
        if(this.state.trackupdates.length >0 ){
            display =  <tbody>
                { 
                this.state.trackupdates.map(trackupdate => {
                    return <tr>
                     <td> {trackupdate.message} </td>
                     <td>  {trackupdate.createdAt.toString().substring(0,10) } </td>
                    </tr>;
                })
                }
              </tbody>
        } else {
            display = <div>Sorry ! No details Found </div>
        }
        return (
           <div>
            <div class="h2"> Tracking Deatils for #{this.props.trackId} </div>
           <table className="table ps-table ps-table--vendor">
               <thead>
                    <tr>
                        <th>Updates</th>
                        <th>Time</th>
                    </tr>
               </thead>
              
               {display}
            
           </table>
           </div>
            
        )
    }
}

export default TrackOrderDetail;
