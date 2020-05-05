import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { backendurl } from '../../../backendurl';
import Link from 'next/link';

function OpenOrders(props) {
  let [orderItems,setOrderItems] = useState([]);
  useEffect(() => {
      let url = `${backendurl}/order/customer/getAllOrder/${localStorage.getItem('user_id')}/1`;
      Axios.get(url).then(resp => {
        if(resp.status === 200 && resp.data){
          setOrderItems(resp.data);
        }
      })
  }, []);
  const handleCancelOrderItem = (orderItemId) => {
    let url = `${backendurl}/order/customer/${localStorage.getItem('user_id')}/orderItem/${orderItemId}/cancel`;
    Axios.get(url).then(resp => {
      if(resp.status === 200 && resp.data){
        setOrderItems(orderItems.filter(item => item.id !== orderItemId));
      }
    })
  }
  return (
    <div className="ps-section--shopping ps-shopping-cart">
      <div className="container">
          <div className="ps-section__header">
              <h1>Open Order Items</h1>
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
                              <th>Cancel</th>
                          </tr>
                      </thead>
                      <tbody>
                          {orderItems.map(orderItem => (
                              <tr key={orderItem.id}>
                                  <td className="id" >
                                    {orderItem.id}
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
                                    {orderItem.orderItemUpdate.length < 1 ? (
                                      <p>No Updates for this item yet</p>
                                      ) 
                                      : 
                                      (orderItem.orderItemUpdate.map(update => <p>{update.message}</p>))
                                    }
                                  </td>
                                  <td style={{'text-align':'center'}}>
                                    <a
                                      href="#"
                                      onClick={e => handleCancelOrderItem(orderItem.id)}>
                                      <i className="icon-cross"></i>
                                    </a>
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

export default OpenOrders;