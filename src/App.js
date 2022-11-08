import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
     {id:1,title:"Task 1", status:false},
     {id:2,title:"Task 2", status:false},
  ]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  return (
    <div className=" container App">
      <br></br>
      <h2>To Do List App</h2>
      <br></br>
      {/* Display ToDos */}

      {toDo && toDo.length ? '' : 'No Tasks...'}
      {toDo && toDo.map((task, index) => {
        return (
          <React.Fragment key={task.id}>
            <div className = "col taskBg">
              <div classsName = {task.status?'done':""}>
              <span className="taskText">{index + 1}</span>
            <span className="taskText">{task.title}</span>
              </div>
            </div>
           
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default App;
