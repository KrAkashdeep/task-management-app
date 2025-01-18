import { toast } from "react-toastify";

export const notify = (message, type) => {
  toast[type](message);
};

// const isDevelopment = process.env.NODE_ENV === "development";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
