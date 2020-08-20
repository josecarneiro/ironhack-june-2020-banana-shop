import React from 'react';

import Price from './Price';

const ProductItem = props => {
  const { product, basket } = props;
  const existingItem = basket.find(item => item.product._id === product._id);
  const quantity = existingItem ? existingItem.quantity : 0;
  return (
    <div key={props.product._id} className="product-item">
      <img src={props.product.picture} alt={props.product.name} />
      <div className="details">
        <strong>{props.product.name}</strong>
        <small>
          Weight: {props.product.weight}g | Origin: {props.product.origin}
        </small>
      </div>
      <Price {...props.product.price} />
      <div className="actions">
        <button onClick={() => props.onChangeQuantity(props.product, 1)}>+</button>
        <span>{quantity}</span>
        <button onClick={() => props.onChangeQuantity(props.product, -1)}>-</button>
      </div>
    </div>
  );
};

export default ProductItem;
