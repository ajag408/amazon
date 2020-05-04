import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { backendurl } from '../../../backendurl';
import Link from 'next/link';

function AllOrders(props) {
  let [orders,setOrders] = useState([]);
  useEffect(() => {
      let url = `${backendurl}/order/customer/getAllOrder/${localStorage.getItem('user_id')}`;
      url = `${backendurl}/order/customer/getAllOrder/5ea32fb4716ebc4f57fd8ae9`;
    Axios.get(url).then(resp => {
      if(resp.status === 200 && resp.data){
        setOrders(resp.data);
      }
    })
  }, []);
  return (
    <div className="ps-section--shopping ps-shopping-cart">
      <div className="container">
          <div className="ps-section__header">
              <h1>My Orders</h1>
          </div>
          <div className="ps-section__content">
              <div className="table-responsive">
                  <table className="table ps-table--shopping-cart">
                      <thead>
                          <tr>
                              <th>Order Id</th>
                              <th>Delivery Address</th>
                              <th>Payment Type</th>
                              <th>Total</th>
                              <th>Status</th>
                          </tr>
                      </thead>
                      <tbody>
                          {orders.map(order => (
                              <tr key={order.id}>
                                  <td>
                                      <div className="ps-product--cart">
                                          <div className="ps-product__content">
                                              <Link
                                                  href="/product/[pid]"
                                                  as={`/product/${order.id}`}>
                                                  <a className="ps-product__title">
                                                      {order.id}
                                                  </a>
                                              </Link>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="address" style={{'text-align':'center'}}>
                                        <p>{JSON.parse(order.address).fullName}</p>
                                        <p>{JSON.parse(order.address).streetAddressLine_1}</p>
                                        <p>{JSON.parse(order.address).streetAddressLine_2}</p>
                          <p>{JSON.parse(order.address).city}, {JSON.parse(order.address).zipCode}</p>
                                        <p>{JSON.parse(order.address).state},{JSON.parse(order.address).country}</p>
                                  </td>
                                  <td style={{'text-align': 'center'}}>
                                      {parseInt(Math.random() * 10) > 5 ? 'Credit Card' : 'Debit Card'}
                                  </td>
                                  <td style={{'text-align': 'center'}}>
                                      $
                                      {order.finalTotal}
                                  </td>
                                  <td style={{'text-align':'center'}}>
                                      {order.status}
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

export default AllOrders;