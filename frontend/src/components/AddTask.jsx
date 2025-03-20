import React, { useState } from "react";
import axios from "axios";

const AddTask = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      const response = await axios.post(
        "https://taskmanage-fk6r.onrender.com/api/tasks",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the headers
        }
      );
      setTitle("");
      setDescription("");
      fetchTasks(); // Refresh the task list
      console.log("Task created:", response.data); // Log the response
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-400 dark:bg-gray-900 text-black dark:text-white w-3xl ml-88 mt-40 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;