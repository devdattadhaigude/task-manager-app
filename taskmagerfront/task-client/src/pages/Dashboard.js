import React, { useState, useEffect, useCallback } from "react";
import TaskService from "../services/task.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  
  // FORM STATES
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState(""); // New State for Description

  // EDITING STATES
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState(""); // New State for Editing Description
  
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate();

  // --- HELPER: Date Formatter ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  const loadTasks = useCallback(async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        AuthService.logout();
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // --- ADD TASK (Now includes Description) ---
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await TaskService.createTask({ 
        title: newTaskTitle, 
        description: newTaskDesc, // Sending description to backend
        status: "PENDING" 
      });
      setNewTaskTitle("");
      setNewTaskDesc("");
      loadTasks();
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await TaskService.deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      setOpenDropdownId(null);
      await TaskService.updateTask(task.id, { ...task, status: newStatus });
      loadTasks();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const toggleDropdown = (id) => {
    openDropdownId === id ? setOpenDropdownId(null) : setOpenDropdownId(id);
  };

  // --- START EDITING (Pre-fill Title & Desc) ---
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description || ""); // Pre-fill description
    setOpenDropdownId(null);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDesc("");
  };

  // --- SAVE EDIT (Send Title & Desc) ---
  const saveEdit = async (task) => {
    try {
      await TaskService.updateTask(task.id, { 
        ...task, 
        title: editTitle,
        description: editDesc 
      });
      setEditingTaskId(null);
      loadTasks();
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  const onLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED": return "btn-success";
      case "IN_PROGRESS": return "btn-info";
      default: return "btn-warning";
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", width: "100%" }} onClick={() => setOpenDropdownId(null)}>
      
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-5">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary">TaskMaster</span>
          <button className="btn btn-outline-danger btn-sm rounded-pill px-4" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <div className="container" style={{ maxWidth: "800px" }}>
        
        {/* ADD TASK CARD (Updated with Description Input) */}
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">
            <h5 className="card-title mb-3 fw-bold text-secondary">Add New Task</h5>
            <form onSubmit={handleAddTask} className="d-flex flex-column gap-2">
              <input 
                type="text" 
                className="form-control form-control-lg border-light bg-light" 
                placeholder="Task Title (e.g., Learn Java)" 
                value={newTaskTitle} 
                onChange={(e) => setNewTaskTitle(e.target.value)} 
                style={{ borderRadius: "10px" }}
              />
              <div className="d-flex gap-2">
                <input 
                  type="text" 
                  className="form-control border-light bg-light" 
                  placeholder="Description (Optional details...)" 
                  value={newTaskDesc} 
                  onChange={(e) => setNewTaskDesc(e.target.value)} 
                  style={{ borderRadius: "10px" }}
                />
                <button className="btn btn-primary px-4" type="submit" style={{ borderRadius: "10px", minWidth: "100px" }}>Add +</button>
              </div>
            </form>
          </div>
        </div>

        {/* TASK LIST HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3 px-2">
          <h5 className="text-muted fw-bold">My Tasks ({tasks.length})</h5>
        </div>

        {/* TASK LIST */}
        <div className="list-group shadow-sm border-0" style={{ borderRadius: "12px" }}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="list-group-item d-flex flex-wrap justify-content-between align-items-start gap-3 p-3 border-0 border-bottom">
                
                {/* 1. CONTENT SECTION (Title, Desc, Time) */}
                <div className="flex-grow-1">
                  {editingTaskId === task.id ? (
                    // EDIT MODE: Two Inputs
                    <div className="d-flex flex-column gap-2">
                      <input 
                        type="text" 
                        className="form-control fw-bold" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()} 
                        autoFocus
                      />
                      <textarea 
                        className="form-control" 
                        value={editDesc} 
                        onChange={(e) => setEditDesc(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Description"
                        rows="2"
                      />
                    </div>
                  ) : (
                    // VIEW MODE: Text Display
                    <div>
                      {/* Title */}
                      <span style={{ 
                        textDecoration: task.status === "COMPLETED" ? "line-through" : "none",
                        color: task.status === "COMPLETED" ? "#adb5bd" : "#212529",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        display: "block"
                      }}>
                        {task.title}
                      </span>

                      {/* Description (If exists) */}
                      {task.description && (
                        <p className="text-secondary mb-1" style={{ fontSize: "0.95rem", whiteSpace: "pre-wrap" }}>
                          {task.description}
                        </p>
                      )}
                      
                      {/* Timestamps (Created & Updated) */}
                      <div className="d-flex gap-3 text-muted mt-2" style={{ fontSize: "0.75rem" }}>
                        <span>📅 Created: {formatDate(task.createdAt)}</span>
                        
                        {/* Only show 'Updated' if it's different from Created */}
                        {task.updatedAt && task.updatedAt !== task.createdAt && (
                          <span>✎ Updated: {formatDate(task.updatedAt)}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. ACTIONS SECTION (Buttons) */}
                <div className="d-flex gap-2 align-items-center mt-1">
                  
                  {/* Dropdown */}
                  {editingTaskId !== task.id && (
                    <div className="dropdown" style={{ position: "relative" }}>
                      <button 
                        className={`btn btn-sm dropdown-toggle rounded-pill px-3 ${getStatusColor(task.status)}`} 
                        type="button" 
                        onClick={(e) => { e.stopPropagation(); toggleDropdown(task.id); }}
                        style={{ color: "white", fontWeight: "600" }}
                      >
                        {task.status.replace("_", " ")}
                      </button>

                      <ul className={`dropdown-menu shadow ${openDropdownId === task.id ? "show" : ""}`} style={{ right: 0, left: "auto", position: "absolute", zIndex: 1050 }}>
                        <li><button className="dropdown-item py-2" onClick={(e) => { e.stopPropagation(); handleStatusChange(task, "PENDING"); }}>🟡 Pending</button></li>
                        <li><button className="dropdown-item py-2" onClick={(e) => { e.stopPropagation(); handleStatusChange(task, "IN_PROGRESS"); }}>🔵 In Progress</button></li>
                        <li><button className="dropdown-item py-2" onClick={(e) => { e.stopPropagation(); handleStatusChange(task, "COMPLETED"); }}>🟢 Completed</button></li>
                      </ul>
                    </div>
                  )}

                  {/* Edit/Save Icons */}
                  {editingTaskId === task.id ? (
                    <>
                      <button className="btn btn-sm btn-success rounded-circle" onClick={(e) => { e.stopPropagation(); saveEdit(task); }}>✓</button>
                      <button className="btn btn-sm btn-secondary rounded-circle" onClick={(e) => { e.stopPropagation(); cancelEditing(); }}>✕</button>
                    </>
                  ) : (
                    <button className="btn btn-sm btn-outline-secondary border-0" onClick={(e) => { e.stopPropagation(); startEditing(task); }}>Edit</button>
                  )}

                  {/* Delete Icon */}
                  {editingTaskId !== task.id && (
                    <button className="btn btn-sm btn-outline-danger border-0" onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }}>✕</button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="list-group-item text-center text-muted p-5">
              <h5>No tasks yet! 🚀</h5>
              <p>Add a task above to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;