const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
require("dotenv").config();

const app = express();
// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
}));



app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));