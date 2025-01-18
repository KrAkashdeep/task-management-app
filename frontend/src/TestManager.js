import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  // FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { createTask, DeleteTask, GetAllTasks, updateTaskById } from "./api";
import { notify } from "./utils";

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
      // console.log(data);
      setTask(data);
      // setSearch(data);
    } catch (err) {
      notify("Failed to create task", "error");
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
      notify("Failed to create task", "error");
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
      notify("Failed to create task", "error");
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
      notify("Failed to create task", "error");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-100 m-auto mt-5">
      <h1 className="mb-4">Task Manager</h1>
      {/* input and search box */}

      <div className="d-flex flex-column justify-content-between align-items-center mb-4 ">
        {/* <div className="input-group flex-grow-1 d-flex justify-content-between align-items-center mb-4 ">
          <span className="input-group-text">
            <FaSearch className="m-1" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="search task"
          />
        </div> */}
        <div className="input-group flex-grow-1 w-100 ">
          <input
            type="text"
            className="form-control me-1"
            placeholder="task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            className="form-control me-1"
            placeholder="task description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
          />
          <button className="btn btn-success btn-sm me-2" onClick={handleTask}>
            <FaPlus className="m-2" />
          </button>
        </div>

        {/* list of item */}

        <h3 className="mt-2">All Task list </h3>
        <div className="d-flex flex-column w-100">
          {task &&
            task.map((item) => (
              <div
                key={item._id}
                className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
              >
                <div
                  className={item.isDone ? "text-decoration-line-through" : ""}
                >
                  {item.taskName}
                </div>
                <div
                  className={item.isDone ? "text-decoration-line-through" : ""}
                >
                  {item.taskDescription}
                </div>

                <div className="">
                  <button
                    onClick={() => handleCheckUncheck(item)}
                    className="btn btn-success btn-sm me-2"
                    type="button"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => setUpdate(item)}
                    className="btn btn-primary btn-sm me-2"
                    type="button"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-danger btn-sm me-2"
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
    </div>
  );
}

export default TestManager;
