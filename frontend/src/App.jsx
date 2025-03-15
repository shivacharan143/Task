import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import AuthForm from "./components/AuthForm";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
import EditTask from "./components/EditTask"; // Import the EditTask component

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return (
    <Router>
      <div className="min-h-screen bg-white text-black">
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/auth" element={<AuthForm setToken={setToken} />} />
            <Route
              path="/"
              element={
                <ProtectedRoute token={token}>
                  <TaskList tasks={tasks} fetchTasks={fetchTasks} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add"
              element={
                <ProtectedRoute token={token}>
                  <AddTask fetchTasks={fetchTasks} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute token={token}>
                  <EditTask fetchTasks={fetchTasks} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;











