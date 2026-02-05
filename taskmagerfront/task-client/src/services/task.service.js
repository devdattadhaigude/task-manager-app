import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

// Helper function to get the token
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // If your token is stored just as a string in "token", use that instead:
  // const token = localStorage.getItem("token");
  const token = user && user.token ? user.token : localStorage.getItem("token"); 
  
  return { Authorization: `Bearer ${token}` };
};

// 1. GET ALL TASKS
const getAllTasks = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

// 2. CREATE TASK
const createTask = (task) => {
  return axios.post(API_URL, task, { headers: getAuthHeaders() });
};

// 3. DELETE TASK
const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};

// 4. UPDATE TASK
const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task, { headers: getAuthHeaders() });
};

const TaskService = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};

export default TaskService;