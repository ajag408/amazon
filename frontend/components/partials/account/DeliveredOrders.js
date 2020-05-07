import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { backendurl } from '../../../backendurl';
import Link from 'next/link';
import Router from 'next/router';

function DeliveredOrders(props) {
  let [orderItems,setOrderItems] = useState([]);
  useEffect(() => {
      let url = `${backendurl}/order/customer/getAllOrder/${localStorage.getItem('user_id')}/2`;
      Axios.get(url).then(resp => {
        if(resp.status === 200 && resp.data){
          setOrderItems(resp.data);
        }
      })
  }, []);
  return (
    <div className="ps-section--shopping ps-shopping-cart">
      <div className="container">
          <div className="ps-section__header">
              <h1>Delivered Order Items</h1>
          </div>
          <div className="ps-section__content">
              <div className="table-responsive">
                  <table className="table ps-table--shopping-cart">
                      <thead>
                          <tr>
                              <th>Order Item id</th>
                              <th>Item Name</th>
                              <th>Item quantity</th>
                              <th>Total Price</th>
                              <th>Order Status</th>
                          </tr>
                      </thead>
                      <tbody>
                          {orderItems.map(orderItem => (
                              <tr key={orderItem.id}>
                                  <td className="id" >
                                  <a onClick = {()=>{
                                     
                                     Router.push({
                                        pathname: '/order/trackOrder',
                                        query: { orderItemId : orderItem.id}
                                    
                                })
                                     
                                     
                                     }}>
                                          {orderItem.id}
                                          
                                          </a>
                                  </td>
                                  <td style={{'text-align':'center'}}>
                                      <div className="ps-product--cart">
                                          <div className="ps-product__content">

                                              
                                              <Link
                                                  href="/product/[pid]"
                                                  as={`/product/${orderItem.productId}`}>
                                                  <a className="ps-product__title">
                                                      {orderItem.productName}
                                                  </a>
                                              </Link>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="quantity" style={{'text-align':'center'}}>
                                    {orderItem.quantity}
                                  </td>
                                  <td style={{'text-align': 'center'}}>
                                      $
                                      {orderItem.totalPrice}
                                  </td>
                                  <td style={{'text-align': 'center'}}>
                                      {orderItem.status}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
  );
}

export default DeliveredOrders;