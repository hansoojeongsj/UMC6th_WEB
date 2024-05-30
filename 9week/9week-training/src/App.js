import { useState, useEffect } from "react";
import './App.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';

const App = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const currentDate = getCurrentDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][new Date().getDay()];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000); // 1초마다 업데이트
    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }

  function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }


  return (
    <div className="app-container">
      <div className="white-box">
      <div className="date-time">
        <div style={{fontWeight: 'bold'}}>{currentDate}</div>
        <div>
          <span>{currentTime.split(':')[0]}</span>:{/* 시 */}
          <span>{currentTime.split(':')[1]}</span>:{/* 분 */}
          <span className={parseInt(currentTime.split(':')[2]) >= 50 ? 'red-seconds' : ''}>
            {currentTime.split(':')[2]}
          </span> {/* 초 */}
        </div>
        </div>
        <br></br>
        <div style={{color: 'gray'}}>{dayOfWeek}요일</div>
        <hr></hr>
        <div className="input-container">
        <InputTodo />
        </div>
        <div className="todo-container">
        <TodoList />

        </div>
      </div>
    </div>
  );
};

export default App;
