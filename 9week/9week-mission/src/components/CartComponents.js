import React from 'react';

const CartComponent = ({ cartItems }) => {
  return (
    <div>
      {cartItems.map(item => (
        <div key={item.id}>
          <img src={item.img} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.singer}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default CartComponent;
