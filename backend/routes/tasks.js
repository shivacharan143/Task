// const express = require("express");
// const Task = require("../models/Task");
// const auth = require("../middleware/auth");
// const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   const tasks = await Task.find({ user: req.userId });
//   res.json(tasks);
// });

// router.post("/", auth, async (req, res) => {
//     const { title, description } = req.body;
  
//     // Validate request body
//     if (!title || !description) {
//       return res.status(400).json({ error: "Title and description are required" });
//     }
  
//     try {
//       const task = new Task({ title, description, user: req.userId });
//       await task.save();
//       res.json(task);
//     } catch (error) {
//       console.error("Error creating task:", error);
//       res.status(400).json({ error: "Failed to create task" });
//     }
//   });

// router.patch("/:id", auth, async (req, res) => {
//   const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
//   res.json(task);
// });

// router.delete("/:id", auth, async (req, res) => {
//   await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
//   res.json({ message: "Task deleted" });
// });

// module.exports = router;










const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const router = express.Router();

// Fetch all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});

// Create a new task
router.post("/", auth, async (req, res) => {
  const task = new Task({ ...req.body, user: req.userId });
  await task.save();
  res.json(task);
});

// Update a task
router.patch("/:id", auth, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { title, description },
    { new: true }
  );
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: "Task deleted" });
});

module.exports = router;