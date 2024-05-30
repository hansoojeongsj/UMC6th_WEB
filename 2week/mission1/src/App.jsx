import { useState } from 'react';
import './App.css';
import Content from './components/Content.jsx';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <>
      <div className="app">
        <div className="app-container">
          <h1>UMC Study Plan</h1>
          <hr />
          <input
            type="text"
            id="todoInput"
            placeholder="UMC 스터디 계획을 작성해보세요!"
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <Content tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
