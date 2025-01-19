import { toast } from "react-toastify";

export const notify = (message, type) => {
  toast[type](message);
};

// const isDevelopment = process.env.NODE_ENV === "development";
// frontend(backend ka url ayega)
export const API_URL = "https://task-management-backend-swart.vercel.app";
