import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import cartItems from './constants/cartItems.js'; // 장바구니 아이템 데이터를 가져옵니다.
import styled from 'styled-components';
import CartItemActions from './components/CartItemActions.js'; // QuantityControl 컴포넌트를 가져옵니다.

const MusicTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: white;
  background-color: lightblue;
  text-align: center;
  align-items: center;
  display: flex; /* 가운데 정렬을 위해 추가 */
  justify-content: center; 
  height: 80px;
  width: 100%; /* 배경을 가득 채우도록 너비를 100%로 설정 */
  position: absolute;
  top: 0; /* 화면 맨 위에 고정 */
  left: 0; /* 화면 맨 왼쪽에 고정 */
  z-index: 999; /* 다른 요소들보다 위에 표시 */
`;

const SubTitle = styled.h2`
  margin-top: 120px;
  font-weight: bold;
  text-align: center;
  
`;

const AlbumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 가운데 정렬을 적용합니다. */
  margin-bottom: 50px; /* 아래쪽 여백을 추가합니다. */
  flex-direction: column; /* 항목을 세로로 나열합니다. */
  padding: 50px;

`;

const AlbumItem = styled.div`
  margin: 10px;
  display: flex;
  align-items: center; /* 가운데 정렬합니다. */
`;

const AlbumImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const Price = styled.p`
  margin-top: 5px;
  color: darkgray;
`;

const ItemActionsContainer = styled.div`
  margin-left: auto; 
  margin-right: 20px;
  
`;

function App() {
  const [albumQuantities, setAlbumQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = 1; // 각 앨범의 기본 수량을 1로 설정
      return acc;
    }, {})
  );

  const increaseQuantity = (itemId) => {
    setAlbumQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  const decreaseQuantity = (itemId) => {
    setAlbumQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(1, prevQuantities[itemId] - 1), // 최소 수량은 1로 설정
    }));
  };

  return (
    <Provider store={store}>
      <div>
        <MusicTitle>UMC PlayList</MusicTitle>
        <SubTitle>당신이 선택한 음반</SubTitle>
        <AlbumContainer>
          {/* cartItems 데이터를 렌더링 */}
          {cartItems.map((item) => (
            <AlbumItem key={item.id}>
              <AlbumImage src={item.img} alt={item.title} />
              <div>
                <p>
                  {item.title} | {item.singer}
                </p>
                <Price>\ {item.price}</Price>
              </div>
              <ItemActionsContainer>
                <CartItemActions
                  increaseQuantity={() => increaseQuantity(item.id)}
                  decreaseQuantity={() => decreaseQuantity(item.id)}
                  quantity={albumQuantities[item.id]}
                />
              </ItemActionsContainer>
            </AlbumItem>
          ))}
        </AlbumContainer>
      </div>
    </Provider>
  );
}

export default App;
