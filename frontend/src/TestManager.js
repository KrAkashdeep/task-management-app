import React, { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { createTask, DeleteTask, GetAllTasks, updateTaskById } from "./api";
import { notify } from "./utils";
import "react-toastify/dist/ReactToastify.css";
import "./TestManager.css"; // Import the CSS file

function TestManager() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [task, setTask] = useState([]);
  const [update, setUpdate] = useState(null);

  const handleTask = () => {
    if (update && title && des) {
      const obj = {
        taskName: title,
        taskDescription: des,
        isDone: update.isDone,
        _id: update._id,
      };
      handleUpdate(obj);
      setTitle("");
      setDes("");
    } else if (title && des && update === null) {
      handleAddTask();
    }
  };

  useEffect(() => {
    if (update) {
      setTitle(update.taskName);
      setDes(update.taskDescription);
    }
  }, [update]);

  const handleAddTask = async () => {
    const obj = {
      taskName: title,
      taskDescription: des,
      isDone: false,
    };
    try {
      const { success, message } = await createTask(obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setTitle("");
      setDes("");
      fetchAllTask();
    } catch (err) {
      notify("Failed to create task", "error");
    }
  };

  const fetchAllTask = async () => {
    try {
      const { data } = await GetAllTasks();
      setTask(data);
    } catch (err) {
      notify("Failed to fetch tasks", "error");
    }
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { success, message } = await DeleteTask(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTask();
    } catch (err) {
      notify("Failed to delete task", "error");
    }
  };

  const handleCheckUncheck = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const { success, message } = await updateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTask();
    } catch (err) {
      notify("Failed to update task", "error");
    }
  };

  const handleUpdate = async (item) => {
    const { _id, isDone, taskName, taskDescription } = item;
    const obj = {
      taskName,
      taskDescription,
      isDone: isDone,
    };
    try {
      const { success, message } = await updateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTask();
    } catch (err) {
      notify("Failed to update task", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Manager</h1>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control me-2"
          placeholder="Task description"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleTask}>
          <FaPlus className="me-2" />
          Add Task
        </button>
      </div>
      <h3 className="text-center mb-4">All Task List</h3>
      <div className="task-list">
        {task &&
          task.map((item) => (
            <div
              key={item._id}
              className={`task-item ${item.isDone ? "completed" : ""}`}
            >
              <div className="task-content">
                <div className="task-name">{item.taskName}</div>
                <div className="task-description">{item.taskDescription}</div>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleCheckUncheck(item)}
                  className="btn btn-success me-2"
                  type="button"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => setUpdate(item)}
                  className="btn btn-primary me-2"
                  type="button"
                >
                  <FaPencilAlt />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-danger"
                  type="button"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TestManager;
