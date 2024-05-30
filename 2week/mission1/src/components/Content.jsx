import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './Content.css';

function Content({ tasks, setTasks }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [remainingTasks, setRemainingTasks] = useState([]);

  useEffect(() => {
    setRemainingTasks(tasks);
  }, [tasks]);

  const handleCompleteTask = (index) => {
    const completedTask = remainingTasks[index];

    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, completedTask]);
    setRemainingTasks((prevRemainingTasks) =>
      prevRemainingTasks.filter((_, i) => i !== index)
    );

    // 완료된 작업을 해야 할 일 목록에서 삭제
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleDeleteTask = (index) => {
    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((_, i) => i !== index)
    );
  };

  return (
    <div className='content-main'>
      <div className="content-container">
        <div className="todo-column">
          <span className='underlined-text'>해야 할 일</span>
          <ul>
            {remainingTasks.map((task, index) => (
              <li key={index} className='underlined-content'>
                <span>{task}</span>
                <button className='button' onClick={() => handleCompleteTask(index)}>완료</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="todo-column">
          <span className='underlined-text'>해낸 일</span>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index} className='underlined-content'>
                <span>{task}</span>
                <button className='button' onClick={() => handleDeleteTask(index)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

Content.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default Content;
