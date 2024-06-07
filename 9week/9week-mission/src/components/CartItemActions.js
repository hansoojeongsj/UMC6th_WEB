import React from 'react';
import styled from 'styled-components';

const QuantityButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const CartItemActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Quantity = styled.span`
  font-size: 16px;
  margin: 5px 0;
  color: #000;
`;

const CartItemActions = ({ increaseQuantity, decreaseQuantity, quantity }) => {
  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      decreaseQuantity();
    }
  };
  return (
    <CartItemActionsContainer>
      <QuantityButton onClick={increaseQuantity}>︿</QuantityButton>
      <Quantity>{quantity}</Quantity>
      <QuantityButton onClick={handleDecreaseQuantity}>﹀</QuantityButton>
    </CartItemActionsContainer>
  );
};

export default CartItemActions;
