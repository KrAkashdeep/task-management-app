const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

require("dotenv").config();
require("./Models/db");
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use("/tasks", TaskRouter);
const cors = require("cors");

app.use(
  cors({
    origin: "https://task-management-xi-six.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(port, () => {
  console.log("server is running on port ", port);
});
