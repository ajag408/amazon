import React, { Component } from 'react';
// import { connect } from 'react-redux';
import Link from 'next/link';
// import { Form, Input, Select, Collapse,Popconfirm, message } from 'antd';
import axios from 'axios';


import { backendurl } from '../../../backendurl';

// const { Option } = Select;
// const { Panel } = Collapse;
class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddress: '',
      orderTotal: '',
      orderItems: [],
      payment: '',
      orderId: 0,
      orderStatus: '',
    };
  }

  componentDidMount() {
    axios.get(`${backendurl}/order/getAllOrder/${this.props.orderId}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          this.setState({
            shippingAddress: JSON.parse(res.data.address),
            orderTotal: res.data.finalTotal,
            orderItems: res.data.orderItem,
            payment: JSON.parse(res.data.card),
            orderId: res.data.id,
            orderStatus: res.data.status,
          });
        }
      });
    axios.post(`${backendurl}/cart/customer/${localStorage.getItem('user_id')}/clear-cart`)
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    const {
      orderTotal, orderItems, shippingAddress, payment, orderId, orderStatus,
    } = this.state;
    return (
      <div className="ps-checkout ps-section--shopping">
        <div className="container">
          <div className="ps-section__header">
            <h1>Order Summary (Save for Your Records)</h1>
          </div>
          <div className="ps-section__content">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="ps-block--shipping">
                  <h3>
                    Order #:
                    {orderId}
                  </h3>
                  <h3>
                    Order Status:
                    {orderStatus}
                  </h3>
                  <h3>Ship To</h3>
                  <div className="ps-block__panel">
                    <figure>
                      <small>{shippingAddress.fullName}</small>

                    </figure>
                    <figure>
                      <small>{shippingAddress.streetAddressLine_1}</small>
                    </figure>
                    <figure><small>{shippingAddress.streetAddressLine_2}</small></figure>
                    <figure>
                      <small>
                        {shippingAddress.city}
                        ,
                        {' '}
                        {shippingAddress.state}
                        ,
                        {' '}
                        {shippingAddress.country}
                        {' '}
                        {shippingAddress.zipCode}
                        {' '}
                      </small>
                    </figure>

                  </div>
                  <h3>Shipping Method</h3>
                  <div className="ps-block__panel">
                    <figure>
                      <small>
                        Standard Shipping
                      </small>

                    </figure>
                  </div>
                  <h3>Payment Method</h3>
                  <div className="ps-block__panel">
                    <figure>
                      <small>
                        Name on Card:
                        {payment.NameOnCard}
                      </small>
                      <br />

                    </figure>
                    <figure>

                      <small>
                        CVV:
                        {payment.cvv}
                      </small>
                    </figure>
                  </div>


                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                <div className="ps-form__orders">
                  <div className="ps-block--checkout-order">
                    <div className="ps-block__content">
                      <figure>
                        <figcaption>
                          <strong>Product</strong>
                          <strong>Quantity</strong>
                          <strong>Total</strong>
                        </figcaption>
                      </figure>
                      <figure className="ps-block__items">
                        {orderItems
                                                    && orderItems.map((orderItem) => (
                                                      // <Link
                                                      //     href="/"
                                                      //     key={orderItem.id}>
                                                      <a>
                                                        <strong>
                                                          <Link
                                                            href="/product/[pid]"
                                                            as={`/product/${orderItem.productId}`}
                                                          >
                                                            <a style={{ 'padding-top': '0px' }}>
                                                              {orderItem.productName}
                                                            </a>
                                                          </Link>
                                                        </strong>
                                                        <strong>
                                                          {orderItem.quantity}
                                                        </strong>
                                                        <small>
                                                          $
                                                          {orderItem.totalPrice}
                                                        </small>
                                                      </a>
                                                    //     </Link>
                                                    ))}
                      </figure>
                      <figure>
                        <figcaption>
                          <strong>Subtotal</strong>
                          <small>
                            $
                            {parseFloat(orderTotal)}
                          </small>
                        </figcaption>
                      </figure>
                      <figure>
                        <figcaption>
                          <strong>Shipping</strong>
                          <small>$0.00</small>
                        </figcaption>
                      </figure>
                      <figure className="ps-block__total">
                        <h3>
                          Total (
                          {orderStatus}
                          )
                          <strong>
                            $
                            {parseFloat(orderTotal)}
                            .00
                          </strong>
                        </h3>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//     return state.cart;
// };


export default OrderSummary;
