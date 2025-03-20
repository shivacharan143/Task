import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://taskmanage-fk6r.onrender.com/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.patch(
        `https://taskmanage-fk6r.onrender.com/api/tasks/${id}`,
        { completed: true },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Failed to mark task as completed:", error);
    }
  };

  return (
    <div className="p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      {tasks.map((task) => (
        <div key={task._id} className="border p-4 mb-2 rounded shadow bg-gray-100">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p>{task.description}</p>
          <p className={task.completed ? "text-green-500" : "text-red-500"}>
            {task.completed ? "Completed" : "Pending"}
          </p>
          <button
            onClick={() => handleComplete(task._id)}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 cursor-pointer"
          >
            Mark as Completed
          </button>
          <Link
            to={`/edit/${task._id}`}
            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;













