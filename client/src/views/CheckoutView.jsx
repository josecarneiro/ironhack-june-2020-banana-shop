import React, { Component } from 'react';

import BasketInformation from './../components/BasketInformation';
import ProductItem from './../components/ProductItem';
import CheckoutForm from './../components/CheckoutForm';

import { createOrder } from './../services/order';

class CheckoutView extends Component {
  handleCheckout = ({ address, token }) => {
    // const basket = this.props.basket.map(item => ({ ...item, product: item.product._id }));
    const basket = this.props.basket.map(item => {
      return {
        productId: item.product._id,
        quantity: item.quantity
      };
    });
    createOrder({ basket, address, token })
      .then(data => {
        this.props.history.push('/');
      })
      .catch(error => {
        console.log('Order failer', error);
      });
  };

  render() {
    const { basket } = this.props;

    return (
      <div>
        <h1>Products in basket</h1>
        {(basket.length &&
          basket.map(item => (
            <ProductItem
              key={item.product._id}
              product={item.product}
              basket={this.props.basket}
              onChangeQuantity={this.props.onChangeQuantity}
            />
          ))) || <p>There are no items in the basket</p>}
        <h2>Totals</h2>
        <BasketInformation list={this.props.basket} />
        <CheckoutForm onCheckout={this.handleCheckout} />
      </div>
    );
  }
}

export default CheckoutView;
