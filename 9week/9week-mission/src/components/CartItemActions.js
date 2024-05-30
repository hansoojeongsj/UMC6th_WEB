import React from 'react';
import styled from 'styled-components';

const QuantityButton = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  display: block; /* 요소를 블록 레벨로 표시하여 세로 정렬을 위해 */
`;

const CartItemActionsContainer = styled.div`
  display: flex;
  flex-direction: column; /* 요소들을 세로로 배치 */
  align-items: center; /* 가운데 정렬 */
`;

const CartItemActions = ({ increaseQuantity, decreaseQuantity, quantity }) => {
  const handleDecreaseQuantity = () => {
    if (quantity === 0) { // 수량이 1일 때 아이템을 제거
      // decreaseQuantity 함수에 매개변수로 true를 전달하여 아이템을 제거하도록 함
      decreaseQuantity(true);
    } else {
      decreaseQuantity();
    }
  };

  return (
    <CartItemActionsContainer>
      <QuantityButton onClick={increaseQuantity}>︿</QuantityButton>
      <span> {quantity}</span>
      <QuantityButton onClick={handleDecreaseQuantity}>﹀</QuantityButton>
    </CartItemActionsContainer>
  );
};

export default CartItemActions;
