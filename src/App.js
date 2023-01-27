import React, { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {

  const [toDo, setToDo] = useState(() => {
    return JSON.parse(localStorage.getItem("ToDoItems")) || []});
  // Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");
  useEffect(() => {
    localStorage.setItem("ToDoItems", JSON.stringify(toDo));
  }, [toDo]);

  const addTask = () => {
  
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      console.log(newEntry);
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        console.log(task);
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  const updateTask = () => {
    let filteredTasks = toDo.filter((task) => task.id !== updateData.id);
    let updatedTasks = [...filteredTasks, updateData];
    setToDo(updatedTasks);
    setUpdateData("");
  };
  const cancelUpdate = () => {
    setUpdateData("");
  };

  return (
    <div className=" container App">
      <br></br>
      <h2>To Do List App</h2>
      <br></br>

      {updateData.length != 0 ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button onClick={updateTask} className="btn btn-lg btn-success">
                Update
              </button>
            </div>
            <div className="col-auto">
              <button onClick={cancelUpdate} className="btn btn-lg btn-warning">
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
                style={{alignItems:'center'}}
              />
            </div>
            <div className="col-auto">
              <button onClick={addTask} className="btn btn-lg btn-success">
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* Display ToDos */}

      {toDo && toDo.length ? "" : "No Tasks..."}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div>
                    <span className="taskNumber">{index + 1}</span>
                    <span
                      style={{
                        textDecoration: task.status ? "line-through" : "none",
                      }}
                      className="taskText"
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="iconsWrap">
                    <span
                      onClick={() => {
                        markDone(task.id);
                      }}
                      title="Completed/Not Completed"
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? (
                      ""
                    ) : (
                      <span
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span
                      onClick={() => {
                        deleteTask(task.id);
                      }}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
