import { useState } from 'react';
import Modal from './components/Modal.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const increment = () => {
    setCount(count + 1);
    console.log("increase가 클릭됨");
  };

  const decrement = () => {
    setCount(count - 1);
    console.log("decrease가 클릭됨");
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log("모달이 켜짐");

  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("모달이 꺼짐");

  };

  return (
    <>
      <div>
        <h2>{count}</h2>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
      </div>
      <div>
        <h1>안녕하세요!</h1>
        <p>내용내용내용</p>
        <button onClick={openModal}>버튼 열기</button>
        {isModalOpen && (
          <Modal closeModal={closeModal} />
        )}
      </div>

    </>
  );
}

export default App;