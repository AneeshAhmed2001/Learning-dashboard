const express = require("express");
const path = require("path");

const app = express();

// Serve frontend files from public folder
app.use(express.static("public"));

// API endpoint to send mock dashboard data
app.get("/api/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("✅ Server running at http://localhost:3000");
});
