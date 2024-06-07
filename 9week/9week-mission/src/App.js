import React, { useReducer } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import cartItemsData from './constants/cartItems.js';
import styled from 'styled-components';
import CartItemActions from './components/CartItemActions.js';
import { FaShoppingCart } from 'react-icons/fa';

const MusicTitle = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: white;
  background-color: lightblue;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  height: 80px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;
const TitleFont = styled.div`
  margin-left: 20%;
`;
const ShoppingCartIcon = styled(FaShoppingCart)`
  margin-right: 20%;
`;

const ShoppingCartIconContainer = styled.div`
  margin-right: 20%;
  position: relative; 
`;

const ShoppingCartCount = styled.div`
  position: absolute;
  top: 10%;
  left: 90%;
  background-color: navy;
  color: white;
  font-size: 12px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.h2`
  margin-top: 120px;
  font-weight: bold;
  text-align: center;
`;

const AlbumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  margin-bottom: 50px; 
  flex-direction: column;
  padding: 50px;
  margin: 0 20%;
`;

const AlbumItem = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
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

const TotalPriceContainer = styled.div`
  border-top: 2px solid #ccc;
  width: 60%;
  margin-left: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  & > div {
    margin: 20px 0; 
  }
`;

const NoItemsMessage = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-top: -5%;
  margin-bottom: 5%;
`;

const ClearCartButton = styled.button`
  background-color: transparent;
  color: red;
  border: 2px solid red;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const ClearCartButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px; 
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  width: 450px;
  text-align: center;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const YesButton = styled.button`
  color: blue;
  padding: 7px 10px;
  border-radius: 4px;
  margin: 0 20px;
  cursor: pointer;
  border: 2px solid blue;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const NoButton = styled.button`
  color: red;
  padding: 7px 10px;
  border-radius: 4px;
  margin: 0 20px;
  cursor: pointer;
  border: 2px solid red;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: red;
    color: white;
  }
`;

const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';


function cartReducer(state, action) {
  switch (action.type) {
    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              amount: (item.amount || 0) + 1
            };
          }
          return item;
        }),
        albumQuantities: {
          ...state.albumQuantities,
          [action.payload.itemId]: (state.albumQuantities[action.payload.itemId] || 0) + 2
        }
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              amount: Math.max((item.amount || 0) - 1, 0)
            };
          }
          return item;
        }).filter(item => item.amount > 0),
        albumQuantities: {
          ...state.albumQuantities,
          [action.payload.itemId]: Math.max((state.albumQuantities[action.payload.itemId] || 0) - 1, 0)
        }
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        albumQuantities: {}
      };
    default:
      return state;
  }
}

function modalReducer(state, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { showModal: true };
    case CLOSE_MODAL:
      return { showModal: false };
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: cartItemsData,
    albumQuantities: {}
  });

  const { cartItems, albumQuantities } = state;

  const increaseQuantity = (itemId) => {
    dispatch({ type: INCREASE_QUANTITY, payload: { itemId } });
  };

  const decreaseQuantity = (itemId) => {
    dispatch({ type: DECREASE_QUANTITY, payload: { itemId } });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (albumQuantities[item.id] || 1);
    }, 0);
  };

  const getTotalItemsCount = () => {
    return cartItems.reduce((total, item) => total + (item.amount || 0), 0);
  };

  const [modalState, dispatchModal] = useReducer(modalReducer, { showModal: false });
  const { showModal } = modalState;

  const openModal = () => {
    dispatchModal({ type: OPEN_MODAL }); // Dispatch the action directly instead of calling the function recursively
  };
  
  const closeModal = () => {
    dispatchModal({ type: CLOSE_MODAL }); // Dispatch the action directly instead of calling the function recursively
  };
  

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' }); // 카트를 비우기 위해 CLEAR_CART 액션을 dispatch합니다.
    dispatchModal({ type: CLOSE_MODAL });
  };
  
  return (
    <Provider store={store}>
      <div>
        <MusicTitle>
          <TitleFont>UMC PlayList</TitleFont>
          <ShoppingCartIconContainer>
            <ShoppingCartIcon size={32} />
            <ShoppingCartCount>{getTotalItemsCount()}</ShoppingCartCount>
          </ShoppingCartIconContainer>
        </MusicTitle>
            
        <SubTitle>당신이 선택한 음반</SubTitle>
        <AlbumContainer>
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
                  quantity={item.amount}
                />
              </ItemActionsContainer>
            </AlbumItem>
          ))}
        </AlbumContainer>
        {cartItems.length > 0 ? (
          <TotalPriceContainer>
            <div>총 가격</div>
            <div>\{getTotalPrice()}</div>
          </TotalPriceContainer>
        ) : (
          <NoItemsMessage>고객님이 좋아하는 음반을 담아보세요~!</NoItemsMessage>
        )}

        <ClearCartButtonContainer>
          <ClearCartButton onClick={openModal}>장바구니 초기화</ClearCartButton>
        </ClearCartButtonContainer>
        {showModal && (
          <Modal>
            <ModalContent>
              <h2>담아두신 모든 음반을 삭제하시겠습니까?</h2>
              <ButtonContainer>
                <YesButton onClick={handleClearCart}>네</YesButton>
                <NoButton onClick={closeModal}>아니요</NoButton>
              </ButtonContainer>
            </ModalContent>
          </Modal>
        )}
      </div>
    </Provider>
  );
}

export default App;
