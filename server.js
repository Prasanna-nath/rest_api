const express = require("express");
const studentRoutes = require("./src/routes");
const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
