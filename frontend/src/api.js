import { API_URL } from "./utils";

export const createTask = async (taskObj) => {
  const url = `${API_URL}/tasks`;
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };
  try {
    const result = await fetch(url, option);

    const data = await result.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message || "Failed to create task",
      error: err,
    };
  }
};

export const GetAllTasks = async () => {
  const url = `${API_URL}/tasks`;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, option);

    const data = await result.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message || "Failed to create task",
      error: err,
    };
  }
};

export const DeleteTask = async (id) => {
  const url = `${API_URL}/tasks/${id}`;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, option);

    const data = await result.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message || "Failed to create task",
      error: err,
    };
  }
};

export const updateTaskById = async (id, reqBody) => {
  const url = `${API_URL}/tasks/${id}`;
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };
  try {
    const result = await fetch(url, option);

    const data = await result.json();
    return data;
  } catch (err) {
    return {
      success: false,
      message: err.message || "Failed to create task",
      error: err,
    };
  }
};
