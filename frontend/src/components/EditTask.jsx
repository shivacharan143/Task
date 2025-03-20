import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = ({ fetchTasks }) => {
  const { id } = useParams(); // Get the task ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch the task details when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://taskmanage-fk6r.onrender.com/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `https://taskmanage-fk6r.onrender.com/api/tasks/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/"); // Redirect to the task list after editing
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded bg-white"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-white"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;